"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() { return this.appService.getHello(); }
    sumaNumeros(cabeceras, num_uno, num_dos) {
        let contador = 100;
        const suma_total = parseInt(num_uno) + parseInt(num_dos);
        const ressultado = contador - suma_total;
        if (ressultado <= 0) {
            contador = 100;
            return `Contador vacio en breve se reestablecera`;
        }
        else {
            console.log(typeof num_uno);
            return `La suma de los numeros: ${num_uno} + ${num_dos} es ${suma_total} y el contador es ${ressultado} `;
        }
    }
    restaNumeros(parametrosDeCuerpo, num_uno, num_dos) {
        let contador = 100;
        const resta_total = parseInt(num_uno) - parseInt(num_dos);
        const ressultado = contador - resta_total;
        if (ressultado <= 0) {
            contador = 100;
            return `Contador vacio en breve se reestablecera a 100 nuevamente`;
        }
        else {
            console.log(typeof num_uno);
            return `La resta de los numeros: ${num_uno} - ${num_dos} es ${resta_total} y el contador es ${ressultado} `;
        }
    }
    multiplicarNumeros(parametrosDeConsulta, num_uno, num_dos) {
        let contador = 100;
        const multi_total = parseInt(num_uno) * parseInt(num_dos);
        const ressultado = contador - multi_total;
        if (ressultado <= 0) {
            contador = 100;
            return `Contador vacio en breve se reestablecera`;
        }
        else {
            console.log(typeof num_uno);
            return `La multiplicacion de los numeros: ${num_uno} * ${num_dos} es ${multi_total} y el contador es ${ressultado} `;
        }
    }
    divisionNumeros(num_uno_q, num_dos_q) {
        let contador = 100;
        const div_total = parseInt(num_uno_q) / parseInt(num_dos_q);
        const ressultado = contador - div_total;
        if (ressultado <= 0) {
            contador = 100;
            return `Contador vacio en breve se reestablecera`;
        }
        else {
            console.log(typeof num_uno_q);
            return `La division de los numeros: ${num_uno_q} / ${num_dos_q} es ${div_total} y el contador es ${ressultado} `;
        }
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    common_1.Get('suma'),
    common_1.HttpCode(200),
    __param(0, common_1.Headers()),
    __param(1, common_1.Headers('numuno')),
    __param(2, common_1.Headers('numdos')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", String)
], AppController.prototype, "sumaNumeros", null);
__decorate([
    common_1.Post('resta'),
    common_1.HttpCode(201),
    __param(0, common_1.Body()),
    __param(1, common_1.Body('numuno')),
    __param(2, common_1.Body('numdos')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", String)
], AppController.prototype, "restaNumeros", null);
__decorate([
    common_1.Put('multiplicacion'),
    common_1.HttpCode(202),
    __param(0, common_1.Query()),
    __param(1, common_1.Query('numuno')),
    __param(2, common_1.Query('numdos')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", String)
], AppController.prototype, "multiplicarNumeros", null);
__decorate([
    common_1.Delete('division'),
    common_1.HttpCode(203),
    __param(0, common_1.Query('numuno')),
    __param(1, common_1.Query('numdos')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", String)
], AppController.prototype, "divisionNumeros", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map