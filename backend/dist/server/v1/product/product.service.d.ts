import { Model } from 'mongoose';
import { ProductDocument } from 'src/common/schemas/product.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { FilterProductDto } from './dtos/filter-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
export declare class ProductService {
    private productModel;
    constructor(productModel: Model<ProductDocument>);
    create(createProductDto: CreateProductDto): Promise<any>;
    findAll(filters: FilterProductDto): Promise<{
        status: boolean;
        message: string;
        data: {
            totalProducts: number;
            totalPages: number;
            currentPage: number;
            products: (import("mongoose").FlattenMaps<ProductDocument> & Required<{
                _id: import("mongoose").FlattenMaps<unknown>;
            }> & {
                __v: number;
            })[];
        };
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<any>;
    delete(id: string): Promise<any>;
}
