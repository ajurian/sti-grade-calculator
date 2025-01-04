interface GradesItem {
    subject: string;
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

interface GradesContextValue {
    grades: GradesItem[];
    loadFromCSV: (content: string) => GradesItem[];
    addToGrades: (item: GradesItem) => void;
    deleteIndices: (checkedIndices: boolean[]) => void;
}
