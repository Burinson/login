/**
 * Credenciales de usuario
 */
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
    $( "#login input[type='button']" ).click(function() {
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

    /**
     * Permite el login funcionar con tecla de "Enter"
     */
    $(function() {
        $("form input").keypress(function (e) {
            if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
                $("#login input[type='button']").click();
                return false;
            } else {
                return true;
            }
        });
    });

    /**
     * Muestra todos los libros de la base de datos
     */
    $( "#showBooks input[type='submit']" ).click(function() {
        $.getJSON("http://localhost:3000/libros",
            function (json) {
                var tr;
                $("#book-table").find("tr:gt(0)").remove();
                for (var i = 0; i < json.length; i++) {
                    tr = $('<tr/>');
                    tr.append("<td>" + json[i].id + "</td>");
                    tr.append("<td>" + json[i].titulo + "</td>");
                    tr.append("<td>" + json[i].autor + "</td>");
                    tr.append("<td>" + json[i].editorial + "</td>");
                    tr.append("<td>" + json[i].genero + "</td>");
                    tr.append("<td>" + json[i].isbn + "</td>");
                    $('#book-table').append(tr);
            }
        });
    });    
    
    /**
     * Busca y muestra libros por id
     */
    $( "#getBookById input[type='submit']" ).click(function() {
        var id = document.getElementById("searchId").value;
        $.getJSON("http://localhost:3000/libros/" + id,
            function (json) {
                var tr;
                $("#book-table-search").find("tr:gt(0)").remove();
                for (var i = 0; i < json.length; i++) {
                    tr = $('<tr/>');
                    tr.append("<td>" + json[i].id + "</td>");
                    tr.append("<td>" + json[i].titulo + "</td>");
                    tr.append("<td>" + json[i].autor + "</td>");
                    tr.append("<td>" + json[i].editorial + "</td>");
                    tr.append("<td>" + json[i].genero + "</td>");
                    tr.append("<td>" + json[i].isbn + "</td>");
                    $('#book-table-search').append(tr);
            }
        });
    });   
    
});
