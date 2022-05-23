import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria } from './interface/categoria.interface';
import { BadRequestException, Injectable } from '@nestjs/common';
import {Model} from 'mongoose'

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
  ) {}
  async criarCategoria(
    CriarCategoriaDto: CriarCategoriaDto,
  ): Promise<Categoria> {
    const { categoria } = CriarCategoriaDto;
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();

      if(categoriaEncontrada) {
          throw new BadRequestException(`Categoria $(categoria) já cadastrada!`)
      }

      const categoriaCriada = new this.categoriaModel(CriarCategoriaDto)
      return await categoriaCriada.save()
  }
}
