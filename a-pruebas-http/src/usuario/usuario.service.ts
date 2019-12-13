import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {DeleteResult, Repository} from "typeorm";

@Injectable()
export class UsuarioService{
    constructor(
        @InjectRepository(UsuarioEntity)    //Inyectar Dependencias
        private  _repositorioUsuario: Repository <UsuarioEntity>
    ){

    }

    /*async encontrarUno(id: number) {
        console.log('Empezo')
        const usuario = await this._repositorioUsuario
            .findOne(id);
        console.log(usuario)
        console.log(':D termino en orden :v')
        return usuario;
    }*/

    encontrarUno(id: number): Promise<UsuarioEntity | undefined>{
        return this._repositorioUsuario.findOne(id);
    }

    agregarUsuario(usuario: UsuarioEntity){
        return this._repositorioUsuario.save(usuario);
    }

    BorrarUsuario(id: number): Promise<DeleteResult>{
        return this._repositorioUsuario.delete(id);
    }

    actualizarUsuario(id:number, usuario: UsuarioEntity): Promise<UsuarioEntity>{
        usuario.id = id;
        return this._repositorioUsuario.save(usuario); //upsert
    }

    buscarTodos(
        where : any = {},
        skip: number = 0,
        take: number = 10
    ){
        this._repositorioUsuario.find({
            //where:{ //normal
           //     cedula:'17123123'
           // }
            where: [ // OR
                {
                    nombre : 'Fabricio'
                },
                {
                    nombre: "Alvear"
                }
            ],
            skip: 0,
            take: 10
        })
    }
}
