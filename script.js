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
        
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        themeToggle.textContent = newTheme === "dark" ? "🌙" : "🌞";
    });

    function validateInput(input, errorElement, message) {
        if (!input.checkValidity()) {
            errorElement.textContent = message;
            errorElement.style.display = "inline";
            input.classList.add("flash"); 
            setTimeout(() => input.classList.remove("flash"), 500);
            return false;
        } else {
            errorElement.style.display = "none";
            input.classList.remove("flash");
            return true;
        }
    }

    function maskInput(input, regex, errorElement, message) {
        input.addEventListener("input", function () {
            if (!regex.test(input.value)) {
                input.classList.add("flash");
                errorElement.textContent = message;
                errorElement.style.display = "inline";
                setTimeout(() => input.classList.remove("flash"), 500);
            } else {
                errorElement.style.display = "none";
            }
        });
    }

    nameInput.addEventListener("input", () => validateInput(nameInput, nameError, "Only letters and spaces allowed."));
    emailInput.addEventListener("input", () => validateInput(emailInput, emailError, "Enter a valid email."));
    commentsInput.addEventListener("input", handleCommentsInput);

    maskInput(nameInput, /^[A-Za-z ]*$/, nameError, "Invalid characters entered.");
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
    form.addEventListener("submit", function (event) {

        if (!validateInput(nameInput, nameError, "Only letters and spaces allowed.", "name")) errorLog.push({ field: "name", error: nameError.textContent });
        if (!validateInput(emailInput, emailError, "Enter a valid email.", "email")) errors.push({ field: "email", error: emailError.textContent });
        if (!validateInput(commentsInput, commentsError, "Must be between 5-300 characters.", "comments")) errors.push({ field: "comments", error: commentsError.textContent });
        
        if (errors.length > 0) {
            event.preventDefault(); 
            console.log("Errors logged:", errorLog); 
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
