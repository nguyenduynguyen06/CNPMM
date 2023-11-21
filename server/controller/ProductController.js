const Product = require('../Model/ProductModel');
const Category = require('../Model/CategoryModel');
const addProduct = async (req, res) => {
  try {
    const { name, description, categoryName, platform, price, pictures } = req.body;

    const existingCategory = await Category.findOne({name: categoryName});
    if (!existingCategory) {
      return res.status(404).json({ success: false, error: 'Category không tồn tại' });
    }
    const newGame = new Product({
      name,
      description,
      category: existingCategory._id,
      platform,
      price,
      pictures,
    });
    const savedGame = await newGame.save();
    res.status(201).json({ success: true, data: savedGame });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};




const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await Product.find({ category: categoryId }).lean().populate('category');
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ success: false, error: 'Lỗi Server' });
  }
};
const getProductsAll = async (req, res) => {
  try {
    const products = await Product.find().lean().populate('category');
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ success: false, error: 'Lỗi Server' });
  }
};


const editProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    const updateData = {};
    
    if (data.name) {
      updateData.name = data.name;
    }
    if (data.description) {
      updateData.description = data.description;
    }
    if (data.platform) {
      updateData.platform = data.platform;
    }
    if (data.price) {
      updateData.price = data.price;
    }
    if (data.pictures) {
      updateData.pictures = data.pictures;
    }
    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true })
      .populate('category')
      .lean();
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ success: false, error: 'Lỗi Server' });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (productId) {
      const product = await Product.findOne({ _id: productId });
      if (!product) {
        return res.status(401).json({ err: 'Sản phẩm không tồn tại' });
      }
      await Product.findByIdAndDelete(productId);
      res.status(200).json({ success: true, message: 'Sản phẩm và các biến thể đã được xóa thành công' });
    } else {
      return res.status(401).json({ msg: 'Không tìm thấy ID' });
    }
  } catch (error) {
    return res.status(500).json({ msg: 'Lỗi Server' });
  }
};
const searchProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const regex = new RegExp(keyword, 'i');
    const products = await Product.find({
      name: { $regex: regex }
    }).populate('category').lean();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ success: false, error: 'Lỗi Server' });
  }
};
const detailsProduct = async (req, res) => {
  try {
    const { name } = req.params;
    const products = await Product.findOne({ name })
      .populate('category').lean();
    if (!products) {
      return res.status(404).json({ success: false, error: 'Sản phẩm không tồn tại' });
    }
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ success: false, error: 'Lỗi Server' });
  }
};



module.exports = { addProduct, getProductsByCategory, editProduct, deleteProduct, searchProducts, detailsProduct,getProductsAll };
