import {Body, Controller, Delete, Get, Headers, HttpCode, Post, Put, Query} from '@nestjs/common'; import { AppService } from './app.service';

@Controller() export class AppController { constructor(private readonly appService: AppService) {}

  @Get() getHello(): string { return this.appService.getHello(); }

  @Get('suma')
  @HttpCode(200)
  public sumaNumeros(
      @Headers() cabeceras,
      @Headers('numuno') num_uno:string,
      @Headers('numdos') num_dos: string,
      ):string{
  let contador: number = 100;
  const suma_total : number = parseInt(num_uno) + parseInt(num_dos);
  const  ressultado = contador - suma_total;
  if (ressultado <= 0){
    contador = 100;
    return `Contador vacio en breve se reestablecera`;
  }else{
    console.log(typeof num_uno)
    return `La suma de los numeros: ${num_uno} + ${num_dos} es ${suma_total} y el contador es ${ressultado} `;
  }

  }

  @Post('resta')
  @HttpCode(201)
  public restaNumeros(
      @Body() parametrosDeCuerpo,
      @Body('numuno') num_uno: string,
      @Body('numdos') num_dos: string
  ):string{
    let contador: number = 100;
    const resta_total : number = parseInt(num_uno) - parseInt(num_dos);
    const  ressultado = contador - resta_total;
    if (ressultado <= 0){
      contador = 100;
      return `Contador vacio en breve se reestablecera a 100 nuevamente`;

    }else{
      console.log(typeof num_uno)
      return `La resta de los numeros: ${num_uno} - ${num_dos} es ${resta_total} y el contador es ${ressultado} `;
    }
}

  @Put('multiplicacion')
  @HttpCode(202)
  public multiplicarNumeros(
      @Query() parametrosDeConsulta,
      @Query('numuno') num_uno: string,
      @Query('numdos') num_dos: string,
      ):string {
    let contador: number = 100;
    const multi_total : number = parseInt(num_uno) * parseInt(num_dos);
    const  ressultado = contador - multi_total;
    if (ressultado <= 0){
      contador = 100;
      return `Contador vacio en breve se reestablecera`;

    }else{
      console.log(typeof num_uno)
      return `La multiplicacion de los numeros: ${num_uno} * ${num_dos} es ${multi_total} y el contador es ${ressultado} `;
    }
}

  @Delete('division')
  @HttpCode(203)
  public divisionNumeros(
      @Query('numuno') num_uno_q: string,
      @Query('numdos') num_dos_q: string,

  ):string{
    let contador: number = 100;
    const div_total : number = parseInt(num_uno_q) / parseInt(num_dos_q);
    const  ressultado = contador - div_total;
    if (ressultado <= 0){
      contador = 100;
      return `Contador vacio en breve se reestablecera`;
    }else{
      console.log(typeof num_uno_q)
      return `La division de los numeros: ${num_uno_q} / ${num_dos_q} es ${div_total} y el contador es ${ressultado} `;
    }

  }



}
