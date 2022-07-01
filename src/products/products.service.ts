import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Product } from './product.model'
import { Model } from 'mongoose'

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({
      title: title, 
      description: desc, 
      price: price
    });
    const result = await newProduct.save()
    console.log(result)
    return result.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec(); //.exec yields a "real" promise?
    return products.map(prod => ({
      id: prod.id, 
      title: prod.title, 
      description: prod.description, 
      price: prod.price
    })) 
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId)
    return product
  }

  // updateProduct(
  //   productId: string, 
  //   title: string, 
  //   desc: string, 
  //   price: number
  // ) {
  //   const [product, index] = this.findProduct(productId)
  //   const updatedProduct = {...product}
  //   if (title) {
  //     updatedProduct.title = title
  //   }
  //   if (desc) {
  //     updatedProduct.description = desc
  //   }
  //   if (price) {
  //     updatedProduct.price = price
  //   }
  //   this.products[index] = updatedProduct
  //   return updatedProduct
  // }

  deleteProduct(
    prodId: string
  ) {
    const index = this.findProduct(prodId)[1]
    return this.products.splice(index, 1)
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id)
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return {
      id: product.id, 
      title: product.title, 
      description: product.description, 
      price: product.price
    }
  }
}