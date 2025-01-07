interface Calculation {
    prelims: number;
    midterms: number;
    prefinals: number;
    finals: number;
    finalGrade: number;
    prelimsScale: string;
    midtermsScale: string;
    prefinalsScale: string;
    finalsScale: string;
    finalGradeScale: string;
    status: "Passed" | "Failed";
}
