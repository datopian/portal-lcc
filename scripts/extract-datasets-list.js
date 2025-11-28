const https = require("https");
const fs = require("fs/promises");
const path = require("path");

const PORTAL_URL = "https://lincolnshire.ckan.io";
const API_PATH = "/api/3/action/package_search";
const PAGE_SIZE = 10;
const OUTPUT_PATH = path.join(__dirname, "..", "lincolnshire-datasets.json");

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "dataset-export-script" } }, (res) => {
        const { statusCode } = res;

        if (statusCode !== 200) {
          res.resume();
          reject(new Error(`Request to ${url} failed with status code ${statusCode}`));
          return;
        }

        let rawData = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          rawData += chunk;
        });
        res.on("end", () => {
          try {
            resolve(JSON.parse(rawData));
          } catch (error) {
            reject(new Error(`Failed to parse JSON from ${url}: ${error.message}`));
          }
        });
      })
      .on("error", reject);
  });
}

async function fetchDatasetPage(start = 0) {
  const url = new URL(API_PATH, PORTAL_URL);
  url.searchParams.set("rows", PAGE_SIZE.toString());
  url.searchParams.set("start", start.toString());

  const payload = await fetchJson(url);

  if (!payload.success || !payload.result) {
    throw new Error(`Unexpected API response while fetching datasets: ${JSON.stringify(payload)}`);
  }

  const { count, results } = payload.result;
  const datasets = results.map((dataset) => ({
    name: dataset.name,
    id: dataset.id,
    organization: dataset.organization
      ? dataset.organization.name || dataset.organization.id || null
      : null,
  }));

  return { total: count, datasets };
}

async function fetchAllDatasets() {
  let start = 0;
  const collected = [];

  while (true) {
    const { total, datasets } = await fetchDatasetPage(start);
    collected.push(...datasets);

    start += PAGE_SIZE;
    if (collected.length >= total) {
      break;
    }
  }

  return collected;
}

async function main() {
  try {
    console.log("Fetching datasets from Lincolnshire CKAN portal...");
    const datasets = await fetchAllDatasets();
    await fs.writeFile(OUTPUT_PATH, JSON.stringify(datasets, null, 2), "utf8");
    console.log(`Saved ${datasets.length} datasets to ${OUTPUT_PATH}`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}
