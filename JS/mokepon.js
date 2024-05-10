const sectionSeleccionarAtaque = document.getElementById("Seleccionar-ataque")
const sectionReinciar = document.getElementById("Reiniciar")
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('Boton-Reiniciar')


const sectionSeleccionarMascota = document.getElementById("Seleccionar-mascota")
const spanMascotaJugador = document.getElementById('Mascota-Jugador')
const spanMascotaEnemigo = document.getElementById("Mascota-Enemigo")

const spanVidasJugador = document.getElementById('Vidas-jugador')
const spanVidasEnemigo = document.getElementById('Vidas-enemigo')

const sectionMensajes = document.getElementById("resultado")
const ataqueDelJugador = document.getElementById("ataque-del-jugador")
const ataqueDelEnemigo = document.getElementById("ataque-del-enemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")


const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './asset/mokemap.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600/800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let Hipodoge = new Mokepon('Hipodoge', '/mokepon/asset/mokepons_mokepon_hipodoge_attack.jpg', 5, './asset/hipodoge.png')

let Capipepo = new Mokepon('Capipepo', '/mokepon/asset/mokepons_mokepon_capipepo_attack.jpg', 5, './asset/capipepo.png')

let Ratigueya = new Mokepon('Ratigueya', '/mokepon/asset/mokepons_mokepon_ratigueya_attack.jpg', 5, './asset/ratigueya.png ')

const HIPODOGE_ATAQUES = [
    { nombre: '💧', id: 'Boton-Agua' },
    { nombre: '💧', id: 'Boton-Agua' },
    { nombre: '💧', id: 'Boton-Agua' },
    { nombre: '🔥', id: 'Boton-Fuego' },
    { nombre: '🍏', id: 'Boton-Tierra' },
]

Hipodoge.ataques.push(...HIPODOGE_ATAQUES)


const CAPIPEPO_ATAQUES = [
    { nombre: '🍏', id: 'Boton-Tierra' },
    { nombre: '🍏', id: 'Boton-Tierra' },
    { nombre: '🍏', id: 'Boton-Tierra' },
    { nombre: '🔥', id: 'Boton-Fuego' },
    { nombre: '💧', id: 'Boton-Agua' }
]

Capipepo.ataques.push(...CAPIPEPO_ATAQUES)


const RATIGUEYA_ATAQUES = [
    { nombre: '🔥', id: 'Boton-Fuego' },
    { nombre: '🔥', id: 'Boton-Fuego' },
    { nombre: '🔥', id: 'Boton-Fuego' },
    { nombre: '💧', id: 'Boton-Agua' },
    { nombre: '🍏', id: 'Boton-Tierra' },
]

Ratigueya.ataques.push(...RATIGUEYA_ATAQUES)


mokepones.push(Hipodoge,Capipepo,Ratigueya)


function iniciarJuego(){

    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
            <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

     inputHipodoge = document.getElementById('Hipodoge')
     inputCapipepo = document.getElementById('Capipepo')
     inputRatigueya = document.getElementById('Ratigueya')

    })

    sectionReinciar.style.display = 'none'
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    botonReiniciar.addEventListener('click', reiniciarjuego)

    unirseAlJuego()

}

function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

//ESCOGER UNA MASCOTA
function seleccionarMascotaJugador() {

    if(inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    }
    else if
    (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    }
    else if
    (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    }
    else {
        alert("Seleccione una mascota")
        return
    }

    sectionSeleccionarMascota.style.display = 'none'

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }

    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataques) => {
        ataquesMokepon = `
        <button id="${ataques.id}" class="boton-de-ataque BAtaque">${ataques.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById('Boton-Fuego')
    botonAgua = document.getElementById('Boton-Agua')
    botonTierra = document.getElementById('Boton-Tierra')
    botones = document.querySelectorAll('.BAtaque')


}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent ===  '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            if (ataqueJugador.length === 5){
                enviarAtaques()
            }
        })
    })

}

function enviarAtaques() {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 1000)
}

function obtenerAtaques(){
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if(res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            Combate()
                        }
                    })
            }
        })
}

//SELECCION DE MASCOTA ENEMIGO
function seleccionarMascotaEnemigo(enemigo)  {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

//ATAQUES ENEMIGOS ALEATORIO
function ataqueEnemigoAleatorio() {
    console.log('ataques enemigo',ataquesMokeponEnemigo);
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}
function iniciarPelea(){
    if (ataqueJugador.length === 5){
        Combate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

//COMBATE
function Combate(){
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador   .length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE")
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO'){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA'){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    revisarVidas()
}


function revisarVidas(){
    if (victoriasJugador == victoriasEnemigo){
        crearMensajeFinal("EMPATE :O")
    } else if (victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("GANASTE TIO")
    } else {
        crearMensajeFinal("PERDISTE TIO")
    }
}

function crearMensaje(resultado){


    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal){

    sectionMensajes.innerHTML = resultadoFinal


    sectionReinciar.style.display = 'block'

}

function reiniciarjuego() {

    location.reload()
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function PintarCanvas() {

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0,0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
     .then(function (res){
        if (res.ok)
            res.json()
                .then(function ({ enemigos }) {
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function (enemigo) {
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if (mokeponNombre === "Hipodoge") {
                           mokeponEnemigo = new Mokepon('Hipodoge', '/mokepon/asset/mokepons_mokepon_hipodoge_attack.jpg', 5,'./asset/hipodoge.png', enemigo.id)
                        } else if (mokeponNombre === 'Capipepo') {
                            mokeponEnemigo = new Mokepon('Capipepo', '/mokepon/asset/mokepons_mokepon_capipepo_attack.jpg', 5, './asset/capipepo.png', enemigo.id )
                        } else if (mokeponNombre === 'Ratigueya') {
                            mokeponEnemigo = new Mokepon('Ratigueya', '/mokepon/asset/mokepons_mokepon_ratigueya_attack.jpg', 5, './asset/ratigueya.png ', enemigo.id)
                        }


                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y

                        return mokeponEnemigo
                     })

                })
     })
}

mokeponesEnemigos.forEach(function(mokepon){
    if(mokepon !=undefined){
        mokepon.pintarMokepon()

        revisarColision(mokepon)
    }
})


function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
}
function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5
}
function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function PresionDeTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}
function iniciarMapa(){

    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(PintarCanvas, 50)

    window.addEventListener('keydown', PresionDeTecla)

    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }

    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota =
        mascotaJugadorObjeto.y
    const abajoMascota =
        mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota =
        mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota =
         mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)

    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)
