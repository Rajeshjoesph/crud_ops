const express = require("express");
const cors = require("cors");
const connection = require("./config/connection");
const router = require("./Makeup/product.router");
const registerRouter = require("./routers/register.router");
const userRouter = require("./routers/user.router");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["OPTIONS", "POST", "GET", "PUT", "DELETE"],
  })
);
let port = 4000;

connection();

app.use(router);
app.use(userRouter);
app.use(registerRouter);

app.use("/image", express.static("src/public/images"));
app.use("/", (req, res) => res.send("I am live"));

app.listen(port, () => {
  console.log("server is running on: ", port);
});

// // app.use("/next",(req,res) => res.send("Hello world"));

// let data={
//     username:"Architha",
//     age:25,
//     Dob:"14/3/99",
// };

// app.get("/getuserdata",(req,res)=>{
//     res.json({
//         data:data
//     })
// })

// app.post("/postuserdata",(req,res)=>{
//     let {username,age,mobile}=req.body;
//     let data={
//         Name:username,
//         Age:age,
//         PhoneNumber:mobile
//     }

//         console.log(`user data's ${data}`);
//         res.json({
//             data:data
//         })

// })
