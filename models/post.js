const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

//Post URL
PostSchema.virtual('url').get(() => {
  return '/post/' + this._id;
});

module.exports = mongoose.model('Post', PostSchema);
