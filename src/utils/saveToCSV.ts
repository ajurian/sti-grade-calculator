import { stringify } from "csv-stringify/sync";

export default function saveToCSV(history: HistoryItem[]) {
    const content = stringify([
        ["Subject", "Prelim", "Midterm", "Pre-final", "Final", "GWA", "Status"],
        ...history.map((item) => [
            item.subject,
            item.prelim.toFixed(2),
            item.midterm.toFixed(2),
            item.prefinal.toFixed(2),
            item.final.toFixed(2),
            item.gwa.toFixed(2),
            item.status,
        ]),
    ]);

    return new Blob([content], { type: "text/csv" });
}
