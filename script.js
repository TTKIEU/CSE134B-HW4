document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const commentsInput = document.getElementById("comments");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const commentsError = document.getElementById("commentsError");
    const commentCounter = document.getElementById("counter");
    
    const formErrorsField = document.getElementById("form-errors");
    let errorLog = [];

    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }

    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);

    const themeToggle = document.getElementById("themeToggle");
    themeToggle.addEventListener("click", function () {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(newTheme);
        themeToggle.textContent = newTheme === "dark" ? "🌙" : "🌞";
    });

    function validateInput(input, errorElement, message, fieldName) {
        if (!input.checkValidity()) {
            errorElement.textContent = message;
            errorElement.style.display = "inline";
            input.classList.add("flash");
            setTimeout(() => input.classList.remove("flash"), 500);
            errorLog.push({ field: fieldName, error: message });
            return false;
        } else {
            errorElement.style.display = "none";
            input.classList.remove("flash");
            return true;
        }
    }

    function handleCommentsInput() {
        let remaining = 300 - commentsInput.value.length;
        if (commentCounter) {
            commentCounter.textContent = `${remaining} characters remaining`;
        }
        if (remaining <= 50) {
            commentCounter.classList.add("warning");
        } else {
            commentCounter.classList.remove("warning");
        }
    }

    nameInput.addEventListener("input", () => validateInput(nameInput, nameError, "Only letters and spaces allowed.", "name"));
    emailInput.addEventListener("input", () => validateInput(emailInput, emailError, "Enter a valid email.", "email"));
    commentsInput.addEventListener("input", handleCommentsInput);

    form.addEventListener("submit", function (event) {
        errorLog = [];

        const isNameValid = validateInput(nameInput, nameError, "Only letters and spaces allowed.", "name");
        const isEmailValid = validateInput(emailInput, emailError, "Enter a valid email.", "email");
        const isCommentsValid = validateInput(commentsInput, commentsError, "Must be between 5-300 characters.", "comments");
        
        if (!isNameValid || !isEmailValid || !isCommentsValid) {
            event.preventDefault();
            if (formErrorsField) {
                formErrorsField.value = JSON.stringify(errorLog);
            }
        } else {
            console.log("Form submitted successfully with data:", {
                name: nameInput.value,
                email: emailInput.value,
                comments: commentsInput.value
            });
        }
    });
});

