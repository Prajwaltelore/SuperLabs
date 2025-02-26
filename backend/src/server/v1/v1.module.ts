// src/v1/v1.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
// Import additional modules as needed (e.g., RiskModule)
// import { RiskModule } from './risk/risk.module';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import { Product, ProductSchema } from 'src/common/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema}
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt_secret'),
        signOptions: { expiresIn: configService.get('jwt_expiry') },
      }),
    }),
    ProductModule
  ],
  exports: [],
  providers: [ProductService],
})
export class V1Module {}
