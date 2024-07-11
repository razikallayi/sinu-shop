const express = require('express')
const cors = require('cors')
const adminController = require('./controller/admin');
const userController = require('./controller/user');
const productController = require('./controller/product');
const { upload } = require('./utils/file');
const { validateToken, validateAdminToken } = require('./utils/auth');

const app = express()
const port = 5000

app.use(cors());
app.use(express.static('upload'))
// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (from forms)
app.use(express.urlencoded({ extended: true }));

app.post('/signup', userController.signup)
app.post('/login', userController.login)

app.post('/product', [validateAdminToken, upload.single('image')], productController.createProduct)
app.get('/product', productController.listProduct)
app.post('/search-product', productController.getProduct)
app.delete('/product', validateAdminToken, productController.deleteProduct)
app.patch('/product/:id', [validateAdminToken, upload.single('image')], productController.updateProduct)

app.get('/admins', adminController.listAdmins)
app.post('/admin/create', adminController.signup)
app.post('/admin/login', adminController.login)
app.post('/get-admin', adminController.getAdmin)
app.delete('/admin', validateAdminToken, adminController.deleteAdmin)
app.patch('/admin/:id', validateAdminToken, adminController.updateAdmin)

app.get('/users', validateAdminToken, userController.listUsers)
app.post('/get-user',validateAdminToken, userController.getUser)
app.delete('/user', validateAdminToken, userController.deleteUser)


app.listen(port, () => {
    console.log(`ShopNest app is listening on port ${port}`)
})

