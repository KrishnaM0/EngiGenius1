// if(process.env.NODE_ENV != "production") {
//     require("dotenv").config();
//   };
//   const mongoose = require("mongoose");
//   const initData = require("../init/data.js");
//   const Blogs = require("../models/blogs.js");
  
//   const dbUrl = process.env.ATLASDB_URL;
//   mongoose.connect(dbUrl);
  
//   const initDB = async () => {
//     await Blogs.deleteMany({});
//     initData.data = initData.data.map((obj) => ({ ...obj, owner: "6789542586ee720ff4be1f3e"}));
//     await Blogs.insertMany(initData.data);
//     console.log("data was initialized");
//   };
  
//   initDB();