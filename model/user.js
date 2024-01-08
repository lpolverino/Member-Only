const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  username:{type:String, required:true},
  password:{type:String, required:true},
  membership_status: {
    type: String,
    required: true,
    enum: ["Registered", "Unregistered","Admin"],
    default: "Unregistered",
  },
});

UserSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/user/${this._id}`;
});

UserSchema.virtual("full_name").get(function() {
    let fullname = "";
    if (this.first_name && this.family_name) {
      fullname = `${this.family_name}, ${this.first_name}`;
    }
  
    return fullname;
})

// Export model
module.exports = mongoose.model("User", UserSchema);