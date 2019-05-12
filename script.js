/**
 * Credenciales de usuario
 */
var users = {
    "admin": "123"
};
var companyTitle = "El Rincón de la Lectura";

$(document).ready(function(){
    $("#home_page").hide();
    $("#users_interface").hide();
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
    function refreshBooks() {
        $.getJSON("http://localhost:3000/libros",
        function (json) {
            var tr;
            $("#book-table").find("tr:gt(0)").remove();
            for (var i = 0; i < json.length; i++) {
                tr = $('<tr/>');
                tr.append("<td>" + json[i].id           + "</td>");
                tr.append("<td>" + json[i].titulo       + "</td>");
                tr.append("<td>" + json[i].autor        + "</td>");
                tr.append("<td>" + json[i].editorial    + "</td>");
                tr.append("<td>" + json[i].genero       + "</td>");
                tr.append("<td>" + json[i].isbn         + "</td>");
                tr.append("<td>" + json[i].num_ejemplar + "</td>")
                $('#book-table').append(tr);
            }
        });
    }
    refreshBooks();
    /**
     * Actualiza los libros
     */
    $( "#showBooks input[type='submit']" ).click(function() {
        refreshBooks();
    });    
    
    /**
     * Busca y muestra libros por id
     */
    $( "#getBookById input[type='submit']" ).click(function() {
        var id = document.getElementById("searchId").value;
        $.getJSON("http://localhost:3000/libros/" + id,
            function (json) {
                var tr;
                if (!json.length) {
                    alert("No existe ningún libro con este ID");
                    return false;
                } else {
                    $("#book-table-search").find("tr:gt(0)").remove();
                    for (var i = 0; i < json.length; i++) {
                        tr = $('<tr/>');
                        tr.append("<td>" + json[i].id           + "</td>");
                        tr.append("<td>" + json[i].titulo       + "</td>");
                        tr.append("<td>" + json[i].autor        + "</td>");
                        tr.append("<td>" + json[i].editorial    + "</td>");
                        tr.append("<td>" + json[i].genero       + "</td>");
                        tr.append("<td>" + json[i].isbn         + "</td>");
                        tr.append("<td>" + json[i].num_ejemplar + "</td>");
                        $('#book-table-search').append(tr);
                }
            }

        });
    });   
    /**
     * Previene que se suban formularios vacíos
     */
    $('#addBook').submit(function() {
        if ($.trim($("#insertTitle").val())     === "" ||
            $.trim($("#insertAuthor").val())    === "" ||
            $.trim($("#insertEditorial").val()) === "" ||
            $.trim($("#insertGenre").val())     === "" ||
            $.trim($("#insertIsbn").val())      === "" ||
            $.trim($("#insertCopyNum").val())   === "")  {
            alert('No rellenaste todos los campos');
            return false;
        }
    });
        /**
     * Mostrar interfaz para libros
     */
    $("#navbar #toggle_books").click(function() {
        $("#books_interface").show();
        $("#users_interface").hide();
    });
    /**
     * Mostrar interfaz para usuarios
     */
    $("#navbar #toggle_users").click(function() {
        $("#users_interface").show();
        $("#books_interface").hide();
    });
    
});
