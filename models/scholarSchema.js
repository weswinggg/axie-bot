const mongoose = require('mongoose');

const scholarSchema = new mongoose.Schema({
  managerId: { type: String, require: true},
  name: {type: String, require: true},
  address: {type: String, require: true}
});

const model = mongoose.model('scholar', scholarSchema);

module.exports = model;