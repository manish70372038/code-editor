const mongoose = require("mongoose");
require("dotenv").config();
const MONGOURI = process.env.MONGO_URL || "mongodb://localhost:27017/RTCCE"

function databaseConnect() {
  mongoose
    .connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      console.log("✅ MongoDB Connected");
      
      try {
        await mongoose.connection.collection('users').dropIndex('id_1');
        console.log("✅ id_1 index dropped");
      } catch (e) {
        console.log("ℹ️ id_1 not found, skipping...");
      }

      try {
        await mongoose.connection.collection('users').dropIndex('username_1');
        console.log("✅ username_1 index dropped");
      } catch (e) {
        console.log("ℹ️ username_1 not found, skipping...");
      }
    })
    .catch((err) => console.error("❌ Connection Error:", err));
}

module.exports = databaseConnect;