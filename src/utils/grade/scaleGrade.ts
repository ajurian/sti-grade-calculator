import roundTwo from "../roundTwo";

export default function scaleGrade(gwa: number) {
    gwa = roundTwo(gwa);
    if (gwa >= 97.5) return "1.00";
    else if (gwa >= 94.5) return "1.25";
    else if (gwa >= 91.5) return "1.50";
    else if (gwa >= 88.5) return "1.75";
    else if (gwa >= 85.5) return "2.00";
    else if (gwa >= 81.5) return "2.25";
    else if (gwa >= 77.5) return "2.50";
    else if (gwa >= 73.5) return "2.75";
    else if (gwa >= 69.5) return "3.00";
    return "5.00";
}
