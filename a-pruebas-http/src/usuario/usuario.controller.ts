import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";

@Controller('usuario')
export class UsuarioController {

    constructor(
        private readonly _usuarioService: UsuarioService,
    ){

    }

    // GET /modelo/:id
    @Get(':id')
    obtenerUnUsuario(
        @Param('id') identificador: string,
    ): Promise<UsuarioEntity | undefined>{
        return this._usuarioService.encontrarUno(Number(identificador));
    }

    @Post()
    crearUnUsuario(
        @Body() usuario : UsuarioEntity,
    ){
        return this._usuarioService.agregarUsuario(usuario)
    }

    @Get('hola')
    hola(): string{
        return 'HOLA';
    }

}
