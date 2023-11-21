const Order = require('../Model/OrderModel');
const User = require('../Model/UserModel')


const addOrder = async (req, res) => {
  try {
    const { userName, address, totalPay, userPhone, items } = req.body;
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    if (user.balance < totalPay) {
      return res.status(400).json({ success: false, error: 'Số dưng không đủ' });
    }
    const newOrder = new Order({
      items,
      user: user._id,
      userName,
      address,
      totalPay,
      userPhone,
    });
    const savedOrder = await newOrder.save();
    user.balance -= totalPay;
    await user.save();
    res.status(201).json({ success: true, data: savedOrder });
  } catch (error) {
    console.error('Error when adding order:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    
    if (!deletedOrder) {
      return res.status(404).json({ success: false, error: 'Đơn đặt hàng không tồn tại' });
    }

    res.status(200).json({ success: true, data: deletedOrder });
  } catch (error) {
    console.error('Lỗi khi xóa đơn đặt hàng:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const userOrders = await Order.find({ user: userId }).populate('items.product');
    res.status(200).json({ success: true, data: userOrders });
  } catch (error) {
    console.error('Lỗi khi lấy đơn đặt hàng của người dùng:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find().populate('items.product');
    res.status(200).json({ success: true, data: allOrders });
  } catch (error) {
    console.error('Lỗi khi lấy tất cả đơn đặt hàng:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const orderDetails = await Order.findById(orderId).populate('items.product');
    
    if (!orderDetails) {
      return res.status(404).json({ success: false, error: 'Đơn đặt hàng không tồn tại' });
    }

    res.status(200).json({ success: true, data: orderDetails });
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết đơn đặt hàng:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};





module.exports = { addOrder,deleteOrder,getUserOrders,getAllOrders,getOrderDetails};
