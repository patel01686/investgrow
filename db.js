const mongoose = require('mongoose');

// ✅ Final MongoDB URI with real credentials
const mongoURI = 'mongodb+srv://niranjan:patel@cluster0.mrhd61k.mongodb.net/investgrow?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log("❌ MongoDB Connection Error:", err));
