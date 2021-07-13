const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  id: { type: String, require: true, unique: true},
  address: {type: String, require: false}
});

const model = mongoose.model('wallet', walletSchema);

module.exports = model;