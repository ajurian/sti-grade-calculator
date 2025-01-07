import html2canvas from "html2canvas-pro";

export default async function writeToPNG(table: HTMLTableElement) {
    const tableParent = table.parentElement;
    if (tableParent === null) return null;

    const tableClone = table.cloneNode(true) as HTMLTableElement;

    tableParent.appendChild(tableClone);

    const thead = tableClone.querySelector("thead");
    const tr = tableClone.querySelectorAll("tr");
    const textarea = tableClone.querySelectorAll("textarea");
    const clonedTextareaValue =
        tableClone.querySelectorAll<HTMLDivElement>(".textarea-value");
    const subjectResizable =
        tableClone.querySelector<HTMLSpanElement>("#subject-resizable");

    if (
        thead === null ||
        tr === null ||
        tr.length === 0 ||
        textarea.length === 0 ||
        subjectResizable === null
    ) {
        return null;
    }

    thead.style.boxShadow = "none";
    tr[0].style.borderBottomWidth = "1px";
    tr.forEach((node) => node.removeChild(node.children[0]));
    textarea.forEach((node) => (node.style.display = "none"));
    clonedTextareaValue.forEach((node) => {
        node.style.display = "block";
        node.style.visibility = "visible";
    });

    subjectResizable.classList.remove("after:content-['|']");
    subjectResizable.classList.add("after:content-['']");

    tableClone.style.position = "absolute";
    tableClone.style.left = "101vw";
    tableClone.style.maxHeight = "none";
    tableClone.style.width = "fit-content";

    const canvas = await html2canvas(tableClone, {
        logging: false,
        backgroundColor: "white",
    });

    tableParent.removeChild(tableClone);

    return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve));
}
