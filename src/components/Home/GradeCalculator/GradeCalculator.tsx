import GradeCalculatorGradingSystem from "@/components/Home/GradeCalculator/GradeCalculatorGradingSystem";
import { useState } from "react";
import GradeCalculatorForm from "./GradeCalculatorForm";
import GradeCalculatorResult from "./GradeCalculatorResult";

export default function GradeCalculator() {
    const [calculation, setCalculation] = useState<Calculation | null>(null);

    return (
        <div className="w-full max-w-[calc(14rem+50ch)] flex-1 border-b p-8 xl:h-screen xl:border-b-0 xl:border-r">
            <h1 className="mb-2 text-2xl font-semibold">Grade Calculator</h1>
            <div className="mb-8 text-muted-foreground">Enter your grades</div>

            <GradeCalculatorForm onCalculationChange={setCalculation} />

            <div className="mt-8 flex flex-wrap gap-8">
                <GradeCalculatorResult calculation={calculation} />
                <GradeCalculatorGradingSystem />
            </div>
        </div>
    );
}
