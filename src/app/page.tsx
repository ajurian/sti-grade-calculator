"use client";

import GradeCalculator from "@/components/Home/GradeCalculator";
import History from "@/components/Home/History";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-wrap justify-center font-sans xl:flex-nowrap">
            <GradeCalculator />
            <History />
        </div>
    );
}
