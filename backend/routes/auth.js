const authControllers = require("../controllers/authControllers");
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();

router.post("/register", authControllers.registerUser)
router.post("/login", authControllers.loginUser)
router.post("/refresh", authControllers.requestRefreshToken)
router.post("/logout", middlewareController.verifyToken, authControllers.userLogout)

module.exports = router;