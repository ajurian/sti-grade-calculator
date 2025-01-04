import { stringify } from "csv-stringify/sync";

export default function writeToCSV(grades: GradesItem[]) {
    const content = stringify([
        [
            "Subject",
            "Prelims",
            "Midterms",
            "Pre-finals",
            "Finals",
            "Final Grade",
            "Status",
        ],
        ...grades.map((item) => [
            item.subject,
            item.prelims.toFixed(2) + "% (" + item.prelimsScale + ")",
            item.midterms.toFixed(2) + "% (" + item.midtermsScale + ")",
            item.prefinals.toFixed(2) + "% (" + item.prefinalsScale + ")",
            item.finals.toFixed(2) + "% (" + item.finalsScale + ")",
            item.finalGrade.toFixed(2) + "% (" + item.finalGradeScale + ")",
            item.status,
        ]),
    ]);

    return new Blob([content], { type: "text/csv" });
}
