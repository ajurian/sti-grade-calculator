interface HistoryItem {
    subject: string;
    prelim: number;
    midterm: number;
    prefinal: number;
    final: number;
    gwa: number;
    scale:
        | "1.00"
        | "1.25"
        | "1.50"
        | "1.75"
        | "2.00"
        | "2.25"
        | "2.50"
        | "2.75"
        | "3.00"
        | "5.00";
    status: "Passed" | "Failed";
}

interface HistoryContextValue {
    history: HistoryItem[];
    addToHistory: (item: HistoryItem) => void;
    clearHistory: () => void;
}
