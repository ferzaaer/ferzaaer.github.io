const themeToggle = document.getElementById("themeToggle");
const registrationForm = document.getElementById("registrationForm");
const formAlert = document.getElementById("formAlert");
const emptyResult = document.getElementById("emptyResult");
const resultSummary = document.getElementById("resultSummary");
const newRegistration = document.getElementById("newRegistration");

const fields = {
    fullName: document.getElementById("fullName"),
    email: document.getElementById("email"),
    department: document.getElementById("department"),
    classLevel: document.getElementById("classLevel"),
    workshop: document.getElementById("workshop"),
    participation: document.getElementById("participation"),
    notes: document.getElementById("notes"),
    terms: document.getElementById("terms")
};

const resultFields = {
    fullName: document.getElementById("resultName"),
    email: document.getElementById("resultEmail"),
    department: document.getElementById("resultDepartment"),
    classLevel: document.getElementById("resultClass"),
    workshop: document.getElementById("resultWorkshop"),
    participation: document.getElementById("resultParticipation"),
    notes: document.getElementById("resultNotes")
};

function setTheme(mode) {
    document.body.classList.toggle("dark-mode", mode === "dark");
    themeToggle.textContent = mode === "dark" ? "Açık Tema" : "Koyu Tema";
    localStorage.setItem("hafta7-theme", mode);
}

function isEmailValid(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function setInvalid(field, invalid) {
    field.classList.toggle("is-invalid", invalid);
}

function validateForm() {
    let isValid = true;

    const requiredTextFields = [
        fields.fullName,
        fields.department,
        fields.classLevel,
        fields.workshop,
        fields.participation
    ];

    requiredTextFields.forEach((field) => {
        const invalid = !field.value.trim();
        setInvalid(field, invalid);
        if (invalid) {
            isValid = false;
        }
    });

    const emailInvalid = !fields.email.value.trim() || !isEmailValid(fields.email.value.trim());
    setInvalid(fields.email, emailInvalid);
    if (emailInvalid) {
        isValid = false;
    }

    setInvalid(fields.terms, !fields.terms.checked);
    if (!fields.terms.checked) {
        isValid = false;
    }

    formAlert.classList.toggle("d-none", isValid);
    return isValid;
}

function createSummary() {
    resultFields.fullName.textContent = fields.fullName.value.trim();
    resultFields.email.textContent = fields.email.value.trim();
    resultFields.department.textContent = fields.department.value.trim();
    resultFields.classLevel.textContent = fields.classLevel.value;
    resultFields.workshop.textContent = fields.workshop.value;
    resultFields.participation.textContent = fields.participation.value;
    resultFields.notes.textContent = fields.notes.value.trim() || "Not eklenmedi";

    emptyResult.classList.add("d-none");
    resultSummary.classList.remove("d-none");
    resultSummary.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function clearValidation() {
    Object.values(fields).forEach((field) => field.classList.remove("is-invalid"));
    formAlert.classList.add("d-none");
}

document.addEventListener("DOMContentLoaded", () => {
    setTheme(localStorage.getItem("hafta7-theme") || "light");
});

themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
    setTheme(nextTheme);
});

registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateForm()) {
        formAlert.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
    }

    createSummary();
});

registrationForm.addEventListener("reset", () => {
    window.setTimeout(clearValidation, 0);
});

newRegistration.addEventListener("click", () => {
    registrationForm.reset();
    clearValidation();
    resultSummary.classList.add("d-none");
    emptyResult.classList.remove("d-none");
    fields.fullName.focus();
});
