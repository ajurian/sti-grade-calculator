export default function GradeCalculatorGradingSystem() {
    return (
        <div>
            <h2 className="mb-1 text-lg font-semibold">Grading System</h2>
            <ul className="list-inside list-disc whitespace-pre font-mono text-sm text-muted-foreground">
                <li>97.50 - 100.00% (1.00) Excellent</li>
                <li>94.50 -{"  "}97.49% (1.25) Very Good</li>
                <li>91.50 -{"  "}94.49% (1.50) Very Good</li>
                <li>88.50 -{"  "}91.49% (1.75) Very Good</li>
                <li>85.50 -{"  "}88.49% (2.00) Satisfactory</li>
                <li>81.50 -{"  "}85.49% (2.25) Satisfactory</li>
                <li>77.50 -{"  "}71.49% (2.50) Satisfactory</li>
                <li>73.50 -{"  "}77.49% (2.75) Fair</li>
                <li>69.50 -{"  "}73.49% (3.00) Fair</li>
                <li>Below{"    "}69.49% (5.00) Failed</li>
            </ul>
        </div>
    );
}
