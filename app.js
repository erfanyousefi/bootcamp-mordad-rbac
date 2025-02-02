const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./model/user.model");
const RoleModel = require("./model/role.model");
const {blogRouter} = require("./routes/blog.routes");
const {paymentRouter} = require("./routes/payment.routes");
async function bootstrap () {
    await mongoose.connect("mongodb://localhost:27017/rbac-boot").then(() => {
        console.log("Connected to MongoDB");
    }).catch(err => {
        console.log("Database connection Error: ", err);
    });
    const app = express();
    app.use(async (req, res, next) => {
        const user = await UserModel.findOne({}).populate("role");
        req.user = {
            id: user._id,
            name: user.name,
            role: user.role
        };
        next();
    });
    app.use(blogRouter);
    app.use(paymentRouter);
    app.use((req, res, next) => {
        res.status(404).send("Page Not Found");
    });
    app.use((err, req, res, next) => {
        res.status(err?.status ?? 500).send(err?.message ?? "internal server error");
    });
    app.listen(4000, async () => {
        console.log("http://localhost:4000");
    });

}
bootstrap();