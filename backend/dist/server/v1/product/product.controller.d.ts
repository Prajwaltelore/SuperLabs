import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { FilterProductDto } from './dtos/filter-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto, file: any): Promise<any>;
    findAll(filters: FilterProductDto): Promise<{
        status: boolean;
        message: string;
        data: {
            totalProducts: number;
            totalPages: number;
            currentPage: number;
            products: (import("mongoose").FlattenMaps<import("../../../common/schemas/product.schema").ProductDocument> & Required<{
                _id: import("mongoose").FlattenMaps<unknown>;
            }> & {
                __v: number;
            })[];
        };
    }>;
    update(id: string, updateProductDto: UpdateProductDto, file: any): Promise<any>;
    delete(id: string): Promise<any>;
}
