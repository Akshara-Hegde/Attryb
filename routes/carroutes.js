const express = require("express");
const router = express.Router();
const {
  numberOfManufacturers,
  add,
  deleteCar,
  view,
  viewSingle,
  getOEMS,
  edit,
} = require("../controller/controller");
const {
  authenticateAdminToken,
  authenticateToken,
} = require("../middlewares/validation");

router.route("/OEMS/:search").get(authenticateAdminToken, getOEMS);
router.route("/OEMSCount").get(authenticateAdminToken, numberOfManufacturers);
router
  .route("/")
  .post(authenticateAdminToken, add)

  .get(authenticateToken, view);
router
  .route("/:id")
  .put(authenticateAdminToken, edit)
  .delete(authenticateAdminToken, deleteCar)
  .get(authenticateToken, viewSingle);

module.exports = router;
