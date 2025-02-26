"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("../../../common/schemas/product.schema");
let ProductService = class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async create(createProductDto) {
        const product = new this.productModel(createProductDto);
        const result = await product.save();
        if (result) {
            return {
                status: true,
                message: 'Product saved successfully',
                data: result
            };
        }
        else {
            return {
                status: false,
                message: 'Product not saved',
                data: null
            };
        }
    }
    async findAll(filters) {
        const { search, category, brand, minPrice, maxPrice, page = 1, limit = 5 } = filters;
        const query = {};
        if (search) {
            query.$or = [
                { title: new RegExp(search, 'i') },
                { description: new RegExp(search, 'i') },
            ];
        }
        if (category)
            query.category = category;
        if (brand)
            query.brand = brand;
        if (minPrice)
            query.price = { $gte: minPrice };
        if (maxPrice)
            query.price = { ...query.price, $lte: maxPrice };
        console.log("Executing Query:", JSON.stringify(query, null, 2));
        const products = await this.productModel
            .find(query)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));
        const totalProducts = await this.productModel.countDocuments(query);
        console.log("Products Fetched:", products.length);
        if (products.length > 0) {
            return {
                status: true,
                message: 'Product fetched successfully',
                data: {
                    totalProducts,
                    totalPages: Math.ceil(totalProducts / limit),
                    currentPage: Number(page),
                    products
                }
            };
        }
        else {
            return {
                status: false,
                message: 'Product not fetched',
                data: null
            };
        }
    }
    async update(id, updateProductDto) {
        const result = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true, runValidators: true });
        if (result) {
            return {
                status: true,
                message: 'Product updated successfully',
                data: result
            };
        }
        else {
            return {
                status: false,
                message: 'Product not updated',
                data: null
            };
        }
    }
    async delete(id) {
        const result = await this.productModel.findByIdAndDelete(id);
        if (result) {
            return {
                status: true,
                message: 'Product deleted successfully'
            };
        }
        else {
            return {
                status: false,
                message: 'Product not deleted',
                data: null
            };
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductService);
//# sourceMappingURL=product.service.js.map