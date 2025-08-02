// src/utils/data.js

export const Cities = [
    { value: "giza", name: "Giza", name_ar: "الجيزة" },
    { value: "alexandria", name: "Alexandria", name_ar: "الإسكندرية" },
    { value: "cairo", name: "Cairo", name_ar: "القاهرة" },
    { value: "ismailia", name: "Ismailia", name_ar: "الإسماعيلية" },
    { value: "mansoura", name: "Mansoura", name_ar: "المنصورة" },
];

export const Majors = [
    { value: "frontend", name: "Frontend", arabicName: "الواجهة الأمامية" },
    { value: "backend", name: "Backend", arabicName: "الواجهة الخلفية" },
    { value: "mobile applications", name: "Mobile Applications", arabicName: "تطبيقات الجوال" },
    { value: "full stack", name: "Full stack", arabicName: "تطوير متكامل" },
    { value: "data base", name: "Data base", arabicName: "قواعد البيانات" },
    { value: "data science", name: "Data Science", arabicName: "علم البيانات" },
];

// Optionally, you can reuse Majors if Category === Major
export const Categories = [...Majors];
