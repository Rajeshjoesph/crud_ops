const express = require("express");
const {
  CreateUser,
  getAllData,
  getDataById,
  updateDataById,
  deleteDataById,
} = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.route("/user").post(CreateUser).get(getAllData);

userRouter
  .route("/user/:id")
  .put(updateDataById)
  .get(getDataById)
  .delete(deleteDataById);

module.exports = userRouter;
