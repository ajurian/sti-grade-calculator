"use client";

import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useState,
} from "react";

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
