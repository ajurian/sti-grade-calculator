import {
    Document,
    Packer,
    Paragraph,
    Table,
    TableCell,
    TableRow,
    WidthType,
} from "docx";

export default async function saveToDocx(history: HistoryItem[]) {
    const table = new Table({
        width: {
            size: 100,
            type: WidthType.PERCENTAGE,
        },
        rows: [
            new TableRow({
                children: [
                    "Subject",
                    "Prelim",
                    "Midterm",
                    "Pre-final",
                    "Final",
                    "GWA",
                    "Status",
                ].map(
                    (label) =>
                        new TableCell({
                            children: [new Paragraph(label)],
                        }),
                ),
            }),
            ...history.map(
                (item) =>
                    new TableRow({
                        children: [
                            item.subject,
                            item.prelim.toFixed(2) + "%",
                            item.midterm.toFixed(2) + "%",
                            item.prefinal.toFixed(2) + "%",
                            item.final.toFixed(2) + "%",
                            item.gwa.toFixed(2) + "%",
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
