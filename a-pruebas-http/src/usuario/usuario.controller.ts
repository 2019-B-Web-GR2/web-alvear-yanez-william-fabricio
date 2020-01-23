import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Req, Res,
    Session
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";
import {DeleteResult, Like} from "typeorm";
import * as Joi from '@hapi/joi'
import {UsuarioCreateDto} from "./usuario.create-dto";
import {validate} from "class-validator";
import {UsuarioUpdateDto} from "./usuario.update-dto";

@Controller('usuario')
export class UsuarioController {

    constructor(
        private readonly _usuarioService: UsuarioService,
    ){

    }

    @Get('rutas/buscar-mostrar-usuario')
    async rutaMostrarUsuarios(
        @Query('mensaje') mensaje: string,
        @Query('error') error: string,
        @Query('consultaUsuario') consultaUsuario: string,
        @Res() res,
    ){
        let consultaServicio;
        if(consultaServicio){
            consultaServicio = [
                {
                    nombre: Like('%' + consultaUsuario + '%'),
                },
                {
                    cedula: Like('%' + consultaUsuario + '%'),
                },
            ];
        }

        const  usuarios = await this._usuarioService.buscarTodos();
        res.render(
            'usuario/rutas/buscar-mostrar-usuario',
            {
                datos: {
                    //usuarios: usuarios,
                    mensaje,
                    usuarios,
                    error,
                }
            }
            );
    }

    @Get('rutas/crear-usuario')
    async rutaCrearUsuarios(
        @Query('error') error: string,
        @Res() res,
    ){
        res.render(
            'usuario/rutas/crear-usuario',
            {
                datos: {
                    error,
                },
            }
        );
    }

    @Post(':id')
    async eliminarUnoPost(
        @Param('id') id: string,
        @Res() res,
    ): Promise<void> {
        try {
            await this._usuarioService
                .BorrarUsuario(
                    +id,
                );
            res.redirect(`/usuario/rutas/buscar-mostrar-usuarios?mensaje=Usuario ID: ${id} eliminado`);
        } catch (error) {
            console.error(error);
            res.redirect('/usuario/rutas/buscar-mostrar-usuarios?error=Error del servidor');
        }
    }

    @Get('ruta/editar-usuario/:idUsuario')
    async rutaEditarUsuario(
        @Query('error') error: string,
        @Param('idUsuario') idUsuario: string,
        @Res() res,
    ) {
        const consulta = {
            id: idUsuario,
        };
        try {
            const arregloUsuarios = await this._usuarioService.buscarTodos(consulta);
            if (arregloUsuarios.length > 0) {
                res.render(
                    'usuario/rutas/crear-usuario',
                    {
                        datos: {error, usuario: arregloUsuarios[0]},
                    },
                );
            } else {
                res.redirect(
                    '/usuario/rutas/buscar-mostrar-usuarios?error=No existe ese usuario',
                );
            }
        } catch (error) {
            console.log(error);
            res.redirect(
                '/usuario/rutas/buscar-mostrar-usuarios?error=Error editando usuario',
            );
        }

    }

    @Get('ejemploejs')
    ejemploejs(
        @Res() res,
    ){
        res.render('ejemplo',{
            datos: {
                nombre : 'Fabricio',
                suma: this.suma, //Definicion de la funcion mas no la ejecucion
                joi:Joi,

            },
        });

    }

    suma(numUno, numDos){
        return numUno + numDos
    }


    @Post('login')
    login(
        @Body('username') username: string,
        @Body('password') password: string,
        @Session() session

    ){
        console.log('Session', session);
        if(username === 'adrian' && password === '1234'){
            session.usuario = {
                nombre: 'Adrian',
                userId: 1,
                roles: ['Administrador']
            }
            return 'ok';
        }

        if(username === 'vicente' && password === '1234'){
            session.usuario = {
                nombre: 'Vicente',
                userId: 2,
                roles: ['Supervisor']
            }
            return 'ok';
        }



        throw new BadRequestException('No envia credenciales')

    }

    @Get('sesion')
    sesion(
        @Session() session
    ){
        return session;
    }

    @Get('logout')
    logout(
        @Session() session,
        @Req() req,
    ){
        session.usuario = undefined;
        req.session.destroy();
        return 'Deslogueado';
    }

