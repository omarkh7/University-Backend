const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  deleteUser,
  logoutUser,
  getMe,
  getAll,
} = require("../Controllers/userController");


router.post('/register', registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/delete/:id').delete(deleteUser)
router.get('/getall', getAll);
router.get('/getme/:id', getMe);

module.exports = router;
