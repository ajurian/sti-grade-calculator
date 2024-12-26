import roundTwo from "../roundTwo";
import computeGWA from "./computeGWA";
import isPassingGrade from "./isPassingGrade";
import scaleGrade from "./scaleGrade";

interface CalculateGradesOptions {
    prelimRaw: string;
    midtermRaw: string;
    prefinalRaw: string;
    finalRaw: string;
}

export default function calculateGrades({
    prelimRaw,
    midtermRaw,
    prefinalRaw,
    finalRaw,
}: CalculateGradesOptions) {
    const prelim = roundTwo(Number(prelimRaw));
    const midterm = roundTwo(Number(midtermRaw));
    const prefinal = roundTwo(Number(prefinalRaw));
    const final = roundTwo(Number(finalRaw));
    const gwa = computeGWA(prelim, midterm, prefinal, final);
    const prelimScale = scaleGrade(prelim);
    const midtermScale = scaleGrade(midterm);
    const prefinalScale = scaleGrade(prefinal);
    const finalScale = scaleGrade(final);
    const gwaScale = scaleGrade(gwa);
    const status: GradesItem["status"] = isPassingGrade(gwa)
        ? "Passed"
        : "Failed";

    return {
        prelim,
        midterm,
        prefinal,
        final,
        gwa,
        prelimScale,
        midtermScale,
        prefinalScale,
        finalScale,
        gwaScale,
        status,
    };
}
