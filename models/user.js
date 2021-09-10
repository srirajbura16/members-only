const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  member: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
});

//User URL
UserSchema.virtual('url').get(function () {
  return '/user/' + this.username;
});

module.exports = mongoose.model('User', UserSchema);
