import roundTwo from "../roundTwo";

export default function computeFinalGrade(
    prelims: number,
    midterms: number,
    prefinals: number,
    finals: number,
) {
    return roundTwo(
        prelims * 0.2 + midterms * 0.2 + prefinals * 0.2 + finals * 0.4,
    );
}
