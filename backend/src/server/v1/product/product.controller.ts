import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { FilterProductDto } from './dtos/filter-product.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags, ApiQuery, ApiParam, ApiConsumes } from '@nestjs/swagger';
import { UpdateProductDto } from './dtos/update-product.dto';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('Products Controller')
@Controller('v1/products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProductDto })
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
        destination: './uploads', 
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now();
            cb(null, uniqueSuffix + file.originalname);
        },
    }),
}))
  async create(@Body() createProductDto: CreateProductDto,  @UploadedFile() file: any) {
    if (file) {
      createProductDto.image = `uploads/${file.filename}`; 
  }
    return await this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get products with filters' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search products by title or description' })
  @ApiQuery({ name: 'category', required: false,  type: String, description: 'Filter by category' })
  @ApiQuery({ name: 'brand', required: false,  type: String, description: 'Filter by brand' })
  @ApiQuery({ name: 'minPrice', required: false, type: Number, description: 'Minimum price filter' })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number, description: 'Maximum price filter' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of products per page' })
  async findAll(@Query() filters: FilterProductDto) {
    return await this.productService.findAll(filters);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiParam({ name: 'id', required: true, description: 'Product ID' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateProductDto })
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
        destination: './uploads', 
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now();
            cb(null, uniqueSuffix + file.originalname);
        },
    }),
}))
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @UploadedFile() file: any) {
    if (file) {
      updateProductDto.image = `uploads/${file.filename}`; 
  }
      return await this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiParam({ name: 'id', required: true, description: 'Product ID' })
  async delete(@Param('id') id: string) {
      return await this.productService.delete(id);
  }
}
