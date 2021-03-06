/**
 * Credenciales de usuario
 */
var users = {
    "admin": "123"
};
var companyTitle = "El Rincón de la Lectura";

$(document).ready(function(){
    $("#home_page").hide();
    $("#teachers_interface").hide();
    $("#students_interface").hide();
    $("#librarians_interface").hide();
    $("#loans_interface").hide();
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
     * Muestra todos los maestros de la base de datos
     */
    function refreshTeachers() {
        $.getJSON("http://localhost:3000/maestros",
        function (json) {
            var tr;
            $("#teacher-table").find("tr:gt(0)").remove();
            for (var i = 0; i < json.length; i++) {
                tr = $('<tr/>');
                tr.append("<td>" + json[i].id           + "</td>");
                tr.append("<td>" + json[i].departamento + "</td>");
                tr.append("<td>" + json[i].nombre       + "</td>");
                tr.append("<td>" + json[i].apellido     + "</td>");
                tr.append("<td>" + json[i].correo       + "</td>");
                $('#teacher-table').append(tr);
            }
        });
    }
    refreshTeachers();

    /**
     * Muestra todos los estudiantes de la base de datos
     */
    function refreshStudents() {
        $.getJSON("http://localhost:3000/estudiantes",
        function (json) {
            var tr;
            $("#student-table").find("tr:gt(0)").remove();
            for (var i = 0; i < json.length; i++) {
                tr = $('<tr/>');
                tr.append("<td>" + json[i].id           + "</td>");
                tr.append("<td>" + json[i].carrera + "</td>");
                tr.append("<td>" + json[i].nombre       + "</td>");
                tr.append("<td>" + json[i].apellido     + "</td>");
                tr.append("<td>" + json[i].correo       + "</td>");
                $('#student-table').append(tr);
            }
        });
    }
    refreshStudents();

     /**
     * Muestra todos los bibliotecarios de la base de datos
     */
    function refreshLibrarians() {
        $.getJSON("http://localhost:3000/bibliotecarios",
        function (json) {
            var tr;
            $("#librarian-table").find("tr:gt(0)").remove();
            for (var i = 0; i < json.length; i++) {
                tr = $('<tr/>');
                tr.append("<td>" + json[i].id           + "</td>");
                tr.append("<td>" + json[i].nombre       + "</td>");
                tr.append("<td>" + json[i].apellido     + "</td>");
                tr.append("<td>" + json[i].contraseña   + "</td>");
                $('#librarian-table').append(tr);
            }
        });
    }
    refreshLibrarians();

         /**
     * Muestra todos los préstamos de la base de datos
     */
    function refreshLoans() {
        $.getJSON("http://localhost:3000/prestamos",
        function (json) {
            var tr;
            $("#loan-table").find("tr:gt(0)").remove();
            for (var i = 0; i < json.length; i++) {
                tr = $('<tr/>');
                tr.append("<td>" + json[i].id_prestamo      + "</td>");
                tr.append("<td>" + json[i].id_bibliotecario + "</td>");
                tr.append("<td>" + json[i].id_maestro       + "</td>");
                tr.append("<td>" + json[i].id_estudiante    + "</td>");
                tr.append("<td>" + json[i].id_libro         + "</td>");
                tr.append("<td>" + json[i].fecha_prestamo   + "</td>");
                tr.append("<td>" + json[i].hora_prestamo    + "</td>");
                tr.append("<td>" + json[i].fecha_entrega    + "</td>");
                tr.append("<td>" + json[i].hora_entrega     + "</td>");
                $('#loan-table').append(tr);
            }
        });
    }
    refreshLoans();

    /**
     * Actualiza los libros
     */
    $( "#showBooks input[type='submit']" ).click(function() {
        refreshBooks();
    });     
    /**
     * Actualiza los maestros
     */
    $( "#showTeachers input[type='submit']" ).click(function() {
        refreshTeachers();
    });   
    /**
     * Actualiza los estudiantes
     */
    $( "#showStudents input[type='submit']" ).click(function() {
        refreshStudents();
    });   
    /**
     * Actualiza los estudiantes
     */
    $( "#showLibrarians input[type='submit']" ).click(function() {
        refreshLibrarians();
    });  
    /**
     * Actualiza los préstamos
     */
    $( "#showLoans input[type='submit']" ).click(function() {
        refreshLoans();
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
     * Busca y muestra maestros por id
     */
    $( "#getTeacherById input[type='submit']" ).click(function() {
        var id = document.getElementById("teacher_searchId").value;
        $.getJSON("http://localhost:3000/maestros/" + id,
            function (json) {
                var tr;
                if (!json.length) {
                    alert("No existe ningún maestro con este ID");
                    return false;
                } else {
                    $("#teacher-table-search").find("tr:gt(0)").remove();
                    for (var i = 0; i < json.length; i++) {
                        tr = $('<tr/>');
                        tr.append("<td>" + json[i].id           + "</td>");
                        tr.append("<td>" + json[i].departamento + "</td>");
                        tr.append("<td>" + json[i].nombre       + "</td>");
                        tr.append("<td>" + json[i].apellido     + "</td>");
                        tr.append("<td>" + json[i].correo       + "</td>");
                        $('#teacher-table-search').append(tr);
                }
            }

        });
    }); 
            
    /**
     * Busca y muestra estudiantes por id
     */
    $( "#getStudentById input[type='submit']" ).click(function() {
        var id = document.getElementById("student_searchId").value;
        $.getJSON("http://localhost:3000/estudiantes/" + id,
            function (json) {
                var tr;
                if (!json.length) {
                    alert("No existe ningún estudiante con este ID");
                    return false;
                } else {
                    $("#student-table-search").find("tr:gt(0)").remove();
                    for (var i = 0; i < json.length; i++) {
                        tr = $('<tr/>');
                        tr.append("<td>" + json[i].id           + "</td>");
                        tr.append("<td>" + json[i].carrera + "</td>");
                        tr.append("<td>" + json[i].nombre       + "</td>");
                        tr.append("<td>" + json[i].apellido     + "</td>");
                        tr.append("<td>" + json[i].correo       + "</td>");
                        $('#student-table-search').append(tr);
                }
            }

        });
    }); 
        /**
     * Busca y muestra bibliotecarios por id
     */
    $( "#getLibrarianById input[type='submit']" ).click(function() {
        var id = document.getElementById("librarian_searchId").value;
        $.getJSON("http://localhost:3000/bibliotecarios/" + id,
            function (json) {
                var tr;
                if (!json.length) {
                    alert("No existe ningún bibliotecario con este ID");
                    return false;
                } else {
                    $("#librarian-table-search").find("tr:gt(0)").remove();
                    for (var i = 0; i < json.length; i++) {
                        tr = $('<tr/>');
                        tr.append("<td>" + json[i].id           + "</td>");
                        tr.append("<td>" + json[i].nombre       + "</td>");
                        tr.append("<td>" + json[i].apellido     + "</td>");
                        tr.append("<td>" + json[i].contraseña       + "</td>");
                        $('#librarian-table-search').append(tr);
                }
            }

        });
    }); 
    /**
     * Busca y muestra préstamos por id
     */
    $( "#getLoanById input[type='submit']" ).click(function() {
        var id = document.getElementById("loan_searchId").value;
        $.getJSON("http://localhost:3000/prestamos/" + id,
            function (json) {
                var tr;
                if (!json.length) {
                    alert("No existe ningún préstamo con este ID");
                    return false;
                } else {
                    $("#loan-table-search").find("tr:gt(0)").remove();
                    for (var i = 0; i < json.length; i++) {
                        tr = $('<tr/>');
                        tr.append("<td>" + json[i].id_prestamo      + "</td>");
                        tr.append("<td>" + json[i].id_bibliotecario + "</td>");
                        tr.append("<td>" + json[i].id_maestro       + "</td>");
                        tr.append("<td>" + json[i].id_estudiante    + "</td>");
                        tr.append("<td>" + json[i].id_libro         + "</td>");
                        tr.append("<td>" + json[i].fecha_prestamo   + "</td>");
                        tr.append("<td>" + json[i].hora_prestamo   + "</td>");
                        tr.append("<td>" + json[i].fecha_entrega    + "</td>");
                        tr.append("<td>" + json[i].hora_entrega    + "</td>");
                        $('#loan-table-search').append(tr);
                }
            }

        });
    }); 
        /**
     * Muestra ticket
     */
    $( "#getTicket input[type='submit']" ).click(function() {
        var id = document.getElementById("ticket_searchId").value;
        $.getJSON("http://localhost:3000/ticket/" + id,
            function (json) {
                var tr;
                if (!json.length) {
                    alert("No existe ningún préstamo con este ID");
                    return false;
                } else {
                    var doc = new jsPDF()
                    
                    var s_id_prestamo = JSON.stringify(json[0].id_prestamo)
                    var s_id_bibliotecario = JSON.stringify(json[0].id_bibliotecario)
                    var s_id_maestro = JSON.stringify(json[0].id_maestro)
                    var s_id_estudiante = JSON.stringify(json[0].id_estudiante)
                    var s_id_libro = JSON.stringify(json[0].id_libro)
                    var s_fecha_prestamo = JSON.stringify(json[0].fecha_prestamo)
                    var s_fecha_entrega = JSON.stringify(json[0].fecha_entrega)
                    var s_hora_prestamo = JSON.stringify(json[0].hora_prestamo)
                    var s_hora_entrega = JSON.stringify(json[0].hora_entrega)
                    var s_carrera = JSON.stringify(json[0].carrera)
                    var s_nombre_estudiante = JSON.stringify(json[0].nombre_estudiante)
                    var s_apellido_estudiante = JSON.stringify(json[0].apellido_estudiante)
                    var s_correo_estudiante = JSON.stringify(json[0].correo_estudiante)
                    var s_nombre_bibliotecario = JSON.stringify(json[0].nombre_bibliotecario)
                    var s_apellido_bibliotecario = JSON.stringify(json[0].apellido_bibliotecario)
                    var s_contraseña = JSON.stringify(json[0].contraseña)
                    var s_departamento = JSON.stringify(json[0].departamento)
                    var s_nombre_maestro = JSON.stringify(json[0].nombre_maestro)
                    var s_apellido_maestro = JSON.stringify(json[0].apellido_maestro)
                    var s_correo_maestro = JSON.stringify(json[0].correo_maestro)
                    var s_titulo = JSON.stringify(json[0].titulo)
                    var s_autor = JSON.stringify(json[0].autor)
                    var s_editorial = JSON.stringify(json[0].editorial)
                    var s_genero = JSON.stringify(json[0].genero)
                    var s_isbn = JSON.stringify(json[0].isbn)
                    var s_num_ejemplar = JSON.stringify(json[0].num_ejemplar)

                    var body = "El Rincón de la Lectura \nMonocle \n\n" +
                    "Préstamo" + " " + s_id_prestamo + "\n" +
                    "\n" +
                    "Fecha de préstamo: " + " " + s_fecha_prestamo + "\n" +
                    "Hora de préstamo: " + " " + s_hora_prestamo + "\n\n" +
                    "Fecha de devolución: " + " " + s_fecha_entrega + "\n" +
                    "Hora de devolución: " + " " + s_hora_entrega + "\n" +
                    "\n\n\n" +
                    "Estudiante: \n" +
                    "ID: " + s_id_estudiante + "\n" +
                    s_apellido_estudiante + " " + s_nombre_estudiante + "\n" +
                    s_carrera + "\n" +
                    "\n\n\n" +
                    "Maestro: \n" +
                    "ID: " + s_id_maestro + "\n" +
                    s_apellido_maestro + " " + s_nombre_maestro + "\n" +
                    s_departamento + "\n" +
                    "\n\n\n" +
                    "Lo atendió: \n" +
                    "ID: " + s_id_bibliotecario + "\n" +
                    s_apellido_bibliotecario + " " + s_nombre_bibliotecario + "\n" +
                    "\n\n\n" +
                    "Libro: \n" +
                    "ID: " + s_id_libro + "\n" +
                    s_titulo + "\n" +
                    s_autor + "\n" +
                    s_editorial + "\n" +
                    s_genero + "\n" +
                    s_isbn + "\n" + 
                    "Ejemplar" + " " + s_num_ejemplar + "\n\n\n"

                    var start = new Date(json[0].fecha_prestamo);
                    var end = new Date(json[0].fecha_entrega);

                    var diff = end.getTime() - start.getTime();
                    var day = 1000*60*60*24;
                    
                    console.log(diff); 

                    if (s_id_estudiante != 'null') {
                        if (diff > 7*day) {
                            var penalization = (diff - 7)/day;
                            body += "Penalización de " + Math.floor(penalization).toString() + " " + "días \n" + 
                            "Monto a pagar: $" + Math.floor(penalization*5).toString() + "\n\n";  
                        }

                    } else {
                        if (diff > 14*day) {
                            var penalization = (diff - 7)/day;
                            body += "Penalización de " + Math.floor(penalization).toString() + " " + "días \n" +
                            "Monto a pagar: $" + Math.floor(penalization*5).toString() + "\n\n";  
                        }
                    }



                    doc.text(
                        body,
                        10, 10)
                    doc.save('ticket.pdf')
            }

        });
    }); 
    /**
     * Previene que se suban formularios vacíos en libros
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
     * Previene que se suban formularios vacíos en maestros
     */
    $('#addTeacher').submit(function() {
        if ($.trim($("#teacher_insertDepartment").val()) === "" ||
            $.trim($("#teacher_insertName").val())       === "" ||
            $.trim($("#teacher_insertSurname").val())    === "" ||
            $.trim($("#teacher_insertEmail").val())      === "" )  {
            alert('No rellenaste todos los campos');
            return false;
        }
    });

        /**
     * Previene que se suban formularios vacíos en estudiantes
     */
    $('#addStudent').submit(function() {
        if ($.trim($("#student_insertMajor").val())      === "" ||
            $.trim($("#student_insertName").val())       === "" ||
            $.trim($("#student_insertSurname").val())    === "" ||
            $.trim($("#student_insertEmail").val())      === "" )  {
            alert('No rellenaste todos los campos');
            return false;
        }
    });


    /**
     * Previene que se suban formularios vacíos en bibliotecarios
     */
    $('#addLibrarian').submit(function() {
        if (
            $.trim($("#librarian_insertName").val())       === "" ||
            $.trim($("#librarian_insertSurname").val())    === "" ||
            $.trim($("#librarian_insertPassword").val())   === "" )  {
            alert('No rellenaste todos los campos');
            return false;
        }
    });

    /**
     * Previene que se suban formularios vacíos en préstamos
     */
    $('#addLoan').submit(function() {
        if (
            $.trim($("#loan_insertLibrarianId").val())  === "" ||
            (
            $.trim($("#loan_insertTeacherId").val())    === "" &&
            $.trim($("#loan_insertStudentId").val())    === ""
            ) ||
            $.trim($("#loan_insertBookId").val())       === "" ||
            $.trim($("#loan_insertLoanDate").val())     === ""
            ){
            alert('No rellenaste todos los campos');
            return false;
        } else if (
            (
            $.trim($("#loan_insertTeacherId").val()) != "" &&
            $.trim($("#loan_insertStudentId").val()) != "" 
            )
        ) {
            alert("Elige estudiante o maestro");
            return false;
        }
        var d = new Date($.trim($("#loan_insertLoanDate").val()));
        var n = d.getDay()
        console.log(n);
        console.log($.trim($("#loan_insertBookId").val()))
        if ($.trim($("#loan_insertBookId").val())  == 1 && n != 5) {
            alert("El ejemplar 1 solo se saca los viernes");
            return false;
        }
    });
  

        /**
     * Previene que se suban formularios vacíos en tickets
     */
    $('#getTicket').submit(function() {
        if (
            $.trim($("#ticket_searchId").val())  === ""
            ){
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
        $("#students_interface").hide();
        $("#librarians_interface").hide();
        $("#loans_interface").hide();
    });

    /**
     * Mostrar interfaz para maestros
     */
    $("#navbar #toggle_teachers").click(function() {
        $("#teachers_interface").show();
        $("#books_interface").hide();
        $("#students_interface").hide();
        $("#librarians_interface").hide();
        $("#loans_interface").hide();
    });
    /**
     * Mostrar interfaz para estudiantes
     */
    $("#navbar #toggle_students").click(function() {
        $("#students_interface").show();
        $("#books_interface").hide();
        $("#teachers_interface").hide();
        $("#librarians_interface").hide();
        $("#loans_interface").hide();
    });
        /**
     * Mostrar interfaz para bibliotecarios
     */
    $("#navbar #toggle_librarians").click(function() {
        $("#librarians_interface").show();
        $("#books_interface").hide();
        $("#teachers_interface").hide();
        $("#students_interface").hide();
        $("#loans_interface").hide();
    });
        /**
     * Mostrar interfaz para préstamos
     */
    $("#navbar #toggle_loans").click(function() {
        $("#loans_interface").show();
        $("#books_interface").hide();
        $("#teachers_interface").hide();
        $("#librarians_interface").hide();
        $("#students_interface").hide();
    });
});
