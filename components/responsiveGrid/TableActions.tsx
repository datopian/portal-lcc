import { useResourceData } from "./DataProvider";
import Papa from "papaparse";

export default function TableActions() {
  const { dataUrl, data } = useResourceData();
  const handleDownload = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="flex  gap-1">
      <div className="flex gap-1">
        <div className="relative inline-block">
          <a
            onClick={handleDownload}
            className="cursor-pointer bg-accent-400 hover:bg-accent hover:shadow text-black transition-all inline-flex w-full justify-center gap-x-1.5 rounded-md px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-accent "
          >
            Export
          </a>
        </div>
      </div>
    </div>
  );
}
