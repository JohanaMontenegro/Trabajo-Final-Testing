import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
describe('ProductController (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });
  let productId: string;
  it('/products (GET) - debe devolver una serie de productos', () => {
    return request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect(({ body }) => {
        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBeGreaterThan(0);
      });
  });
  it('/products/:id (GET) - debe devolver un producto específico', () => {
    return request(app.getHttpServer())
      .get(`/products/${productId}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toBeDefined();
        expect(body.id).toBe(productId);
      });
  });
  it('/products (POST) - debe crear un nuevo producto', () => {
    const newProduct = { nombre: 'New Product', precio: 10 };
    return request(app.getHttpServer())
      .post('/products')
      .send(newProduct)
      .expect(201)
      .expect(({ body }) => {
        expect(body).toBeDefined();
        expect(body.id).toBeDefined();
        expect(body.nombre).toBe(newProduct.nombre);
        expect(body.precio).toBe(newProduct.precio);
        productId = body.id; // Guarda el ID para su uso en otras pruebas
      });
  });
  it('/products/:id (PUT) - debe actualizar un producto existente', () => {
    const updatedProduct = { nombre: 'Updated Product', precio: 20 };
    return request(app.getHttpServer())
      .put(`/products/${productId}`)
      .send(updatedProduct)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toBeDefined();
        expect(body.id).toBe(productId);
        expect(body.nombre).toBe(updatedProduct.nombre);
        expect(body.precio).toBe(updatedProduct.precio);
      });
  });
  it('/products/:id (DELETE) - debe eliminar un producto existente', () => {
    return request(app.getHttpServer())
      .delete(`/products/${productId}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toBeDefined();
        expect(body.id).toBe(productId);
      });
  });
});







