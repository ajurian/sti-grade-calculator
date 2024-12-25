"use client";

import readFromCSV from "@/utils/readwrite/readFromCSV";
import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useState,
} from "react";

const GradesContext = createContext<GradesContextValue>({
    grades: [],
    loadFromCSV: () => {},
    addToGrades: () => {},
    clearGrades: () => {},
});

export const useGrades = () => useContext(GradesContext);

export default function GradesProvider({ children }: PropsWithChildren) {
    const [grades, setGrades] = useState<GradesContextValue["grades"]>([]);

    const loadFromCSV = useCallback(
        (content: string) => setGrades(readFromCSV(content)),
        [],
    );

    const addToGrades = useCallback((item: GradesItem) => {
        setGrades((prevGrades) => [...prevGrades, item]);
    }, []);

    const clearGrades = useCallback(() => setGrades([]), []);

    return (
        <GradesContext.Provider
            value={{ grades, loadFromCSV, addToGrades, clearGrades }}
        >
            {children}
        </GradesContext.Provider>
    );
}
