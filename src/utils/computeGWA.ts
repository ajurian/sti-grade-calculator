export default function computeGWA(grades: number[], weights: number[]) {
    if (grades.length !== weights.length) {
        throw new Error("Unmatched dimensions: grades, weights");
    }

    let gwa = 0;

    for (let i = 0; i < grades.length; i++) {
        gwa += grades[i] * weights[i];
    }

    return Number(gwa.toFixed(2));
}
