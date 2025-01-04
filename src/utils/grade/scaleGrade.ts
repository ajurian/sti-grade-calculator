import roundTwo from "../roundTwo";

export default function scaleGrade(grade: number) {
    grade = roundTwo(grade);
    if (grade >= 97.5) return "1.00";
    else if (grade >= 94.5) return "1.25";
    else if (grade >= 91.5) return "1.50";
    else if (grade >= 88.5) return "1.75";
    else if (grade >= 85.5) return "2.00";
    else if (grade >= 81.5) return "2.25";
    else if (grade >= 77.5) return "2.50";
    else if (grade >= 73.5) return "2.75";
    else if (grade >= 69.5) return "3.00";
    return "5.00";
}
