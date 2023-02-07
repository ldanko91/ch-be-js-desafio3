import * as fs from 'fs'
import { Product } from "./Product.js";

class ProductManager extends Product {
  constructor(title, description, price, thumbnail, code, stock) {
    super(title, description, price, thumbnail, code, stock);
    this.id = "";
    this.products = [];
    this.path = "./products.txt"
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

    // console.log(this.products)
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

const productManager = new ProductManager();

export default productManager

// const test = async () => {
//   await productManager.addProduct("tanque", "tanque para agua de 500 L", 15000, "tanque.jpg", "tanq500l", 11);
//   await productManager.addProduct("vanitory", "vanitory de 50 cm", 22000, "vanit50.jpg", "van50std", 14);
//   await productManager.addProduct("bomba de agua", "bomba de agua de 1/2 HP", 12000, "qb60.jpg", "van50std", 55);  
// }

// const productManager = new ProductManager();

// Prueba 1: Cargar los productos al txt con test(). Luego comentar la función.
// test()

//Prueba 2: Consulta general e individualidad con getProducts y getProductById.
// console.table(await productManager.getProducts())
// console.log(await productManager.getProductById(2))

//Prueba 3: Editar un producto.
// productManager.updateProductById(1, "tanque", "tanque para agua de 600 L", 18000, "tanque.jpg", "tanq600l", 18)

//Prueba 4: Eliminar un producto.
// productManager.deleteProductById(2)
