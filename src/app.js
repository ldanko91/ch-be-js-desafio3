import express from 'express'
import productManager  from './ProductManager1.js'
const app = express()
const PORT = 4000

app.use(express.urlencoded({extended:true}))

app.get('/products?', async (req,res) => {
    let products = await productManager.getProducts()
    let limit = parseInt(req.query.limit)
    if (limit){
      let prodsLtd = products.slice(0, limit)
      res.send(prodsLtd)
    }else{
      res.send(products)
  }
})

app.get('/products/:pid', async (req,res) => {
  const pId = req.params.pid
  let products = await productManager.getProducts()
  const product = products.find(product => product.id === parseInt(pId))
    if(product) {
        res.send(product)
    } else {
        res.send(`El producto no existe`)
    }
})

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})
