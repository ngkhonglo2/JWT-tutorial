const User = require("../models/User");

const userControllers = {
    // get all user
    getAllUsers: async (req, res) => {
        try {
            const user = await User.find()
            res.status(200).json(user)
        } catch(err) {
            return res.status(500).json(err)
        }
    },

    // delete user 
    deleteUser: async (req, res) => {
        try {
            // await User.findByIdAndDelete(req.params.id)
            // xoá user thì dùng dòng trên
            await User.findById(req.params.id)
            res.status(200).json("Delete success!")
        } catch(err) {
            return res.status(500).json(err)
        }
    }
}

module.exports = userControllers;