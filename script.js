var users = {
    "admin": "123"
};
var companyTitle = "El Rincón de la Lectura";

$(document).ready(function(){
    $("#home_page").hide();
    /**
     * Permiso autorizado
     */
    function accessGranted(username, password) {
        $("#login_page").fadeOut("slow");
        $("#home_page").show();
        $("#home_page .welcomeUser").text("Bienvenido, " + username);
        $("#home_page .companyTitle").text(companyTitle);
    }
    /**
     * Error de autenticación
     */
    function authenticationError(type) {
        if (type == "invalid_username") {
            $("#authenticationError").text("Nombre de usuario incorrecto");
        } else if (type == "invalid_password") {
            $("#authenticationError").text("Contraseña incorrecta");
        } else {
            $("#authenticationError").text("Los datos ingresados no son válidos");
        }
    }
    /**
     * Autenticación
     */
    $( "#login input[type='button']" ).click(function( event ) {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value; 
        if (Object.keys(users).includes(username) && Object.values(users).includes(password)) {
            accessGranted(username, password);
        } else if (!Object.keys(users).includes(username) && Object.values(users).includes(password)) {
            authenticationError("invalid_username");
        } else if (!Object.values(users).includes(password) && Object.keys(users).includes(username)) {
            authenticationError("invalid_password");
        } else {
            authenticationError("invalid_combination");
        }
    });
});
