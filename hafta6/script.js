function parseLocaleNumber(raw) {
    const normalized = String(raw ?? "")
        .trim()
        .replace(/\s+/g, "")
        .replace(",", ".");

    if (normalized.length === 0) return null;

    const value = Number(normalized);
    return Number.isFinite(value) ? value : null;
}

function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

function showError(errorId, message) {
    const el = document.getElementById(errorId);
    if (!el) return;
    el.hidden = !message;
    el.textContent = message || "";
}

function clampGrade(value) {
    if (value == null) return null;
    if (value < 0 || value > 100) return null;
    return value;
}

function letterFromAverage(avg) {
    // Basit bir ölçek (örnekte 60 -> CB olacak şekilde)
    if (avg >= 90) return "AA";
    if (avg >= 80) return "BA";
    if (avg >= 70) return "BB";
    if (avg >= 60) return "CB";
    if (avg >= 50) return "CC";
    if (avg >= 40) return "DC";
    if (avg >= 30) return "DD";
    return "FF";
}

function initGradeApp() {
    const form = document.getElementById("gradeForm");
    const resultBox = document.getElementById("gradeResult");

    if (!form || !resultBox) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        showError("gradeError", "");

        const name = String(document.getElementById("studentName")?.value ?? "").trim();
        const midtermRaw = document.getElementById("midterm")?.value;
        const finalRaw = document.getElementById("final")?.value;

        if (!name) {
            resultBox.hidden = true;
            showError("gradeError", "Lütfen Ad Soyad giriniz.");
            return;
        }

        const midterm = clampGrade(parseLocaleNumber(midtermRaw));
        const finalExam = clampGrade(parseLocaleNumber(finalRaw));

        if (midterm == null || finalExam == null) {
            resultBox.hidden = true;
            showError("gradeError", "Vize ve Final notu 0-100 arasında sayı olmalıdır.");
            return;
        }

        const avg = midterm * 0.4 + finalExam * 0.6;
        const letter = letterFromAverage(avg);
        const status = avg >= 50 ? "Geçti" : "Kaldı";

        setText("resultName", name);
        setText("resultAvg", avg.toFixed(2));
        setText("resultLetter", letter);
        setText("resultStatus", status);

        resultBox.hidden = false;
    });
}

const CONVERSIONS = [
    {
        id: "c_to_f",
        label: "Celsius → Fahrenheit",
        convert: (v) => (v * 9) / 5 + 32,
        decimals: 3,
    },
    {
        id: "f_to_c",
        label: "Fahrenheit → Celsius",
        convert: (v) => ((v - 32) * 5) / 9,
        decimals: 3,
    },
    {
        id: "c_to_k",
        label: "Celsius → Kelvin",
        convert: (v) => v + 273.15,
        decimals: 3,
    },
    {
        id: "k_to_c",
        label: "Kelvin → Celsius",
        convert: (v) => v - 273.15,
        decimals: 3,
    },
    {
        id: "m_to_km",
        label: "Metre → Kilometre",
        convert: (v) => v / 1000,
        decimals: 3,
    },
    {
        id: "km_to_m",
        label: "Kilometre → Metre",
        convert: (v) => v * 1000,
        decimals: 3,
    },
    {
        id: "m_to_mile",
        label: "Metre → Mil",
        convert: (v) => v / 1609.344,
        decimals: 3,
    },
    {
        id: "mile_to_m",
        label: "Mil → Metre",
        convert: (v) => v * 1609.344,
        decimals: 3,
    },
    {
        id: "kg_to_g",
        label: "Kilogram → Gram",
        convert: (v) => v * 1000,
        decimals: 3,
    },
    {
        id: "g_to_kg",
        label: "Gram → Kilogram",
        convert: (v) => v / 1000,
        decimals: 3,
    },
];

function initConverterApp() {
    const form = document.getElementById("convertForm");
    const select = document.getElementById("convertType");
    const resultBox = document.getElementById("convertResult");

    if (!form || !select || !resultBox) return;

    select.innerHTML = "";
    for (const conv of CONVERSIONS) {
        const opt = document.createElement("option");
        opt.value = conv.id;
        opt.textContent = conv.label;
        select.appendChild(opt);
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        showError("convertError", "");

        const raw = document.getElementById("convertValue")?.value;
        const value = parseLocaleNumber(raw);

        if (value == null) {
            resultBox.hidden = true;
            showError("convertError", "Lütfen geçerli bir sayı giriniz.");
            return;
        }

        const selected = CONVERSIONS.find((c) => c.id === select.value);
        if (!selected) {
            resultBox.hidden = true;
            showError("convertError", "Dönüşüm tipi seçiniz.");
            return;
        }

        const out = selected.convert(value);
        const formatted = Number.isFinite(out) ? out.toFixed(selected.decimals) : "Hata";

        setText("convertOutput", `Sonuç: ${formatted}`);
        resultBox.hidden = false;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initGradeApp();
    initConverterApp();
});
