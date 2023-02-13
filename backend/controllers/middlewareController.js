const jwt = require("jsonwebtoken")

const middlewareController = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if(token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if(err){
                    return res.status(403).json("Token is not valid")
                }
                req.user = user;
                next();
            })
        } else {
            return res.status(401).json("you're not autheticated")
        }
    },
    verifyTokenAndAdmin: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            // neu params.id = với id đang đăng nhập hoặc role admin thì sẽ next 
            if(req.user.id == req.params.id || req.user.admin) {
                next()
            } else {
                return res.status(403).json("you're not allowed to delete other")
            }
        })
    }
}

module.exports = middlewareController;