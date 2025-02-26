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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterProductDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class FilterProductDto {
}
exports.FilterProductDto = FilterProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'iPhone', description: 'Search query for product title or description', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterProductDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Electronics', description: 'Category filter', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterProductDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Apple', description: 'Brand filter', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilterProductDto.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500, description: 'Minimum price filter', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FilterProductDto.prototype, "minPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1500, description: 'Maximum price filter', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FilterProductDto.prototype, "maxPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Page number for pagination', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FilterProductDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: 'Number of products per page', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FilterProductDto.prototype, "limit", void 0);
//# sourceMappingURL=filter-product.dto.js.map