"use client";

import GradeCalculator from "@/components/Home/GradeCalculator";
import Grades from "@/components/Home/Grades";

export default function Home() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-start font-sans xl:flex-row xl:items-stretch xl:justify-center">
            <GradeCalculator />
            <Grades />
        </div>
    );
}
