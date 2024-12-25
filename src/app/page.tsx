"use client";

import GradeCalculator from "@/components/Home/GradeCalculator";
import Grades from "@/components/Home/Grades";

export default function Home() {
    return (
        <div className="relative flex min-h-screen flex-wrap justify-center font-sans xl:flex-nowrap">
            <GradeCalculator />
            <Grades />
        </div>
    );
}
