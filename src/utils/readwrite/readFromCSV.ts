import calculateGrades from "../grade/calculateGrades";

export default function readFromCSV(content: string) {
    const grades: GradesItem[] = [];
    const rows = content.split("\n");

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const columns = row.split(",");

        if (columns.length === 1) {
            break;
        }

        const calculation = calculateGrades({
            prelimRaw: columns[1].split("%")[0],
            midtermRaw: columns[2].split("%")[0],
            prefinalRaw: columns[3].split("%")[0],
            finalRaw: columns[4].split("%")[0],
        });

        grades.push({
            subject: columns[0],
            ...calculation,
        });
    }

    return grades;
}
