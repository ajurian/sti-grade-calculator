interface HistoryItem {
    subject: string;
    prelim: number;
    midterm: number;
    prefinal: number;
    final: number;
    gwa: number;
    status: "Passed" | "Failed";
}

interface HistoryContextValue {
    history: HistoryItem[];
    addToHistory: (item: HistoryItem) => void;
    clearHistory: () => void;
}
