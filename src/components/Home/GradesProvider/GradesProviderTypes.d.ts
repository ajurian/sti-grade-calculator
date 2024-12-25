interface GradesItem {
    subject: string;
    prelim: number;
    midterm: number;
    prefinal: number;
    final: number;
    gwa: number;
    status: "Passed" | "Failed";
}

interface GradesContextValue {
    grades: GradesItem[];
    loadFromCSV: (content: string) => void;
    addToGrades: (item: GradesItem) => void;
    clearGrades: () => void;
}
