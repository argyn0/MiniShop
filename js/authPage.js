import { registerUser, loginUser } from "./auth.js";

const authForm = document.querySelector("#authForm");
const usernameInput = document.querySelector("#usernameInput");
const passwordInput = document.querySelector("#passwordInput");
const authMessage = document.querySelector("#authMessage");

authForm.addEventListener("submit", function(event) {
    event.preventDefault();

    authMessage.textContent = "";

    const username = usernameInput.value;
    const password = passwordInput.value;
    console.log(event)
    try {
        if (event.submitter && event.submitter.id === "registerBtn") {
            registerUser(username, password);
        } else {
            loginUser(username, password);
        }

        window.location.href = "./index.html";
    } catch (error) {
        authMessage.textContent = error.message;
    }
});