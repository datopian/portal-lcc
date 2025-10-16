# Explore Data with AI

Connect our PortalJS MCP Server to ChatGPT or Claude Desktop to search, explore, and preview datasets using natural language.

## Setup Instructions

### Connecting to ChatGPT

1. Open ChatGPT
2. Go to **Settings** → **Model Context Protocol (MCP)**
3. Click **Add MCP Server**
4. Enter the following details:
   - **Name**: PortalJS Data Portal
   - **URL**: `https://portaljs-mcp-server.datopian.workers.dev/sse`
   - **Type**: SSE (Server-Sent Events)
5. Click **Save**
6. The server should now appear in your MCP connections list
---
### Connecting to Claude Desktop

1. Open Claude Desktop
2. Go to **Settings** → **Connectors**
3. Click **Add Custom Connector**
4. Enter the connector URL:
   ```
   https://portaljs-mcp-server.datopian.workers.dev/sse
   ```
5. Click **Add**
6. The PortalJS server should now be available in your MCP connections
---
## How to Use

Once connected, you can interact with the data portal using natural language. The AI will automatically use the appropriate tools based on your requests.

### **Search for Datasets**

Find datasets by describing what you're looking for:

**Example prompts:**
- "Search for datasets about CO2 emissions"
- "Find data on housing prices"
- "Look for climate change datasets"
- "Show me datasets related to population statistics"

The search will return a list of matching datasets with their titles, descriptions, and IDs.

---
### **Fetch Dataset Details**

Get detailed information about a specific dataset:

**Example prompts:**
- "Fetch details for dataset idb--house_price"
- "Show me information about the CO2 emissions dataset"
- "Get the resources for the housing dataset"
- "What resources are available in dataset xyz-123?"

The fetch tool returns complete dataset metadata including:
- Title and description
- Organization
- Resources (files) with formats and download URLs
- Tags and creation dates
- License information

---

### **Preview Dataset**

View the actual data from any resource in table format:

**Example prompts:**
- "Preview this dataset"
- "Show me the data from resource abc-123"
- "I want to see a preview of the house pricing data"
- "Display the first 20 rows of this resource"

**The preview displays:**
- Data formatted as a markdown table
- Download link to the full resource
- Number of records available
- Source information (DataStore or direct CSV/JSON)

> [NOTE]
> *You can specify the number of rows (default: 10, max: 100):*
> - "Preview 50 rows of this dataset"
> - "Show me the first 15 records"

---

## Complete Workflow Example

Here's a typical conversation flow:

```
You: "Search for datasets about house pricing"

AI: [Returns list of housing datasets]

You: "Fetch details for the first one"

AI: [Shows complete dataset information with resources]

You: "Preview the CSV resource"

AI: [Displays data table with download link]
```

## Available Tools

The MCP server provides three main tools:

1. **search** - Search datasets by keywords
2. **fetch** - Get detailed dataset information
3. **preview_data_table** - View data in table format with download links

*All tools work seamlessly through natural language - no need to memorize commands or syntax!*
