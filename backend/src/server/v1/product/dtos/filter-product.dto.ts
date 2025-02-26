import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterProductDto {
    @ApiProperty({ example: 'iPhone', description: 'Search query for product title or description', required: false })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiProperty({ example: 'Electronics', description: 'Category filter', required: false })
    @IsOptional()
    @IsString()
    category?: string;

    @ApiProperty({ example: 'Apple', description: 'Brand filter', required: false })
    @IsOptional()
    @IsString()
    brand?: string;

    @ApiProperty({ example: 500, description: 'Minimum price filter', required: false })
    @IsOptional()
    @IsNumber()
    minPrice?: number;

    @ApiProperty({ example: 1500, description: 'Maximum price filter', required: false })
    @IsOptional()
    @IsNumber()
    maxPrice?: number;

    @ApiProperty({ example: 1, description: 'Page number for pagination', required: false })
    @IsOptional()
    @IsNumber()
    page?: number;

    @ApiProperty({ example: 10, description: 'Number of products per page', required: false })
    @IsOptional()
    @IsNumber()
    limit?: number;
}
