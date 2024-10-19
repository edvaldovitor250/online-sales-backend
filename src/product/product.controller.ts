/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { ReturnProduct } from './dtos/return-product.dto';
import { ProductService } from './product.service';

@Roles(UserType.ADMIN,UserType.USER)
@Controller('product')
export class ProductController {

    constructor(
        private readonly productService: ProductService,
    ) {
      
    }

    @Get()
    async findAllProduct():Promise<ReturnProduct[]> {
        return (await this.productService.findAllProduct()).map((product) => new ReturnProduct(product));

    }


}
