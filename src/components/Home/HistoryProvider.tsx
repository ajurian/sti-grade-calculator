"use client";

import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useState,
} from "react";

interface HistoryItem {
    subject: string;
    prelim: number;
    midterm: number;
    prefinal: number;
    final: number;
    gwa: number;
    scale: string;
    status: string;
}

interface HistoryContextValue {
    history: HistoryItem[];
    addToHistory: (item: HistoryItem) => void;
    clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextValue>({
    history: [],
    addToHistory: () => {},
    clearHistory: () => {},
});

export const useHistory = () => useContext(HistoryContext);

export default function HistoryProvider({ children }: PropsWithChildren) {
    const [history, setHistory] = useState<HistoryContextValue["history"]>([]);

    const addToHistory = useCallback((item: HistoryItem) => {
        setHistory((prevHistory) => [...prevHistory, item]);
    }, []);

    const clearHistory = useCallback(() => setHistory([]), []);

    return (
        <HistoryContext.Provider
            value={{ history, addToHistory, clearHistory }}
        >
            {children}
        </HistoryContext.Provider>
    );
}
