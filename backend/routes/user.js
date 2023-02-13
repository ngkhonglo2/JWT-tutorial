const middlewareController = require("../controllers/middlewareController");
const userControllers = require("../controllers/userControllers");

const router = require("express").Router();

router.get("/", middlewareController.verifyToken, userControllers.getAllUsers);
router.delete("/:id", middlewareController.verifyTokenAndAdmin, userControllers.deleteUser)

module.exports = router;