import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    key: {
        type: String,
        required: true,
        unique: true
    },

    streamTitle: {
        type: String
    }
});

schema.methods.comparePassword = async function(password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, function(err, result) {
            resolve(result);
        });
    })
};

schema.pre('save', function(next){
    if (!this.isModified('password')) {
        return next();
    }

    const user = this;

    bcrypt.genSalt(10, function(err, salt){
        if (err) { 
            return next(err);
        }

        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) {
                return next(err);
            }

            user.password = hash;
            next();
        })

   })
});

export default model("User", schema);