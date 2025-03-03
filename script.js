document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const commentsInput = document.getElementById("comments");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const commentsError = document.getElementById("commentsError");
    const commentCounter = document.getElementById("counter");
    const formErrorsField = document.getElementById("formErrors");
    const themeToggle = document.getElementById("themeToggle");

    let errorLog = [];

    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        themeToggle.textContent = theme === "dark" ? "🌙" : "🌞";
    }

    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);

    themeToggle.addEventListener("click", function () {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(newTheme);
    });

    function displayError(input, errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = "inline";
        input.classList.add("flash");
        setTimeout(() => input.classList.remove("flash"), 500);
    }

    function clearError(input, errorElement) {
        errorElement.textContent = "";
        errorElement.style.display = "none";
        input.classList.remove("flash");
    }

    function handleCommentsInput() {
        let remaining = 300 - commentsInput.value.length;
        if (commentCounter) commentCounter.textContent = `${remaining} characters remaining`;
        commentCounter.classList.toggle("warning", remaining <= 50);
    }

    commentsInput.addEventListener("input", handleCommentsInput);

    [nameInput, emailInput, commentsInput].forEach((input) => {
        input.addEventListener("invalid", (e) => {
            e.preventDefault();
            let errorMessage = "";
            let errorElement = null;

            if (input === nameInput) {
                errorMessage = "Only letters and spaces allowed.";
                errorElement = nameError;
            } else if (input === emailInput) {
                errorMessage = "Enter a valid email.";
                errorElement = emailError;
            } else if (input === commentsInput) {
                errorMessage = "Comment is required and must be under 300 characters.";
                errorElement = commentsError;
            }

            if (errorElement) {
                displayError(input, errorElement, errorMessage);
                errorLog.push({ field: input.id, error: errorMessage });
            }
        });

        input.addEventListener("input", () => {
            clearError(input, input === nameInput ? nameError : input === emailInput ? emailError : commentsError);
        });
    });

    form.addEventListener("submit", function () {
        if (formErrorsField) {
            formErrorsField.value = JSON.stringify(errorLog);
        }
    });
});
