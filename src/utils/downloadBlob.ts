// CODE FROM:
// https://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link

export default function downloadBlob(blob: Blob | null) {
    if (blob === null) {
        return;
    }

    const link = document.createElement("a");

    document.body.appendChild(link);
    link.style.display = "none";

    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = "123.png";

    link.click();

    URL.revokeObjectURL(url);
}
