import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/common/schemas/product.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { FilterProductDto } from './dtos/filter-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

    async create(createProductDto: CreateProductDto): Promise<any> {
      const product = new this.productModel(createProductDto);
      const result = await product.save();
      if(result){
        return{
            status: true,
            message: 'Product saved successfully',
            data: result
        }
      }else{
        return{
            status: false,
            message: 'Product not saved',
            data: null
        }
      }
    }
  
    async findAll(filters: FilterProductDto) {
      const { search, category, brand, minPrice, maxPrice, page = 1, limit = 5 } = filters;
  
      const query: any = {};
  
      if (search) {
        query.$or = [
          { title: new RegExp(search, 'i') },
          { description: new RegExp(search, 'i') },
        ];
      }
      if (category) query.category = category;
      if (brand) query.brand = brand;
      if (minPrice) query.price = { $gte: minPrice };
      if (maxPrice) query.price = { ...query.price, $lte: maxPrice };

      console.log("Executing Query:", JSON.stringify(query, null, 2)); 
  
      const products = await this.productModel
        .find(query)
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit))
        .lean();
        
  
      const totalProducts = await this.productModel.countDocuments(query);

      console.log("Products Fetched:", products.length);
  
      if(products.length > 0){
        return{
            status: true,
            message: 'Product fetched successfully',
            data: {
                totalProducts,
                totalPages: Math.ceil(totalProducts / limit),
                currentPage: Number(page),
                products
            }
        }
      }else{
        return{
            status: false,
            message: 'Product not fetched',
            data: null
        }
      }
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<any> {
        const result = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true, runValidators: true });
        if(result){
            return{
                status: true,
                message: 'Product updated successfully',
                data: result
            }
          }else{
            return{
                status: false,
                message: 'Product not updated',
                data: null
            }
          }
    }

    async delete(id: string): Promise<any> {
        const result = await this.productModel.findByIdAndDelete(id);
        if(result){
            return{
                status: true,
                message: 'Product deleted successfully'
            }
          }else{
            return{
                status: false,
                message: 'Product not deleted',
                data: null
            }
          }
    }
}
