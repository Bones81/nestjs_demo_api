import { Controller, Post, Body, Get, Param, Put, Patch, Delete } from "@nestjs/common";

import { ProductsService } from "./products.service";

@Controller('products') //argument identifies path when controller activates
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string, 
    @Body('description') prodDesc: string, 
    @Body('price') prodPrice: number
  ) {
    const generatedId = await this.productsService.insertProduct(
      prodTitle, 
      prodDesc, 
      prodPrice
    )
    return { id: generatedId }
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts()
    return products
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId)
  }

  // @Patch(':id')
  // updateProduct(
  //   @Param('id') prodId: string, 
  //   @Body('title') prodTitle: string,
  //   @Body('description') prodDesc: string, 
  //   @Body('price') prodPrice: number
  // ) {
  //   return this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice)

  // }

  @Delete(':id')
  removeProduct(
    @Param('id') prodId: string
  ) {
    return this.productsService.deleteProduct(prodId)
  }
}