export default function readFromCSV(content: string) {
    const grades: GradesItem[] = [];
    const rows = content.split("\n");

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const columns = row.split(",");

        if (columns.length === 1) {
            break;
        }

        console.log(columns);

        grades.push({
            subject: columns[0],
            prelim: Number(columns[1]),
            midterm: Number(columns[2]),
            prefinal: Number(columns[3]),
            final: Number(columns[4]),
            gwa: Number(columns[5]),
            status: columns[6] as GradesItem["status"],
        });
    }

    return grades;
}
