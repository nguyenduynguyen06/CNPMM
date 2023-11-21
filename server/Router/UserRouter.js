require('dotenv').config();
const express = require('express');
const router = express.Router();

const userAuthenticate = require('../controller/UserController');
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');


router.post('/Register', userAuthenticate.userRegister);
router.post('/Login', userAuthenticate.userLogin);
router.post('/Logout', userAuthenticate.userLogout);
router.post('/update/:id', authUserMiddleware, userAuthenticate.userUpdate);
router.delete('/delete/:id', authMiddleware, userAuthenticate.deleteUser);
router.get('/get-Detail/:id',authUserMiddleware,userAuthenticate.getDetailUser)
router.put('/changepassword/:id',authUserMiddleware,userAuthenticate.changePassword)
router.post('/:userId/deposit', authUserMiddleware,userAuthenticate.depositBalance);
router.get('/getAll',authMiddleware, userAuthenticate.getAllUsers);
module.exports = router