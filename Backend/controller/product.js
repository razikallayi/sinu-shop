const productModel = require("../model/product")

const createProduct = async (req, res) => {
    const fileName = req.file.filename
    var result = await new productModel({ ...req.body, image: fileName })
    if (result.save()) {
        res.send({ success: true, message: "Saved successfully", data: result })
    } else {
        res.send({ success: false, message: "Failed to save" })
    }
}

const getProduct = async (req, res) => {
    const result = await productModel.find(req.body)
    res.send(result)
}
const updateProduct = async (req, res) => {
    const id = req.params.id
    const fileName = req.file?.filename
    const result = await productModel.findByIdAndUpdate(id, { ...req.body, image: fileName ? fileName : req.body.image })
    if (result.save()) {
        res.send({ success: true, message: "Updated successfully", data: result })
    } else {
        res.send({ success: false, message: "Failed to update" })
    }
}

const listProduct = async (req, res) => {
    const result = await productModel.find()
    res.send(result)
}

const deleteProduct = async (req, res) => {
    const result = await productModel.findByIdAndDelete(req.body.id)
    res.send({ success: true, message: "Delete successfully", data: result })
}


const productController = {
    deleteProduct: deleteProduct,
    getProduct: getProduct,
    listProduct: listProduct,
    updateProduct: updateProduct,
    createProduct: createProduct
}

module.exports = productController