    @Get('hola')
    hola(
        @Session() session,
    ): string{
        let contenidoHTML = '';
        if(session.usuario){
            contenidoHTML = '<ul>';
            session.usuario
                .roles
                .forEach(
                    (nombreRol) => {
                        contenidoHTML = contenidoHTML + `<li>${nombreRol}</li>`;
                    },
                );
            contenidoHTML += '</ul>';
        }


        return `
<html>
    <head><title>EPN</title></head>
    <body>
    
    <--! Condicion ? si : no -->
    
    <h1>Mi primera pagina web ${
            session.usuario ? session.usuario.nombre : ''
        }</h1>
    ${contenidoHTML}
</body>
</html>`
    }

    // GET /modelo/:id
    @Get(':id')
    obtenerUnUsuario(
        @Param('id') identificador: string,
    ): Promise<UsuarioEntity | undefined>{
        return this._usuarioService.encontrarUno(Number(identificador));
    }

    @Post()
    async crearUnUsuario(
        @Body() usuario : UsuarioEntity,
        @Res() res,
    ): Promise<void>{
        const usuarioCreateDTO = new UsuarioCreateDto();
        usuarioCreateDTO.nombre = usuario.nombre;
        usuarioCreateDTO.cedula = usuario.cedula;
        const errores = await validate(usuarioCreateDTO)
        if(errores.length > 0){
            // throw new BadRequestException('Error validando')
            res.redirect(
                '/usuario/rutas/crear-usuario?error=Error validando',
            );
        }else {
            try {
                await this._usuarioService
                    .agregarUsuario(
                        usuario,
                    );
                res.redirect(
                    '/usuario/rutas/buscar-mostrar-usuarios',
                );
            } catch (error) {
                console.error(error);
                res.redirect(
                    '/usuario/rutas/crear-usuario?error=Error del servidor',
                );
            }
        }

    }

    @Post('id')
    async actualizarUnUsuario(
        @Body() usuario : UsuarioEntity,
        @Param('id') id : string,
        @Res() res,

    ): Promise<void>{
        const usuarioUpdateDTO = new UsuarioUpdateDto();
        usuarioUpdateDTO.nombre = usuario.nombre;
        usuarioUpdateDTO.cedula = usuario.cedula;
        usuarioUpdateDTO.id = +id;
        const errores = await validate(usuarioUpdateDTO);
        if (errores.length > 0) {
            res.redirect(
                '/usuario/rutas/editar-usuario/' + id + '?error=Usuario no valido',
            );
        }else{
            await this._usuarioService
                .actualizarUsuario(
                    +id,
                    usuario,
                );
            res.redirect(
                '/usuario/rutas/buscar-mostrar-usuarios?mensaje=El usuario ' + usuario.nombre + ' actualizado',
            );
        }

    }

    @Delete('id')
    eliminarUnUsuario(
        @Body('username') username: string,
        @Body('password') password: string,
        @Session() session,
        @Param('id') id : string,
    ): Promise<DeleteResult>{
        if(username === 'vicente' && password === '1234') {
            if (session.usuario.roles === ['Administrador']) {
                return this._usuarioService.BorrarUsuario(+id)
            }
        }

    }

    @Get()
    async buscar(
        @Query('skip') skip?: string | number,
        @Query('take') take?: string | number,
        @Query('where') where?: string,
        @Query('order') order?: string


    ): Promise<UsuarioEntity[]>{
        
        if(skip){
            skip = +skip;
            // const nuevoEsquema = Joi.object({
            //     skip: Joi.number()
            // });
            // try {
            //     const objetoValidado = await nuevoEsquema
            //         .validateAsync({
            //             skip: skip
            //         });
            //     console.log('objetoValidado', objetoValidado);
            // }catch (err) {
            //     console.error('Error', err)
            // }
        }
        if(take){
            take = +take;
        }
        if(where){
            try {
                where = JSON.parse(where);
            }catch (e) {
                where = undefined;
            }
        }
        if(order){
            try {
                order = JSON.parse(order);
            }catch (e) {
                order = undefined;
            }
        }

        return this._usuarioService.buscarTodos(
            where,
            skip as number,
            take as number,
            order
        )
    }



}
