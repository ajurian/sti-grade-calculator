interface GradesItem {
    subject: string;
    prelim: number;
    midterm: number;
    prefinal: number;
    final: number;
    gwa: number;
    prelimScale: string;
    midtermScale: string;
    prefinalScale: string;
    finalScale: string;
    gwaScale: string;
    status: "Passed" | "Failed";
}

interface GradesContextValue {
    grades: GradesItem[];
    loadFromCSV: (content: string) => GradesItem[];
    addToGrades: (item: GradesItem) => void;
    deleteIndices: (checkedIndices: boolean[]) => void;
}
