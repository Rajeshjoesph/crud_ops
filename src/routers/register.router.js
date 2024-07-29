const express = require("express");
const router = express.Router();
const registerController = require("../controllers/register.controller");
const upload = require("../middleware/multer");

router
  .route("/register")
  .post(upload, registerController.createUser)
  .get(registerController.getuserdatasbyquery)
  .put(registerController.edituserBasedOnObjectId)
  .delete(registerController.deleteuserBasedOndeleteOne);



router
  .route("/registermethods")
  .get(registerController.getuserdatasbyparams)
  .put(registerController.edituserBasedOnupdateOne);
router.put(
  "/edituserBasedOnupdateMany",
  registerController.edituserBasedOnupdateMany
);

router.get(
  "/getuserdatabasedonobjectid",
  registerController.getuserdatabasedonobjectid
);
router.get("/getuserdadtabyfindone", registerController.getuserdadtabyfindone);

router.delete(
  "/deleteuserBasedOndeletemany",
  registerController.deleteuserBasedOndeletemany
);
router.delete(
  "/deleteuserBasedOnfindByIdandDelete",
  registerController.deleteuserBasedOnfindByIdandDelete
);

//multer
router.delete(
  "/multerfindanddelete",
  registerController.multerDeleteBasedOnObjectId
);

router.put(
  "/multerfindandedit",
  registerController.multereditUserBasedOnObjectId
);

module.exports = router;
