const {Schema, Types, model} = require("mongoose");
const PermissionSchema = new Schema({
    name: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String},
});
const RoleSchema = new Schema({
    title: {type: String},
    name: {type: String},
    description: {String},
    permissions: {type: [PermissionSchema], default: []},
}, {timestamps: true});

const RoleModel = model("role", RoleSchema);
module.exports = RoleModel;