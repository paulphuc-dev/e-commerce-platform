import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Product } from '../entities/product.entity';
import { ProductRequestDto } from '../dto/request/create-product.request.dto';
import { UpdateProductRequestDto } from '../dto/request/update-product.request.dto';
import { ProductDataResponseDto } from '../dto/response/product-data.response.dto';
import { PaginationResponseDto } from '../dto/response/pagination.response.dto';
import { Message } from '../enums/notification';
import { CloudinaryService } from './cloudinary.service';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    private readonly cloudinaryService: CloudinaryService 
  ) {}
  async createProduct(dto: ProductRequestDto): Promise<ProductDataResponseDto> {
    let avatarUrl: string | null = null;
    if (dto.image && dto.filename && dto.mimetype) {
      const uploadResult = await this.cloudinaryService.uploadBuffer(
        dto.image,
        dto.filename,
        dto.mimetype,
      );
      avatarUrl = uploadResult.secure_url;
    }
    const product = await this.productRepo.save({
      name: dto.name,
      description: dto.description,
      stock: dto.stock,
      price: dto.price,
      isActive: true,
      username: dto.username,
      modifiedAt: new Date(),
      avatarUrl,
    })
    
    const res = plainToInstance(ProductDataResponseDto, product, {excludeExtraneousValues: true});
    return res;
  }

  async getProducts(
    page: number,
    id?: string,
    name?: string,
  ): Promise<PaginationResponseDto> {
    const query = this.productRepo.createQueryBuilder('product');

    if (id) {
      query.andWhere('product.id = :id', { id });
    }

    if (name) {
      query.andWhere('product.name LIKE :name', { name: `%${name}%` }); // search gần đúng thay vì exact match
    }

    const limit = 10;
    query.skip((page - 1) * limit).take(limit);

    const [data, total] = await query
      .orderBy('product.modifiedAt', 'DESC')
      .getManyAndCount();
      
    const products = plainToInstance(ProductDataResponseDto, data, { excludeExtraneousValues: true });
    const pagination = {
      total,
      page,
      totalPages: Math.ceil(total / limit),
      products   
    };
    const res = plainToInstance(PaginationResponseDto, pagination, { excludeExtraneousValues: true });
    return res;
  }


  async getProductById(id: string): Promise<ProductDataResponseDto>{
    const data = await this.productRepo.findOne({
      where: { id }
    });
    const res = plainToInstance(ProductDataResponseDto, data, {excludeExtraneousValues: true});
    return res;
  }


  async updateProduct(id: string, update: UpdateProductRequestDto): Promise<ProductDataResponseDto>{
    const existing = await this.productRepo.findOne({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(Message.NOT_FOUND);
    }else{
      existing.name = update.name;
      existing.description = update.description;
      existing.stock = update.stock;
      existing.price = update.price;
      existing.isActive = update.isActive;
      existing.username = update.username;
      existing.modifiedAt = new Date()
      const data = await this.productRepo.save(existing);
      const res = plainToInstance(ProductDataResponseDto, data, {excludeExtraneousValues: true});
      return res;
    }
  }

  async deleteProduct(id: string): Promise<ProductDataResponseDto>{
    const existing = await this.productRepo.findOne({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(Message.NOT_FOUND);
    }
    const deletedData = await this.productRepo.remove(existing);
    const res = plainToInstance(ProductDataResponseDto, deletedData, {excludeExtraneousValues: true});
    return res;
  }

}
