import * as fs from 'fs'
import { Product } from "./Product.js";

class ProductManager extends Product {
  constructor(title, description, price, thumbnail, code, stock) {
    super(title, description, price, thumbnail, code, stock);
    this.id = "";
    this.products = [];
    this.path = "./src/products.txt"
  }

  static addId() {
    if (this.id) {
      this.id++;
    } else {
      this.id = 1;
    }
    return this.id;
  }

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    let cont = await fs.promises.readFile(this.path, 'utf-8')
    let aux = JSON.parse(cont)
    this.products = aux

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("All fields are required");
      return;
    }

    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].code === code) {
        console.log("Code must be unique");
        return;
      }
    }

    this.products.push({
      id: ProductManager.addId(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });

    await fs.promises.writeFile(this.path, JSON.stringify(this.products))
    }
  
  getProducts = async () => {
    let cont = await fs.promises.readFile(this.path, 'utf-8')
    let aux = await JSON.parse(cont)
    this.products = aux
    return this.products;
  }

  getProductById = async (id) => {
    let cont = await fs.promises.readFile(this.path, 'utf-8')
    let aux = await JSON.parse(cont)
    this.products = aux
    
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        return this.products[i];
      }
    }
    console.log("Not found");
  }


  updateProductById = async (id, title, description, price, thumbnail, code, stock) => {
    let updatedProd = {id, title, description, price, thumbnail, code, stock}
    let cont = await fs.promises.readFile(this.path, 'utf-8')
    let aux = await JSON.parse(cont)
    this.products = aux
    let updProdIndex = this.products.findIndex(product => product.id === id)
    this.products.splice(updProdIndex,1)
    this.products.push(updatedProd)

    let update = await fs.promises.writeFile(this.path, JSON.stringify(this.products))

      }

  deleteProductById = async (id) => {
    let cont = await fs.promises.readFile(this.path, 'utf-8')
    let aux = await JSON.parse(cont)
    this.products = aux
    let delProdIndex = this.products.findIndex(product => product.id === id)
    console.log(`Se eliminará el producto con ID: ${id}`),
    this.products.splice(delProdIndex,1)

    let update = await fs.promises.writeFile(this.path, JSON.stringify(this.products))

    }

}


// const load = async () => {
//   await productManager.addProduct("tanque 500 bic", "Tanque para agua de 500 L Bicapa", 15000, "tanque.jpg", "tanq500B", 11);
//   await productManager.addProduct("tanque 750 bic", "Tanque para agua de 750 L Bicapa", 18000, "tanque.jpg", "tanq750B", 12);
//   await productManager.addProduct("tanque 1000 bic", "Tanque para agua de 1000 L Bicapa", 24000, "tanque.jpg", "tanq1000B", 14);
//   await productManager.addProduct("tanque 500 tric", "Tanque para agua de 500 L Tricapa", 18000, "tanque.jpg", "tanq500T", 10);
//   await productManager.addProduct("tanque 750 tric", "Tanque para agua de 750 L Tricapa", 22000, "tanque.jpg", "tanq750T", 14);
//   await productManager.addProduct("tanque 1000 tric", "Tanque para agua de 1000 L Tricapa", 28000, "tanque.jpg", "tanq1000T", 8);
//   await productManager.addProduct("vanitory 50 std", "Vanitory de 50 cm standard", 19000, "vanit50std.jpg", "van50std", 14);
//   await productManager.addProduct("vanitory 60 std", "Vanitory de 60 cm standard", 24000, "vanit60std.jpg", "van60std", 10);
//   await productManager.addProduct("vanitory 50 maral", "Vanitory de 50 cm Maral", 24000, "vanit50mar.jpg", "van50mar", 10);
//   await productManager.addProduct("vanitory 60 maral", "Vanitory de 60 cm Maral", 28000, "vanit60mar.jpg", "van60mar", 12);
//   await productManager.addProduct("bomba de agua 1/2", "bomba de agua de 1/2 HP", 12000, "qb60.jpg", "bom12hp", 55);
//   await productManager.addProduct("bomba de agua 3/4", "bomba de agua de 3/4 HP", 22000, "qb80.jpg", "bom34hp", 35);  
// }

const productManager = new ProductManager();

// load()

export default productManager