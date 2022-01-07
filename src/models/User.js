const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: String,
    password: String
}, {
    timestamps: true,
    versionKey: false
}
);

module.exports = model ('User', userSchema);

