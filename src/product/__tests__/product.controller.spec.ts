/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { productMock } from '../__mocks__/product.mock';
import { createProductMock } from '../__mocks__/create-product.mock';
import { ReturnDeleteMock } from '../__mocks__/return-delete.mock';
import { updateProductMock } from '../__mocks__/update-product.mock';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([productMock]),
            createProduct: jest.fn().mockResolvedValue(productMock),
            updateProduct: jest.fn().mockResolvedValue(productMock),
            deleteProduct: jest.fn().mockResolvedValue(ReturnDeleteMock),
          },
        },
      ],
      controllers: [ProductController],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should return returnProduct in findAll', async () => {
    const products = await controller.findAllProduct();

    expect(products).toStrictEqual([
      {
        id: productMock.id,
        name: productMock.name,
        price: productMock.price,
        image: productMock.image,
      },
    ]);
  });

  it('should return productEntity in createProduct', async () => {
    const product = await controller.createProduct(createProductMock);

    expect(product).toStrictEqual(productMock);
  });

  it('should return returnDelete in deleteProduct', async () => {
    const product = await controller.deleteProduct(productMock.id);

    expect(product).toStrictEqual(ReturnDeleteMock);
  });

  it('should return ProductEntity in updateProduct', async () => {
    const product = await controller.updateProduct(
      updateProductMock,
      productMock.id,
    );

    expect(product).toStrictEqual(productMock);
  });
});
