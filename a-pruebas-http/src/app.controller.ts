import {
    Body,
    Controller,
    Get,
    Headers,
    HttpCode,
    InternalServerErrorException,
    Param,
    Post,
    Query,
    Res,
} from '@nestjs/common';
import {AppService} from './app.service';

@Controller('pepito')  // Decorador   segmento url "/"
export class AppController {
    constructor(private readonly appService: AppService) {
    } //http://localhost:4000/pepito/hola-mundo

    @Get('login')
    login(
        @Res() res,
    ) {
        res.render('login/login');
    }

    @Get() // url
    getHello(): string {
        return this.appService.getHello();
    }

    @HttpCode(200)

    @Post('esPar')
    adiosMundo(): string{
      const segundos = this.obtenerSegundos();
      if(segundos % 2 === 0){
        return 'Adios mundo!'
      }else{
        throw new  InternalServerErrorException(
            'Es impar'
        );
      }

    }

    private obtenerSegundos():number{
      return new Date().getSeconds();
    }

    @Get('bienvenida')
    public bienvenida(
        @Query() parametrosDeConsulta:ObjetoBienvenida,
        @Query('nombre') nombre:string,
        @Query('tel') telUsuario:number,
        @Query('casado') casadoUsuario:boolean,
    ): string{
        console.log(parametrosDeConsulta)
        console.log(typeof telUsuario)
        // template strings `Mensaje ${variable}`
        return `Mensaje ${parametrosDeConsulta.nombre} Numero: ${parametrosDeConsulta.tel}`
    }

    @Get('inscripcion-curso/:idCurso/:cedula') // /: nombreParametro
    public inscripcionCurso(
        @Param() parametrosDeRuta: ObjetoInscripcion,//
        @Param('idCurso') idCurso: string,
        @Param('cedula') cedula: string,
    ): string{
        console.log(parametrosDeRuta);
        return `Te inscribiste al curso: ${idCurso} Con la cedula ${cedula}`
    }

    @Post('almorzar')
    @HttpCode(200)
    public almorzar(
        @Body() parametrosDeCuerpo,
        @Body('id') id: number, //no puede hacer esto si recibes un array

    ): string{
        console.log(parametrosDeCuerpo)
        return `Te inscribiste al curso: ${parametrosDeCuerpo}`
    }

    @Get('obtener-cabeceras')
    obtenerCabeceras(
        @Headers() cabeceras,
        @Headers('numerouno') numeroUno: string,
    ){
        console.log(cabeceras)
        return `Las cabeceras son: ${cabeceras}`
    }

}

interface ObjetoBienvenida {
    nombre?:string;
    tel?:string;
    casado?:string;

}

interface ObjetoInscripcion {
    idCurso:string;
    cedula:string;
}

/*
// typescript
// var nombre : string = "Fabricio" ; (este no utilizamos nunca!!!)
let apellido: string = "Alvear"; // Mutable:
const cedula: string = "172265"; // Inmutable OK

apellido = "Yanez"; // Re asignando  "=" Mutable
// cedula = "18"; // :(Inmutable - no reasignar)
const casado: boolean = false;
const edad: number = 30;
const sueldo: number = 12.12;
const hijos = null; // null
let ojos; // undefined

// TRUTY - FALSY

if (0) {
    console.log('Truty');
} else {
    console.log('False'); // Falsy
}

if (-1) {
    console.log('Truty'); // Truty
} else {
    console.log('False');
}

if (1) {
    console.log('Truty'); // Truty
} else {
    console.log('False');
}

if ("") {
    console.log('Truty');
} else {
    console.log('False'); // Falsy
}

if ("abc") {
    console.log('Truty'); // Truty
} else {
    console.log('False');
}

if ([]) {
    console.log('Truty'); // Truty
} else {
    console.log('False');
}

if ({}) {
    console.log('Truty'); // Truty
} else {
    console.log('False');
}

// Clases

class Usuario {
    public cedula: string = "17223";
    cedula2: string = "17223"; // public : string
    private holamundo(): void {
        console.log("Hola");
    }

    holamundo2() {
        console.log("Hola");
    }

    constructor(cedula: string) {
        this.cedula
    }
}

class Usuario2 {
    constructor(
        public nombre: string, // parametro requerido
        public apellido?: string, // parametro opcional
    ) {
    }
}

const fabricio = new Usuario2("Fabricio");
const fabricio = new Usuario2("Fabricio", "Alvear");

// Herencia

class Empleado extends Usuario2 {
    constructor(
        nombre: string,
        public  numeroContrato: string,
        apellido?: string
    ) {
        super(nombre, apellido);
    }

}

const empleadoFabricio = new Empleado("Fabricio", "1234");




interface Pelota {
  diametro:number;
  color?:string;
}

const balonFutbol : Pelota = {
  diametro: 1,
  color: "Azul",
  //peso: 12,
}


class Juego implements Pelota{
  diametro: number;
}

interface Entrenador{
  id: number;
  nombre: string;
}

interface Pokemon {
  id: number;
  nombre:string;
  entrenador: Entrenador | number; // Foreing key
}

const  ash: Entrenador = {
  id:1,
  nombre: 'Ash',
};

const pikachu: Pokemon = {
  id: 1,
  nombre: 'Pikachu',
  entrenador:1,
};

const suma = pikachu.entrenador as number + pikachu.id;
const suma2 = <number> pikachu.entrenador + pikachu.id;

*/

