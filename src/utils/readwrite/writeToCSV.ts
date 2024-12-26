import { stringify } from "csv-stringify/sync";

export default function writeToCSV(grades: GradesItem[]) {
    const content = stringify([
        ["Subject", "Prelim", "Midterm", "Pre-final", "Final", "GWA", "Status"],
        ...grades.map((item) => [
            item.subject,
            item.prelim.toFixed(2) + "% (" + item.prelimScale + ")",
            item.midterm.toFixed(2) + "% (" + item.midtermScale + ")",
            item.prefinal.toFixed(2) + "% (" + item.prefinalScale + ")",
            item.final.toFixed(2) + "% (" + item.finalScale + ")",
            item.gwa.toFixed(2) + "% (" + item.gwaScale + ")",
            item.status,
        ]),
    ]);

    return new Blob([content], { type: "text/csv" });
}
