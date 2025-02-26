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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dtos/create-product.dto");
const filter_product_dto_1 = require("./dtos/filter-product.dto");
const swagger_1 = require("@nestjs/swagger");
const update_product_dto_1 = require("./dtos/update-product.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async create(createProductDto, file) {
        if (file) {
            createProductDto.image = `uploads/${file.filename}`;
        }
        return await this.productService.create(createProductDto);
    }
    async findAll(filters) {
        return await this.productService.findAll(filters);
    }
    async update(id, updateProductDto, file) {
        if (file) {
            updateProductDto.image = `uploads/${file.filename}`;
        }
        return await this.productService.update(id, updateProductDto);
    }
    async delete(id) {
        return await this.productService.delete(id);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new product' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Product created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation failed' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: create_product_dto_1.CreateProductDto }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now();
                cb(null, uniqueSuffix + file.originalname);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get products with filters' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Products retrieved successfully' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String, description: 'Search products by title or description' }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, type: String, description: 'Filter by category' }),
    (0, swagger_1.ApiQuery)({ name: 'brand', required: false, type: String, description: 'Filter by brand' }),
    (0, swagger_1.ApiQuery)({ name: 'minPrice', required: false, type: Number, description: 'Minimum price filter' }),
    (0, swagger_1.ApiQuery)({ name: 'maxPrice', required: false, type: Number, description: 'Maximum price filter' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number for pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Number of products per page' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_product_dto_1.FilterProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a product' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'Product ID' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: update_product_dto_1.UpdateProductDto }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now();
                cb(null, uniqueSuffix + file.originalname);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a product' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'Product ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
exports.ProductController = ProductController = __decorate([
    (0, swagger_1.ApiTags)('Products Controller'),
    (0, common_1.Controller)('v1/products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map