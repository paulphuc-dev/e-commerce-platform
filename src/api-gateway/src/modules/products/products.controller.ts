import { Controller, 
  Get, 
  Post, 
  Put, 
  Delete,
  Param, 
  Query, 
  Body, 
  ParseIntPipe, 
  UseInterceptors,
  UploadedFile 
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService
  ) {}

  @Get()
  getProducts(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('id') id?: string, 
    @Query('name') name?: string 
  ) {
    return this.productsService.getProducts(page, id, name);
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @UseInterceptors(FileInterceptor('avatar'))
  @Post()
  async createProduct(@Body() data: any,  @UploadedFile() file: Express.Multer.File,) {
    const result = await lastValueFrom(
      this.productsService.createProduct({
        ...data,
        avatar: file.buffer, 
        filename: file.originalname
      }),
    );
    return result;
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() data: any) {
    return this.productsService.updateProduct(id, data);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id)
  }
}
