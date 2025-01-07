import {
    Document,
    Packer,
    Paragraph,
    Table,
    TableCell,
    TableRow,
    WidthType,
} from "docx";

export default async function writeToDocx(grades: GradeItem[]) {
    const table = new Table({
        width: {
            size: 100,
            type: WidthType.PERCENTAGE,
        },
        rows: [
            new TableRow({
                children: [
                    "Subject",
                    "Prelims",
                    "Midterms",
                    "Pre-finals",
                    "Finals",
                    "Final Grade",
                    "Status",
                ].map(
                    (label) =>
                        new TableCell({
                            children: [new Paragraph(label)],
                        }),
                ),
            }),
            ...grades.map(
                (item) =>
                    new TableRow({
                        children: [
                            item.subject,
                            item.prelims.toFixed(2) + "%",
                            item.midterms.toFixed(2) + "%",
                            item.prefinals.toFixed(2) + "%",
                            item.finals.toFixed(2) + "%",
                            item.finalGrade.toFixed(2) + "%",
                            item.status,
                        ].map(
                            (label) =>
                                new TableCell({
                                    children: [new Paragraph(label)],
                                }),
                        ),
                    }),
            ),
        ],
    });

    const doc = new Document({ sections: [{ children: [table] }] });

    return Packer.toBlob(doc);
}
