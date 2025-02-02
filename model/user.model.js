const {Schema, Types, model} = require("mongoose");

const UserSchema = new Schema({
    name: {type: String},
    mobile: {type: String, unique: true},
    password: {type: String},
    role: {type: Types.ObjectId, ref: "role"}
}, {
    timestamps: true
});

const UserModel = model("user", UserSchema);
module.exports = UserModel;