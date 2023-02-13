const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userPoute = require("./routes/user");

const app = express();

dotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("da ket noi mongoose");
    } catch(err) {
        console.log(err.message)
        console.log("ket noi khong thanh cong");
		process.exit(1)
    }
}
connectDB()

app.use(cors())
app.use(cookieParser())
app.use(express.json())

// Routes
app.use("/v1/auth", authRoute)
app.use("/v1/user", userPoute)


app.listen(8000, () => {
    console.log('hello');
})