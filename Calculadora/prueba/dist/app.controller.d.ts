import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    sumaNumeros(cabeceras: any, num_uno: string, num_dos: string): string;
    restaNumeros(parametrosDeCuerpo: any, num_uno: string, num_dos: string): string;
    multiplicarNumeros(parametrosDeConsulta: any, num_uno: string, num_dos: string): string;
    divisionNumeros(num_uno_q: string, num_dos_q: string): string;
}
