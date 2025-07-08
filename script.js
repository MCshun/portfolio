document.addEventListener("DOMContentLoaded", function() {
    let navbar = document.querySelector(".navbar-custom");

    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
});

async function submitForm(event) {
    event.preventDefault();
    let form = event.target;
    let submitButton = document.getElementById('submitButton');
    let siteSelect = document.getElementById('site');
    let siteError = document.getElementById('siteError');
    let responseMessage = document.getElementById('responseMessage');

    if (siteSelect.value === "") {
        siteError.textContent = "サイトを選択してください。";
        siteError.style.color = "red";
        return;
    } else {
        siteError.textContent = "";
    }

    submitButton.disabled = true;
    submitButton.textContent = '送信中...';

    let formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        site: siteSelect.value,
        message: document.getElementById('message').value
    };

    let response = await fetch('/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });

    let result = await response.json();
    responseMessage.textContent = result.message;
    responseMessage.classList.add(result.success ? 'text-success' : 'text-danger');

    if (result.success) {
        form.reset();
    }

    submitButton.disabled = false;
    submitButton.textContent = '送信';
}
