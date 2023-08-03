import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(): Product[] {
    return this.productService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Product {
    return this.productService.findById(id);
  }

  @Post()
  create(@Body() product: Product): Product {
    return this.productService.create(product);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() product: Product): Product {
    return this.productService.update(id, product);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Product {
    return this.productService.delete(id);
  }
}
