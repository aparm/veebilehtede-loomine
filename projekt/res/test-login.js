const loginButton = document.getElementById("button-login");
loginButton.addEventListener('click', login);


function login() {
    var inputEmail = document.getElementById("input-email");
    var inputParool = document.getElementById("input-parool");

    if (inputEmail.value === "") {
        alert("Palun sissestage email");
    } else if (inputParool.value === "") {
        alert("Palun sissestage parool");
    } else if ((inputEmail.value === "Ma olen") && (inputParool.value === "tubli")) {
        document.getElementById("button-login-idga").innerHTML = "Sa";
        document.getElementById("button-login-pangaga").innerHTML = "oled";
        document.getElementById("button-login-smartidga").innerHTML = "tubli";
    } else {
        alert("Proovige seda: \nEmail: Ma olen \nParool: tubli");
    }
}