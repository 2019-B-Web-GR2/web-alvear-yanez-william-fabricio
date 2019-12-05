# web-alvear-yanez-william-fabricio


import {Body, Controller, Delete, Get, Headers, HttpCode, Post, Put, Query} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('suma')
  @HttpCode(200)
  public sumaNumeros(
      @Headers() cabeceras,
      @Headers('numuno') num_uno:string,
      @Headers('numdos') num_dos: string,
  ):string{
    const suma_total : number = parseInt(num_uno) + parseInt(num_dos);
    console.log(typeof num_uno)
    return `La suma de los numeros: ${num_uno} + ${num_dos} es ${suma_total} `;
  }

  @Post('resta')
  @HttpCode(201)
  public restaNumeros(
      @Body() parametrosDeCuerpo,
      @Body('numuno') num_uno: string,
      @Body('numdos') num_dos: string
  ):string{
    const resta_total : number = parseInt(num_uno) - parseInt(num_dos);
    return `La resta de ${num_uno} - ${num_dos} es  ${resta_total}`
  }

  @Put('multiplicacion')
  @HttpCode(202)
  public multiplicarNumeros(
      @Query() parametrosDeConsulta,
      @Query('numuno') num_uno: string,
      @Query('numdos') num_dos: string,
  ):string {
    const multi_total : number = parseInt(num_uno) * parseInt(num_dos);
    return `La multiplicaicon de ${num_uno} * ${num_dos} es  ${multi_total}`
  }

  @Delete('division')
  @HttpCode(203)
  public divisionNumeros(
      @Query('numuno') num_uno_q: string,
      @Query('numdos') num_dos_q: string,

  ):string{
    const div_total : number = parseInt(num_uno_q) / parseInt(num_dos_q);
    return `La multiplicaicon de ${num_uno_q} / ${num_dos_q} es  ${div_total}`

  }

}
