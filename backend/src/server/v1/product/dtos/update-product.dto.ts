import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
    @ApiProperty({ example: 'iPhone 14', description: 'Updated product title', required: false })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({ example: 'Latest Apple iPhone model', description: 'Updated description', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: 1199.99, description: 'Updated product price', required: false })
    @IsOptional()
    @IsNumber()
    price?: number;

    @ApiProperty({ example: 'Electronics', description: 'Updated product category', required: false })
    @IsOptional()
    @IsString()
    category?: string;

    @ApiProperty({ example: 'Apple', description: 'Updated product brand', required: false })
    @IsOptional()
    @IsString()
    brand?: string;

    @ApiProperty({ example: 'https://example.com/new-image.jpg',type: 'string', format: 'binary', description: 'Updated product image URL', required: false })
    @IsOptional()
    @IsString()
    image?: string;
}
