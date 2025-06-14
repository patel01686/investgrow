const User = require('../module/user');
// const Product = require('../module/product'); // agar product model hai to use karo

exports.getLogin = (req, res) => {
  res.render('admin/login', { error: null });
};

exports.postLogin = (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'StrongPass@123') {
    req.session.isAdmin = true;
    res.redirect('/admin/dashboard');
  } else {
    res.render('admin/login', { error: 'Invalid Credentials' });
  }
};

exports.getDashboard = async (req, res) => {
  const userCount = await User.countDocuments();
  // const productCount = await Product.countDocuments();
  res.render('admin/dashboard', { userCount });
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.render('admin/users', { users });
};

exports.getProducts = async (req, res) => {
  res.render('admin/products', { products: [] }); // add logic if product model hai
};
