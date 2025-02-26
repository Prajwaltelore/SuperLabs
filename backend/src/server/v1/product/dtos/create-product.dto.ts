import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ example: 'iPhone 13', description: 'Product title' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ example: 'Latest Apple iPhone', description: 'Product description' })
    @IsNotEmpty()
    @IsString()
    description?: string;

    @ApiProperty({ example: 999.99, description: 'Product price' })
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({ example: 'Electronics', description: 'Product category' })
    @IsNotEmpty()
    @IsString()
    category: string;

    @ApiProperty({ example: 'Apple', description: 'Product brand' })
    @IsNotEmpty()
    @IsString()
    brand: string;

    @ApiProperty({ example: 'https://example.com/image.jpg',type: 'string', format: 'binary', description: 'Product image URL', required: false })
    @IsOptional()
    @IsString()
    image?: string;
}
