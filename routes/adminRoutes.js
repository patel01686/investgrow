const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const isAdmin = require('../middleware/isAdmin');

router.get('/login', AdminController.getLogin);
router.post('/login', AdminController.postLogin);

router.get('/dashboard', isAdmin, AdminController.getDashboard);
router.get('/users', isAdmin, AdminController.getUsers);
router.get('/products', isAdmin, AdminController.getProducts);

router.get('/logout', isAdmin, (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

module.exports = router;
