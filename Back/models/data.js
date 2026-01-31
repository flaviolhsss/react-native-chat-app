const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
  avatarLength: { type: Number, default: 9 },
  tabIndex: { type: [Number], default: [8] }
});

module.exports = mongoose.model('Data', DataSchema);
