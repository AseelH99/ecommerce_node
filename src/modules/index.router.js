import categoriesRouter from './categories/categories.router.js';
import productRouter from './products/products.router.js';

const initApp = (app,express)=>{
app.use(express.json())
app.use('/categories',categoriesRouter)
app.use('/products',productRouter)
app.get('/',(req,res)=>{
    return res.status(200).json("Welcome...... ")
 })
app.get("*",(req,res)=>{
    return res.status(500).json({"message":"page not found"});
})
}

export default initApp;