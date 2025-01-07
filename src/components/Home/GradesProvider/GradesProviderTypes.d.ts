interface GradeItem extends Calculation {
    subject: string;
}

interface GradesContextValue {
    grades: GradeItem[];
    loadFromCSV: (content: string) => GradeItem[];
    addToGrades: (item: GradeItem) => void;
    deleteIndices: (checkedIndices: boolean[]) => void;
}
