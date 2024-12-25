import roundTwo from "../roundTwo";

export default function computeGWA(
    prelim: number,
    midterm: number,
    prefinal: number,
    final: number,
) {
    return roundTwo(
        prelim * 0.2 + midterm * 0.2 + prefinal * 0.2 + final * 0.4,
    );
}
