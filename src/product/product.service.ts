import { Injectable } from '@nestjs/common';
import { Product } from './product';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  findAll(): Product[] {
    return this.products;
  }

  findById(id: string): Product {
    return this.products.find(product => product.id === id);
  }

  create(product: Product): Product {
    this.products.push(product);
    return product;
  }

  update(id: string, updatedProduct: Product): Product {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...updatedProduct, id };
      return this.products[index];
    }
    return null;
  }

  delete(id: string): Product {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      return this.products.splice(index, 1)[0];
    }
    return null;
  }
}

