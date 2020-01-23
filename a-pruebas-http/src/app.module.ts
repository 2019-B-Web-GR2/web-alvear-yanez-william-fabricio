import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {UsuarioService} from "./usuario/usuario.service";
import {UsuarioModule} from "./usuario/usuario.module";
import {MascotasModule} from "./mascotas/mascotas.module";
import {MascotasEntity} from "./mascotas/mascotas.entity";

@Module({
  imports: [
      UsuarioModule,
      MascotasModule,
      TypeOrmModule.forRoot(
          {
            type: 'mysql',
            host: '172.31.108.148',
            port: 32769,
            username: 'LazaMH',
            password: '1234',
            database: 'Prueba',
            dropSchema : true,
            entities: [
                UsuarioEntity,
                MascotasEntity,
            ],
            synchronize: true, //si es false solo se va a conectar, si es true se crea
          }
      ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    constructor(
        private _usuarioService: UsuarioService,

    ){

    }
}
