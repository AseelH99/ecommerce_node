import categoriesRouter from './categories/categories.router.js';
import productRouter from './products/products.router.js';
import authRouter from './auth/auth.router.js';
import subCategoryRouter from './subCategory/subcategory.router.js';
import couponRouter from './coupon/coupon.router.js';
import userRouter from './user/user.router.js';
import cartRouter from './cart/cart.router.js';
import orderRouter from './order/order.router.js'
import { sendEmail } from '../services/email.js';
import { globalErrorHandler } from '../services/errorHandling.js';

const initApp =(app,express)=>{
app.use(express.json())
app.use('/user',userRouter)
app.use('/cart',cartRouter)
app.use('/order',orderRouter)
app.use('/categories',categoriesRouter)
app.use('/coupon',couponRouter)
app.use('/products',productRouter)
app.use('/auth',authRouter)
app.use('/subCategory',subCategoryRouter)
app.get('/',(req,res)=>{
    return res.status(200).json("Welcome...... ")
 })
app.get("*",(req,res)=>{
    return res.status(500).json({"message":"page not found"});
})
app.use(globalErrorHandler);
}

export default initApp;