let express = require("express");
let router = express.Router();
let func = require("../config/function");
let userModel = require("../model/user_model");
const userController = require("../controllers/user_controller");
const paginatedResults = require("../middleware/paginate_result");

router.post(
  func.urlCons.URL_USER_REGISTRATION,
  userController.userRegistration
);
router.post(func.urlCons.URL_USER_LOGIN, userController.userLogin);
router.post(func.urlCons.URL_LINKED_LOGIN, userController.linkedInLogin);
router.get(func.urlCons.URL_USER_LIST, userController.getUserList);
router.post(
  func.urlCons.URL_TEMP_USER_DATA_SAVE,
  userController.tempUserRegister
);
router.post(
  func.urlCons.URL_GET_TEMP_USER_DATA,
  userController.getTempUserData
);
router.post(
  func.urlCons.URL_UPDATE_USER_REGISTRATION_STATUS,
  userController.updateUserRegisterStatus
);
router.get(func.urlCons.FILTER_BY_ID, async (req, res) => {
  try {
    const fetchedUser = await userModel.find({ _id: req.params.id });
    return res.status(200).json(fetchedUser);
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.post("/update/:id", async (req, res) => {
  try {
    const updatedDocument = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    return res.status(200).json("update success");
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.post(func.urlCons.FILTER_USERS, userController.filterUser);
router.post(
  func.urlCons.PAGINATE_USERS,
  paginatedResults(userModel),
  userController.paginateUsers
);
module.exports = router;
