var ecuaciones = [];

window.onload = function () {
    var ruta = window.location.pathname;
    if (ruta == "/html/auth.html") {
        document.getElementById("btiniciar").onclick = btiniciar;
        document.getElementById("btregistrarse").onclick = btregistrarse;
    }
    else {
        document.getElementById("btagregar").onclick = btagregar;
        document.getElementById("btgraficar").onclick = btgraficar;
        document.getElementById("btlimpiar").onclick = btvaciar;
        document.getElementById('cerrar_m').onclick = cerrarSesion;
        verificarSesion();
        grafica_vacia();
    }

}

function cerrarSesion() {
    ver.signOut().then(function () {
        alert("Secion Cerrada")
    }).catch(function (error) {
        var errorMessage = error.message;
        alert(errorMessage);
    });
}

function verificarSesion() {
    ver.onAuthStateChanged(function (user) {
        if (user) {
            document.getElementById('iniciar_m').style.display = 'none';
            document.getElementById('cerrar_m').style.display = 'inline';
        } else {
            document.getElementById('iniciar_m').style.display = 'inline';
            document.getElementById('cerrar_m').style.display = 'none';
        }
    });
}

function btregistrarse() {
    const email = document.querySelector("#txtcorreo").value;
    const contraseña = document.querySelector("#txtconrtaseña").value;


    ver.createUserWithEmailAndPassword(email, contraseña).then(function () {
        alert("Registrado con Exito");
        window.location.href = '/index.html'
    }).catch(function (error) {
        var errorMessage = error.message;
        alert(errorMessage);
        vaciarInicio();
    });


}

function btiniciar() {
    const email = document.querySelector("#txtcorreo").value;
    const contraseña = document.querySelector("#txtconrtaseña").value;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          alert("Ya posee una sesion iniciada")
          window.location.href = '/index.html'
        } else {
        ver.signInWithEmailAndPassword(email, contraseña).then(function () {
            alert("Inicio de Sesion con Exito");
            window.location.href = '/index.html'
        }).catch(function (error) {
            var errorMessage = error.message;
            alert(errorMessage);
            vaciarInicio();
        });
        }
      });


}

function btagregar() {
    var ecuacion = document.getElementById('txtnueva').value;
    if (!vacio(ecuacion)) {
        guardarecuacion(ecuacion);
    }
    document.getElementById('txtnueva').value = "";
    document.getElementById('txtnueva').focus();
}

function btgraficar() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            if (!vacio(ecuaciones)) {
                generar_graficas();
            }
        } else {
            alert("Debe iniciar Secion Para Graficar");
        }
    });
}

function btvaciar() {
    ecuaciones = [];
    quitar_grafica();
    grafica_vacia();

}

function vaciarInicio() {
    document.querySelector("#txtcorreo").value = "";
    document.querySelector("#txtconrtaseña").value = "";
    document.querySelector("#txtcorreo").focus();

}

function quitar_grafica() {
    var elem = document.querySelectorAll('.graph');
    for (var i = 0; i < elem.length; i++) {
        var del = elem[i]; del.parentNode.removeChild(del);
    }
}

function vacio(ecuacion) {
    var a = false;
    if (ecuacion == "") {
        a = true;
        alert("Debe ingresar una ecuacion")
    }
    return a;
}

function guardarecuacion(ecuacion) {
    ecuaciones.push({ fn: ecuacion })

    var lista = document.getElementById("txtguardadas").value;
    lista = lista + ecuacion + "\n"
    document.getElementById("txtguardadas").value = lista;
}

function grafica_vacia() {
    var parameters = {
        target: document.getElementById("grafica1"),
        width: 600,
        height: 400,
        grid: true,
        yAxis: { domain: [-10, 10] },
        xAxis: { domain: [-10, 10] },
    };
    functionPlot(parameters);

    var parameters = {
        target: document.getElementById("grafica2"),
        width: 600,
        height: 400,
        grid: true,
        yAxis: { domain: [-10, 10] },
        xAxis: { domain: [-10, 10] },
    };
    functionPlot(parameters);
}

function generar_graficas() {
    var parameters = {
        target: document.getElementById("grafica1"),
        data: ecuaciones,
        width: 600,
        height: 400,
        grid: true,
        yAxis: { domain: [-10, 10] },
        xAxis: { domain: [-10, 10] },
    };
    functionPlot(parameters);

    var parameters1 = {
        target: document.getElementById("grafica2"),
        data: [{ fn: "x/ln(x-1.08366)" }],
        title: "π(x) ~ x / ln(x-1.08366)",
        color: 'purple',
        width: 600,
        height: 400,
        grid: true,
        yAxis: { domain: [-10, 10] },
        xAxis: { domain: [-10, 10] },
    };
    functionPlot(parameters1);
}