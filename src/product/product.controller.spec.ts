import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './product';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  describe('findAll', () => {
    it('muestra el arreglo de los productos generados', () => {
      const products: Product[] = [
        { id: '1', nombre: 'Product 1', precio: 10 },
        { id: '2', nombre: 'Product 2', precio: 20 },
      ];

      jest.spyOn(service, 'findAll').mockReturnValue(products);
      const result = controller.findAll();
      expect(result).toEqual(products);
    });
  });

  describe('findById', () => {
    it('muestra el producto llamado con su respectivo ID', () => {
      const product: Product = { id: '1', nombre: 'Product 1', precio: 10 };

      jest.spyOn(service, 'findById').mockReturnValue(product);

      const result = controller.findById('1');

      expect(result).toEqual(product);
    });

    it('muestra Null si el producto con la ID proporcionada no existe', () => {
      jest.spyOn(service, 'findById').mockReturnValue(null);

      const result = controller.findById('non-existent-id');

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('realiza la creación y muestra el nuevo producto', () => {
      const product: Product = { id: '1', nombre: 'New Product', precio: 20 };

      jest.spyOn(service, 'create').mockReturnValue(product);

      const result = controller.create(product);

      expect(result).toEqual(product);
    });
  });

  describe('update', () => {
    it('debe actualizar y devolver el producto actualizado', () => {
      const updatedProduct: Product = { id: '1', nombre: 'Updated Product', precio: 30 };

      jest.spyOn(service, 'update').mockReturnValue(updatedProduct);

      const result = controller.update('1', updatedProduct);

      expect(result).toEqual(updatedProduct);
    });

    it('muestra Null si el producto a actualizar no existe', () => {
      const updatedProduct: Product = { id: 'non-existent-id', nombre: 'Product', precio: 40 };

      jest.spyOn(service, 'update').mockReturnValue(null);

      const result = controller.update('non-existent-id', updatedProduct);

      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('elimina y muestra el producto eliminado', () => {
      const deletedProduct: Product = { id: '1', nombre: 'Deleted Product', precio: 50 };

      jest.spyOn(service, 'delete').mockReturnValue(deletedProduct);

      const result = controller.delete('1');

      expect(result).toEqual(deletedProduct);
    });

    it('muestra Null si el producto a eliminar no existe', () => {
      jest.spyOn(service, 'delete').mockReturnValue(null);

      const result = controller.delete('no-existe-id');

      expect(result).toBeNull();
    });

  });
});
