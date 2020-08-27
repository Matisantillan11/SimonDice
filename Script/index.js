const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const btnEmpezar = document.getElementById('btnEmpezar');
const nombreUsuario = document.getElementById('usuario');
const ultimo_nivel = 10;
let scoreUser = 0;
let scorePc = 0;
let marcadorUsuario = document.getElementById('marcador-usuario');
let marcadorPC = document.getElementById('marcador-machine');
let usuario;


class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this);
    this.inicializar();
    this.generarSecuencia();
    setTimeout(this.siguienteNivel,500);
    
  }

  inicializar() {
    /* this.obtenerNombre = this.obtenerNombre.bind(this);
    this.obtenerNombre(); */
    this.siguienteNivel = this.siguienteNivel.bind(this);
    this.elegirColor = this.elegirColor.bind(this);
    btnEmpezar.classList.toggle('hide')
    this.nivel = 1;
    this.colores = {
        celeste: celeste,
        violeta:violeta,
        naranja: naranja,
        verde: verde
    };
  }

  /* obtenerNombre(){
    usuario = prompt('¿Cuál es tu nombre de usuario?');
    if(usuario === ""){
      usuario = "User";
    }else if (usuario.length > 5){
      usuario = prompt('¿Cuál es tu nombre de usuario? (No más de 5 carácteres): ');
    }else{
      this.nombre = usuario;
      this.cambiarNombre(usuario);
    }
    
  }

  cambiarNombre(nombre){
      nombreUsuario.innerHTML = nombre;
      marcadorUsuario.innerHTML = 0;
  }  */

  generarSecuencia(){
      this.secuencia = new Array(ultimo_nivel).fill(0).map(n => Math.floor(Math.random()*4));
      
  }

  siguienteNivel(){
      this.subnivel = 0;
      this.iluminarSecuencia();
      this.agregarEventosClick();
  }


  transformarAColor(numero){
    switch(numero){
        case 0:
            return 'celeste';
        case 1: 
            return 'violeta';
        case 2:
            return 'naranja';
        case 3:
            return 'verde';
    }
  }

  transformarANumero(color){
    switch(color){
      case 'celeste':
          return 0;
      case 'violeta': 
          return 1;
      case 'naranja':
          return 2;
      case 'verde':
          return 3;
    }
  }
  
  iluminarSecuencia(){
      for (let i = 0; i < this.nivel; i++){
        let color = this.transformarAColor(this.secuencia[i]);
        setTimeout(()=> this.iluminarColor(color), 1000 * i);
      }
  }

  iluminarColor(color){
      this.colores[color].classList.add('light');
      setTimeout(()=>this.apagarColor(color),350);
  }

  apagarColor(color){
      this.colores[color].classList.remove('light');
  }
  agregarEventosClick(){
    for (const color in this.colores){
      this.colores[color].addEventListener('click', this.elegirColor); //bind hace que si o si this sea el juego en si (con sus niveles, colores, etc.) y no el C/U de los botones
    }
  }

  eliminarEventosClick(){
    for (const color in this.colores){
      this.colores[color].removeEventListener('click', this.elegirColor);
    }
  }

  elegirColor(ev){
    let nombreColor = ev.target.dataset.color;
    let numeroColor = this.transformarANumero(nombreColor);
    this.iluminarColor(nombreColor);
    if(numeroColor === this.secuencia[this.subnivel]){
      this.subnivel++;
      
      if(this.subnivel === this.nivel){
        this.nivel++;
        scoreUser++;
       marcadorUsuario.innerHTML = scoreUser;
        if(this.nivel === (ultimo_nivel + 1)){
          this.ganaste();
        }else{
          setTimeout(this.siguienteNivel, 1500);
        }
      }
    } else{
      scorePc++;
      marcadorPC.innerHTML = scorePc ;
      this.perdiste();
    }
  }

  ganaste(){
    swal('Simon Dice',`Felicitaciones ${this.nombre}, ganaste`, 'success').then(()=>{
      this.eliminarEventosClick();
      this.inicializar();
    });
  }

  perdiste(){
    swal('Simon Dice',`Lo sentimos ${this.nombre}, perdiste`, 'error').then(()=>{
      this.eliminarEventosClick();
      this.inicializar();
    });
  }
}

const empezarJuego= ()=> {
  window.juego = new Juego();
}
