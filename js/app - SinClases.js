document.querySelector("#botonSubmit").addEventListener("click", agregarTweetAHistorico);
let i = localStorage.length;
if( localStorage.getItem("Contenido 0") === null ) {
    let tweets = new Array();
    localStorage.setItem("Contenido 0", JSON.stringify(tweets));
}

function agregarTweetAHistorico(e) {

    /* Feature: agregar el tweet escrito en el textarea al historial de tweets que se llama "Mis tweets" */
    /* ********************************************************************** */
    
    e.preventDefault();

    let tweetAHistorico = document.createElement("p");
    tweetAHistorico.id = "historicoDeTweet";
    tweetAHistorico.innerHTML = document.querySelector("#textAreaConTweet").value;

    crearLiAYAdjuntar(tweetAHistorico);

    /* ********************************************************************** */



    /* Feature: agregar cada nuevo Tweet al Local Storage */
    /* ********************************************************************** */

    let contenidoDe0 = JSON.parse(localStorage.getItem("Contenido 0"));
    // console.log(contenidoDe0);
    contenidoDe0.push(document.getElementById("textAreaConTweet").value);
    // console.log(contenidoDe0);
    localStorage.setItem( `Contenido 0`, JSON.stringify(contenidoDe0));

    /* ********************************************************************** */



    /* Feature: borrar textarea cada vez que se clickee en el botón de contenido "Agregar" */
    /* ********************************************************************** */

    document.getElementById("textAreaConTweet").value = "";

    /* ********************************************************************** */
}


/* Core: sirve para crear un "li", un "a" y anexar el "tweet" y el "a" al "li" */
/* ********************************************************************** */

function crearLiAYAdjuntar (tweet){

    let eliminarTweet = document.createElement("a");
        eliminarTweet.classList.add("eliminarUnTweet");
        eliminarTweet.innerHTML = "X";
        eliminarTweet.setAttribute("href", "#");
        eliminarTweet.onclick = function() {    // Si voy a usar la función que está comentada 15 líneas más abajo, este línea simplemente la tengo que comentar. //
            borrarTweet;    // El/los parámetros van en esta función, no en la anónima de arriba. //
        }
        // Si bien hubiese podido dejar eliminarTweet.onclick = borrarTweet, no lo hago porque si en algún momento la función necesitase enviar algún parámetro, ya ahí la llamada a la función se haría apenas se lee esta línea (y no cuando se hace click sobre el elemento que es lo que quiero) dado que el navegador al leer esta línea automáticamente manda a ejecutar la función. Para soluciona ésto y como buena práctica, SIEMPRE (sea que la función envía o no parámetros) hacerlo como la línea de arriba. //

        let liNuevo = document.createElement("li");
        liNuevo.classList.add("liConTweet");
        liNuevo.appendChild(tweet);
        liNuevo.appendChild(eliminarTweet);
        document.querySelector("#tablaHistoricoDeTweets").appendChild(liNuevo);
}

/* ********************************************************************** */



/* Feature: borrar tweet seleccionado del historial */
/* ********************************************************************** */

// Esta forma de usar el listener sobre un elemento padre, tengo entendido que se llama "Delegation". No la dejé de usar por ser más conveniente la otra forma (elemento.onclick), sino porque ésta fue la primera forma que se me ocurrió y la otra forma se me ocurrió días después. Dejo ambas para dejar registro que se puede hacer de ambas maneras y obtener el mismo resultado. //
/* 
let ulSeleccionado = document.querySelector("#tablaHistoricoDeTweets");
ulSeleccionado.addEventListener("click", e => { // Acá lo hice con FUNCIÓN FLECHA a diferencia del otro eventListener de arriba. //

    if( e.target.classList.contains("eliminarUnTweet") ) {
        let contenido = e.target.previousSibling.textContent; // Contenido del tweet que el usuario está eliminando. //
        let tweets = JSON.parse(localStorage.getItem("Contenido 0"));
        const indexDeTweetABorrarEnLS = tweets.indexOf(contenido); // Obtengo el índice del elemento del tweet que el usuario está eliminando. //
        tweets.splice(indexDeTweetABorrarEnLS, 1);  // Borro del array el elemento que representa al tweet que el usuario está eliminando. //
        localStorage.setItem("Contenido 0", JSON.stringify(tweets));    // Guardo en el "Contenido 0" del Local Storage el array actualizado sin el elemento que el usuario está queriendo eliminar. //
        e.target.parentElement.remove();    // Por último, elimino el elemento "li" que contiene el tweet que el usuario está queriendo eliminar. //
    }
});
*/

// Forma con método de agregarle un listener a un elemento. Ésto se ejecuta al hacer click en la cruz que sigue a un tweet en el historial. El agregado de esta función cuando se hace click en el elemento está en la línea 56. //
function borrarTweet(e) {
    let contenido = e.target.previousSibling.textContent; // Contenido del tweet que el usuario está eliminando. //
        let tweets = JSON.parse(localStorage.getItem("Contenido 0"));
        const indexDeTweetABorrarEnLS = tweets.indexOf(contenido); // Obtengo el índice del elemento del tweet que el usuario está eliminando. //
        tweets.splice(indexDeTweetABorrarEnLS, 1);  // Borro del array el elemento que representa al tweet que el usuario está eliminando. //
        localStorage.setItem("Contenido 0", JSON.stringify(tweets));    // Guardo en el "Contenido 0" del Local Storage el array actualizado sin el elemento que el usuario está queriendo eliminar. //
        e.target.parentElement.remove();
}




/* ********************************************************************** */




/* Feature: cargar todos los mensajes guardados en Local Storage al cargarse la página */
/* ********************************************************************** */

document.addEventListener("DOMContentLoaded", e => {

    let arrayDeTweets = JSON.parse(localStorage.getItem("Contenido 0"));

    for( let tweet of arrayDeTweets ) {

        let tweetAHistorico = document.createElement("p");
        tweetAHistorico.id = "historicoDeTweet";
        tweetAHistorico.innerHTML = tweet;

        crearLiAYAdjuntar(tweetAHistorico);
    }
});


/*  // ESTA ES OTRA FORMA DE HACERLO SIN EL EVENTLISTENER DE "DOMContentLoaded" //
    window.onload = e => {

    let arrayDeTweets = JSON.parse(localStorage.getItem("Contenido 0"));

    for( let tweet of arrayDeTweets ) {

        let tweetAHistorico = document.createElement("p");
        tweetAHistorico.id = "historicoDeTweet";
        tweetAHistorico.innerHTML = tweet;

        crearLiAYAdjuntar(tweetAHistorico);
    }
};
*/


/* ********************************************************************** */
