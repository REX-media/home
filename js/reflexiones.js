// =============================================================================
// SCRIPT PARA FRASES ALEATORIAS EN SECCIÓN REFLEXIONES - REX MEDIA
// =============================================================================

// Array con todas las frases y autores
const reflexiones = [
    {
        frase: "La gente ignora el diseño que ignora a la gente.",
        autor: "Frank Chimero"
    },
    {
        frase: "La tecnología hace posible lo que antes era imposible. El diseño hace que sea real.",
        autor: "Michael Gagliano"
    },
    {
        frase: "El lenguaje es una limitación, una prisión. El diseño permite explorar otros espacios.",
        autor: "Neville Brody"
    },
    {
        frase: "Si puedes diseñar una cosa, entonces puedes diseñarlo todo; si lo haces bien, perdurará para siempre.",
        autor: "Massimo Vignelli"
    },
    {
        frase: "Haz el trabajo que le haga bien a tu alma, no a tu ego.",
        autor: "Jessica Walsh"
    },
    {
        frase: "Haz un buen trabajo para buenas personas.",
        autor: "Aaron Draplin"
    },
    {
        frase: "He visto películas que me han conmovido, he leído libros que han cambiado mi modo de ver las cosas y he escuchado música que ha influido en mi ánimo. Nuestro objetivo será llegar al corazón de la gente con el diseño.",
        autor: "Stefan Sagmeister"
    },
    {
        frase: "Haz lo que mejor sabes hacer, pero sé capaz de cambiar con el tiempo.",
        autor: "Paula Scher"
    },
    {
        frase: "Que tus diseños tengan un fuerte significado.",
        autor: "Jacqueline Casey"
    },
    {
        frase: "Los símbolos sencillos y económicos funcionan mejor y de forma más universal que los cargados de detalles.",
        autor: "Susan Kare"
    },
    {
        frase: "En cuanto los clientes se dan cuenta de que los cambios no son un bufet libre, descubren que ya no tienen hambre.",
        autor: "Lester Ball"
    },
    {
        frase: "La información solo es útil cuando es comprendida.",
        autor: "Muriel Cooper"
    },
    {
        frase: "Leo mucho, después pienso y hago un gran número de bocetos. Nunca voy al ordenador si no tengo ideas antes.",
        autor: "Noma Bar"
    },
    {
        frase: "El significado de un logo deriva de la calidad de lo que simboliza, no a la inversa.",
        autor: "Paul Rand"
    },
    {
        frase: "Cada gran diseño comienza con una historia aún mejor.",
        autor: "Lorinda Mamo"
    },
    {
        frase: "Diseñar es pensar en hacerlo visual.",
        autor: "Saul Bass"
    },
    {
        frase: "Al usar iconos puedes crear un sentido de pertenencia, y puedes crear un programa internacional que no dependa de ningún lenguaje.",
        autor: "Lance Wyman"
    },
    {
        frase: "El contenido precede al diseño. Diseño en ausencia de contenido no es diseño, es decoración.",
        autor: "Jeffrey Zeldman"
    },
    {
        frase: "El diseño debe servir para comunicar de la manera más clara y sencilla posible.",
        autor: "Astrid Stavro"
    },
    {
        frase: "El diseño está en todo lo que hacemos, pero también está en medio de todo; es una combinación de arte, historia y filosofía.",
        autor: "Erik Adigard"
    },
    {
        frase: "La idea no es vivir para siempre: la idea es crear algo que sí lo haga.",
        autor: "Andy Warhol"
    },
    {
        frase: "Solo hay un tipo de diseñador: al que le importa la tipografía.",
        autor: "Rohan Nanavati"
    },
    {
        frase: "La tipografía necesita ser escuchada, necesita ser sentida, necesita ser vivida.",
        autor: "Helmut Schmid"
    },
    {
        frase: "Deshazte de todo lo que no es esencial para mostrar algo.",
        autor: "Cristoph Niemann"
    },
    {
        frase: "El rol de un buen diseñador es anticiparse, como un buen anfitrión lo hace con las necesidades de sus invitados.",
        autor: "Charles Eames"
    },
    {
        frase: "Observa las cosas usuales con ojos inusuales.",
        autor: "Vigo Magistretti"
    },
    {
        frase: "No busques la alabanza, busca la crítica.",
        autor: "Paul Arden"
    },
    {
        frase: "Todo está diseñado. Pocas cosas están bien diseñadas.",
        autor: "Brian Reed"
    },
    {
        frase: "La simplicidad es sustraer lo obvio y añadir lo significativo.",
        autor: "John Maeda"
    },
    {
        frase: "Simplicidad, blanco y una buena tipografía.",
        autor: "Michael Bierut"
    },
    {
        frase: "El gran diseño es una relación multidimensional entre la vida humana y el entorno.",
        autor: "Naoto Fukasawa"
    },
    {
        frase: "La interfaz de usuario es como un chiste: si tienes que explicarla, entonces no es tan buena.",
        autor: "Martin LeBlanc"
    },
    {
        frase: "El diseño es una oportunidad de seguir contando una historia, no de resumirla.",
        autor: "Tate Linden"
    },
    {
        frase: "El fracaso es algo que debemos aceptar; si no cometes los suficientes errores, no estás tomando riesgos.",
        autor: "Debbie Millman"
    },
    {
        frase: "El trabajo que haces mientras procrastinas es el que debes hacer el resto de tu vida.",
        autor: "Jessica Hische"
    },
    {
        frase: "El diseño puede ser arte. El diseño puede ser estética. El diseño es tan simple, por eso es tan complicado.",
        autor: "Paul Rand"
    },
    {
        frase: "El buen diseño es honesto.",
        autor: "Dieter Rams"
    },
    {
        frase: "Los detalles no son detalles. Los detalles hacen el diseño.",
        autor: "Charles Eames"
    },
    {
        frase: "El diseño es el intermediario entre la información y la comprensión.",
        autor: "Hans Hoffman"
    },
    {
        frase: "El color es tan intuitivo.",
        autor: "Milton Glaser"
    },
    {
        frase: "El espacio en blanco es como el aire: es necesario para que el diseño respire.",
        autor: "Wojciech Zieliński"
    },
    {
        frase: "Para mí, no hay reglas cuando se trata de lo que se considera un 'buen' diseño.",
        autor: "Kate Moross"
    },
    {
        frase: "La simplicidad es la máxima sofisticación.",
        autor: "Leonardo da Vinci"
    },
    {
        frase: "Puedes hacer un buen anuncio sin una buena tipografía, pero no puedes hacer un gran anuncio sin una buena tipografía.",
        autor: "Herb Lubalin"
    },
    {
        frase: "Hay tres respuestas a una pieza de diseño: sí, no y ¡guau! Guau es el objetivo al que hay que apuntar.",
        autor: "Milton Glaser"
    },
    {
        frase: "El diseño gráfico salvará el mundo justo después de que lo haga el rock and roll.",
        autor: "David Carson"
    },
    {
        frase: "Si puedes definir correctamente el problema, entonces también has definido la solución.",
        autor: "Chip Kidd"
    },
    {
        frase: "El buen diseño es como un refrigerador: cuando funciona, nadie se da cuenta, pero cuando no funciona, definitivamente apesta.",
        autor: "Irene Au"
    },
    {
        frase: "Me gusta entrar en áreas donde tengo miedo. El miedo es una señal de que voy en la dirección correcta.",
        autor: "April Greiman"
    },
    {
        frase: "La creatividad no es más que una mente liberada.",
        autor: "Torrie T. Asai"
    }
];

// Función para obtener una reflexión aleatoria
function obtenerReflexionAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * reflexiones.length);
    return reflexiones[indiceAleatorio];
}

// Función para actualizar la sección de reflexiones
function actualizarReflexiones() {
    // Buscar el contenedor de la reflexión
    const postSingle = document.querySelector('.fotter-single-area .post-area .post-single');
    
    if (postSingle) {
        // Obtener una reflexión aleatoria
        const reflexionAleatoria = obtenerReflexionAleatoria();
        
        // Actualizar el contenido
        postSingle.innerHTML = `
            <p>«${reflexionAleatoria.frase}»</p>
            <span style="color: #ffc400; font-size: 12px; font-weight: 700;"> — ${reflexionAleatoria.autor}</span>
        `;
    }
}

// Ejecutar cuando la página se haya cargado completamente
document.addEventListener('DOMContentLoaded', function() {
    actualizarReflexiones();
});

// También ejecutar si la página ya está cargada (por si acaso)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', actualizarReflexiones);
} else {
    actualizarReflexiones();
}