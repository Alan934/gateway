import { Body, Controller, Delete, Get, Param, Patch, Post, Inject, Query, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { PRODUCTS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { firstValueFrom } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto){
    return this.productsClient.send({ cmd: 'createProduct' }, createProductDto );
    //return 'This action adds a new product';
  }

  @Get()
  findAllProduct( @Query() paginationDto: PaginationDto){
    return this.productsClient.send({ cmd: 'findAllProducts' }, paginationDto );
    //return 'This action returns all products';
  }

  @Get(':id')
  async findOne(@Param('id') id: string){
    try {
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'findOneProduct' }, { id } )
      );
      return product;

    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string){
    try {
      const deleteProduct = await firstValueFrom(
        this.productsClient.send({ cmd: 'deleteProduct' }, { id } )
      );
      return deleteProduct;

    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ){
    try {
      const updateProduct = await firstValueFrom(
        this.productsClient.send({ cmd: 'updateProduct' }, { id, ...updateProductDto } )
      );
      return updateProduct;

    } catch (error) {
      throw new RpcException(error);
    }
  }
}
