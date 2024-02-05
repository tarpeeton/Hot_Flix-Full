const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const DeafultSchema = mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, require: true, unique: true }, // 998901234567
    password: { type: String },
    uid: { type: Number, require: true },
    balance: { type: Number, default: 0 },
    role: { type: String, required: true, enum: ["admin", "moderator", "user"] },
    image: [{ type: String }],
    avatar: { type: mongoose.Types.ObjectId, ref: "avatar", index: true },
}, {
    timestamps: true
})

DeafultSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

DeafultSchema.pre("remove", async function (next) {
    console.log(this._id)
    next()
})

module.exports = mongoose.model("user", DeafultSchema)