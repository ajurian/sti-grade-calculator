export default function describeGWA(gwa: number) {
    if (gwa >= 97.5) return "Excellent";
    else if (gwa >= 94.5) return "Very Good";
    else if (gwa >= 91.5) return "Very Good";
    else if (gwa >= 88.5) return "Very Good";
    else if (gwa >= 85.5) return "Satisfactory";
    else if (gwa >= 81.5) return "Satisfactory";
    else if (gwa >= 77.5) return "Satisfactory";
    else if (gwa >= 73.5) return "Fair";
    else if (gwa >= 69.5) return "Fair";
    return "Failed";
}
