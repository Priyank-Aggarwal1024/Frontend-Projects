const form = document.querySelector("form");
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
const span = document.querySelector(".error");
const input = document.querySelector(".input");
const showError = (str) => {
    span.classList.add("display-error")
    input.classList.add("input-error")
    span.innerHTML = str
}
const clearError = () => {
    span.classList.remove("display-error")
    input.classList.remove("input-error")
}
form.onsubmit = (event) => {
    clearError()
    if (form.email.value == "") {
        showError("Valid email required");
        return false
    }
    else if (!validateEmail(form.email.value)) {
        showError("Valid email required");
        return false;
    }
    else {
        form.email.value = ""
        window.location.href = "/success.html"
    }
    event.preventDefault();
}

