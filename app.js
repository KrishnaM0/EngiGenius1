if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
};
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const Blogs = require("./models/blogs.js");
const nodemailer = require("nodemailer");

mongoose.connect('mongodb://127.0.0.1:27017/EngiGenius');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", ejsMate);

app.get("/new", (req, res)=>{
    res.render("pages/new.ejs");
});

// let contentPost = async ()=>{
//     const fs = require("fs");
//     const htmlContent = fs.readFileSync('content.html', 'utf-8');
//     await Blogs.updateOne(
//       { title: "Understanding Cryptocurrency: Bitcoin"},
//       { $set: { content: htmlContent } }
//     );
//     console.log("updated..!");
// };
// contentPost();

app.get("/show/:id", async (req, res)=>{
    let {id} = req.params;
    let blog = await Blogs.findById(id);
    let blogs = await Blogs.find();
    res.render("pages/show.ejs", {blog, blogs});
});

// app.delete("/show/:id", async (req, res)=>{
//     let {id} = req.params;
//     await Blogs.findByIdAndDelete(id);
//     res.redirect("/");
// });

app.get("/blogs", async (req, res)=>{
    let blogs = await Blogs.find();
    res.render("pages/blogs.ejs", {blogs});
});

app.get("/contact", (req, res)=>{
    res.render("pages/contact.ejs");
});

app.get("/about", (req, res)=>{
    res.render("pages/about.ejs");
});

app.post("/", async (req, res) =>{
    let newBlog = new Blogs(req.body.blog);
    await newBlog.save();
    res.redirect("/");
});

app.get("/", async (req, res)=>{
    let blogs = await Blogs.find();
    res.render("pages/index.ejs", {blogs});
});

app.post("/contact", async (req, res)=>{
    const { cname, cemail, cmsg } = req.body;
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "krishnamuskawad31@gmail.com",
                pass: process.env.ECONNECT,
            },
        });

        const mailOptions = {
            from: `"${cname}" <${cemail}>`, // Sender's name and email
            to: "krishnamuskawad31@gmail.com",
            subject: "New Contact Form Submission",
            text: `You have received a new message:
            Name: ${cname}
            Email: ${cemail}
            Message: ${cmsg}`,
        };

        await transporter.sendMail(mailOptions);

        res.send("Thank you for contacting us. Your message has been sent!");
    } catch (error) {
        console.error("Error sending email: ", error);
        res.status(500).send("There was an error sending your message. Please try again later.");
    }
});

app.listen(8080, ()=>{
    console.log("app is listening..!");
});