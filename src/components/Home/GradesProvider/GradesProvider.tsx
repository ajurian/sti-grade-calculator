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
    loadFromCSV: () => [],
    addToGrades: () => {},
    deleteIndices: () => {},
});

export const useGrades = () => useContext(GradesContext);

export default function GradesProvider({ children }: PropsWithChildren) {
    const [grades, setGrades] = useState<GradesContextValue["grades"]>([]);

    const loadFromCSV = useCallback((content: string) => {
        const grades = readFromCSV(content);
        setGrades(grades);
        return grades;
    }, []);

    const addToGrades = useCallback((item: GradesItem) => {
        setGrades((prevGrades) => [...prevGrades, item]);
    }, []);

    const deleteIndices = useCallback(
        (indices: boolean[]) =>
            setGrades((grades) => grades.filter((_, idx) => !indices[idx])),
        [],
    );

    return (
        <GradesContext.Provider
            value={{ grades, loadFromCSV, addToGrades, deleteIndices }}
        >
            {children}
        </GradesContext.Provider>
    );
}
