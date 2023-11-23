const User = require('../Model/UserModel');
const argon2 = require('argon2');
const { generalAcesstoken } = require('../middleware/JWT');
const JWT = require('../middleware/JWT')
const userRegister = async (req, res) => {
  try {
      const existingUser = await User.findOne({ userName: req.body.userName });
      if (existingUser) {
        return res.status(200).json({ msg: 'Tên người dùng đã tồn tại' });
      }
      const hashPass = await argon2.hash(req.body.passWord);
      const newUser = new User({
          userName: req.body.userName,
          phone_number: req.body.phone_number,
          passWord: hashPass,
          role_id: req.body.role_id || 2, 
          addRess: req.body.addRess,
      });

      await newUser.save();
      res.status(200).json({ msg: 'Thành công' });
  } catch (error) {
      console.error(error);
      res.status(400).json({ msg: 'Thất bại' });
  }
};


const userLogin = async (req, res) => {
    const password = req.body.passWord;
    const userName = req.body.userName;
    try {
        const userFound = await User.findOne({ userName: userName });
        if (userFound) {
            const validPassword = await argon2.verify(userFound.passWord, password);
            if (validPassword) {
                const access_Token = await generalAcesstoken({
                    id: userFound._id,
                    userName: userFound.userName,
                    phone_number: userFound.phone_number,
                    addRess: userFound.addRess,
                    role_id: userFound.role_id
                });
                res.cookie('access_token', access_Token, { httpOnly: true, secure:true, samesite: 'strict',expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });
                return res.status(200).json({
                   access_Token
                });
            } else {
                return res.status(401).json({ err: 'Username/Password not match!' });
            }
        } else {
            return res.status(401).json({ err: 'Username/Password not match!' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ err: 'Something went wrong' });
    }
};


const userUpdate = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        if (userId) {
            const updatedUser = await User.findByIdAndUpdate(userId, data);        
            if (!updatedUser) {
                return res.status(404).json({ msg: 'Người dùng không tồn tại' });
            }
            return res.status(200).json({ msg: 'Cập nhật thành công', updatedUser });
        } else {
            return res.status(401).json({ msg: 'Không tìm thấy ID' });
        }
    } catch (error) {
        console.error('Lỗi:', error);
        return res.status(500).json({ msg: 'Lỗi Server' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (userId) {
            const checkUser = await User.findOne({ _id: userId });
            if (checkUser) {
                const user = await User.findByIdAndDelete(userId);
                return res.status(200).json({ data: user });
            } else {
                return res.status(401).json({ err: 'Không tồn tại User' });
            }
        } else {
            return res.status(401).json({ msg: 'Không tìm thấy ID' });
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Lỗi Server' });
    }
};
const getDetailUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (userId) {
            const data = await User.findOne({ _id: userId });
            if (data) {
                return res.status(200).json({ data: data });
            } else {
                return res.status(500).json({ err: 'Không tồn tại User' });
            }
        } else {
            return res.status(400).json({ msg: 'Không tìm thấy ID' });
        }
    } catch (error) {
        console.error('Lỗi:', error);
        return res.status(500).json({ msg: 'Lỗi Server' });
    }
};

const userLogout = (req, res) => {
    res.clearCookie('refresh_token', { httpOnly: true }); 
    return res.status(200).json({ msg: 'Good bye!' });
  };  
const changePassword = async (req, res) => {
    try {
      const userId = req.params.id;
      const { currentPassword, newPassword } = req.body;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ msg: 'Không tìm thấy ID' });
      }
      const isPasswordValid = await argon2.verify(user.passWord, currentPassword);
      if (!isPasswordValid) {
        return res.status(401).json({ msg: 'Mật khẩu cũ không đúng' });
      }
      const hashPass = await argon2.hash(newPassword);
      await User.findByIdAndUpdate(userId, { passWord: hashPass }, { new: true });
      return res.status(200).json({ msg: 'Cập nhật mật khẩu thành công' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  const depositBalance = async (req, res) => {
    try {
      const userId = req.params.userId;
      let { amount } = req.body;
  
      if (!userId) {
        return res.status(400).json({ msg: 'Không tìm thấy ID người dùng' });
      }
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ msg: 'Người dùng không tồn tại' });
      }
      amount = parseFloat(amount);
  
      if (isNaN(amount)) {
        return res.status(400).json({ msg: 'Số tiền không hợp lệ' });
      }
  
      user.balance += amount;
      await user.save();
      return res.status(200).json({ msg: 'Nạp tiền thành công', newBalance: user.balance });
    } catch (error) {
      console.error('Lỗi:', error);
      return res.status(500).json({ msg: 'Lỗi Server' });
    }
  };
  
  const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json({ data: users });
    } catch (error) {
      console.error('Lỗi:', error);
      return res.status(500).json({ msg: 'Lỗi Server' });
    }
  };
  

module.exports = { userRegister, userLogin, userLogout , userUpdate, deleteUser,getDetailUser,changePassword,depositBalance,getAllUsers};