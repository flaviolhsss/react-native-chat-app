const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userName: { type: String, required: true },
  dateInscription: { type: Date, required: true},
  currentSession: { type: String, required: false, default: null },
  avatar: { type: Number, required: false, default: 0 },
});

module.exports = mongoose.model('User', userSchema);
