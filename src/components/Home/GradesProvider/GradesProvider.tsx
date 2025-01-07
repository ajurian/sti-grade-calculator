"use client";

import readFromCSV from "@/utils/readwrite/readFromCSV";
import _ from "lodash";
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

    const addToGrades = useCallback(
        (item: GradeItem) =>
            setGrades((grades) => {
                const newGrades = _.cloneDeep(grades);
                newGrades.push(item);
                return newGrades;
            }),
        [],
    );

    const deleteIndices = useCallback(
        (indices: boolean[]) =>
            setGrades((grades) => grades.filter((_, idx) => !indices[idx])),
        [],
    );

    return (
        <GradesContext
            value={{ grades, loadFromCSV, addToGrades, deleteIndices }}
        >
            {children}
        </GradesContext>
    );
}
