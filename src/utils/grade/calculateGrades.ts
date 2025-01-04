import roundTwo from "../roundTwo";
import computeFinalGrade from "./computeFinalGrade";
import isPassingGrade from "./isPassingGrade";
import scaleGrade from "./scaleGrade";

interface CalculateGradesOptions {
    prelimsRaw: string;
    midtermsRaw: string;
    prefinalsRaw: string;
    finalsRaw: string;
}

export default function calculateGrades({
    prelimsRaw,
    midtermsRaw,
    prefinalsRaw,
    finalsRaw,
}: CalculateGradesOptions) {
    const prelims = roundTwo(Number(prelimsRaw));
    const midterms = roundTwo(Number(midtermsRaw));
    const prefinals = roundTwo(Number(prefinalsRaw));
    const finals = roundTwo(Number(finalsRaw));
    const finalGrade = computeFinalGrade(prelims, midterms, prefinals, finals);
    const prelimsScale = scaleGrade(prelims);
    const midtermsScale = scaleGrade(midterms);
    const prefinalsScale = scaleGrade(prefinals);
    const finalsScale = scaleGrade(finals);
    const finalGradeScale = scaleGrade(finalGrade);
    const status: GradesItem["status"] = isPassingGrade(finalGrade)
        ? "Passed"
        : "Failed";

    return {
        prelims,
        midterms,
        prefinals,
        finals,
        finalGrade,
        prelimsScale,
        midtermsScale,
        prefinalsScale,
        finalsScale,
        finalGradeScale,
        status,
    };
}
