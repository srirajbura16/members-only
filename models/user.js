const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  membership_status: false,
  admin: false,
});

//User URL
UserSchema.virtual('url').get(() => {
  return '/user/' + this.username;
});

module.exports = mongoose.model('User', UserSchema);
