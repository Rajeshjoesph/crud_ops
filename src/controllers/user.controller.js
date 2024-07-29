const MakeupProducts = require("../Makeup/product.model");
const { model } = require("mongoose");
const user = require("../models/user.model");

const CreateUser = async (req, res) => {
  try {
    const createProductList = await user.create(req.body);
    res.json({
      data: createProductList,
      message: "User created successfully",
    });
  } catch (error) {
    res.json({
      Error: error,
    });
  }
};

const getDataById = async (req, res) => {
  try {
    let { id } = req.params;
    // console.log(id)
    let findproduct = await user.findById(id);
    if (!findproduct || findproduct.length === 0) {
      return res.status(404).json({
        message: "Data not found",
      });
    }
    res.json({
      data: findproduct,
    });
  } catch (error) {
    res.json({
      Error: error,
    });
  }
};

const getAllData = async (req, res) => {
  try {
    let findproduct = await user.find();
    if (!findproduct || findproduct.length === 0) {
      return res.status(404).json({
        message: "Data not found",
      });
    }
    res.status(200).json({
      data: findproduct,
    });
  } catch (error) {
    res.json({
      Error: error,
    });
  }
};

const getuserdatabasedonobjectid = async (req, res) => {
  //http://localhost:4000/getuserdatabasedonobjectid?objectId=668ec0e8aae60754fc55d57d
  try {
    let { objectId } = req.query;
    let getuserdata = await MakeupProducts.findById(objectId);
    if (!getuserdata) {
      return res.json.status(404)({
        message: "Data not found",
      });
    }
    res.json({
      data: getuserdata,
    });
  } catch (error) {
    res.json({
      Error: Error,
    });
  }
};

const updateDataById = async (req, res) => {
  try {
    let { id } = req.params;
    const updateProductList = await user.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateProductList) {
      res.json({
        message: "data not found",
      });
    }
    res.json({
      data: updateProductList,
      message: "User updated successfully",
    });
  } catch (error) {
    res.json({
      Error: error,
    });
  }
};

const deleteDataById = async (req, res) => {
  try {
    let { id } = req.params;
    const deleteProductList = await user.findByIdAndDelete(id);
    if (!deleteProductList) {
      return res.status(404).json({
        message: "No Data Found",
      });
    }
    res.json({
      message: "Data deleted successfully",
    });
  } catch (error) {
    res.json({
      Error: error,
    });
  }
};

const getProductData = async (req, res) => {
  try {
    console.log(req.params);
    let { id } = req.params;
    //   console.log(id);
    let viewdetail = await MakeupProducts.findById(id);
    console.log(viewdetail);
    if (!viewdetail) {
      return res.status(404).json({
        message: "Data not found",
      });
    }
    res.json({ ...viewdetail.toObject() });
  } catch (error) {
    res.json({
      Error: error,
    });
  }
};

module.exports = {
  CreateUser,
  getDataById,
  getAllData,
  updateDataById,
  deleteDataById,
  getuserdatabasedonobjectid,
  getProductData,
};
