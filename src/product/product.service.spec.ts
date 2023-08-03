import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Product } from './product';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  describe('findAll', () => {
    it('genera el arreglo vacío si no hay productos disponibles', () => {
      const products: Product[] = service.findAll();
      expect(products).toEqual([]);
    });

    it('genera el listado con los productos que han sido creados', () => {
      const product1: Product = { id: '1', nombre: 'Product 1', precio: 10 };
      const product2: Product = { id: '2', nombre: 'Product 2', precio: 20 };
      service.create(product1);
      service.create(product2);

      const products: Product[] = service.findAll();
      expect(products).toEqual([product1, product2]);
    });
  });

  describe('findById', () => {
    it('tiene que mostrar el producto con el id generado', () => {
      const product: Product = { id: '1', nombre: 'Product 1', precio: 10 };
      service.create(product);

      const foundProduct: Product = service.findById('1');
      expect(foundProduct).toBe(product);
    });
  });

  describe('create', () => {
    it('debe realizar la creación y el retorno de los datos del nuevo producto', () => {
      const newProduct: Product = {
        nombre: 'New Product', precio: 50,
        id: ''
      };

      const createdProduct: Product = service.create(newProduct);
      expect(createdProduct).toEqual({ ...newProduct, id: expect.any(String) });

      const foundProduct: Product = service.findById(createdProduct.id);
      expect(foundProduct).toBe(createdProduct);
    });
  });

  describe('update', () => {
    it('responde con Null si no encuenta el producto a actualizar', () => {
      const updatedProduct: Product = { id: '4', nombre: 'Updated Product', precio: 40 };
      const result: Product = service.update('4', updatedProduct);
      expect(result).toBeNull();
    });

    it('actualiza y muestra el producto actualizado', () => {
      const product: Product = { id: '1', nombre: 'Product 1', precio: 10 };
      service.create(product);

      const updatedProduct: Product = { id: '1', nombre: 'Updated Product', precio: 40 };
      const result: Product = service.update('1', updatedProduct);
      expect(result).toStrictEqual(updatedProduct);

    });
  });

  describe('delete', () => {
    it('responde con Null si no encuentra el producto para borrar', () => {
      const result: Product = service.delete('999');
      expect(result).toBeNull();
    });

    it('elimina y devuelve el producto eliminado', () => {
      const product: Product = { id: '1', nombre: 'Product 1', precio: 10 };
      service.create(product);

      const deletedProduct: Product = service.delete('1');
      expect(deletedProduct).toBe(product);
    });
  });
});
