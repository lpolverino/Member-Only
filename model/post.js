const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  timeStamp: { type: Date, required: true},
  text: { type: String },
  author: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

PostSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/post/${this._id}`;
  });

// Export model
module.exports = mongoose.model("Post", PostSchema);