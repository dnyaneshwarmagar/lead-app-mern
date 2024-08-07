const {Schema,model} = require('mongoose');

const leadSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true },
  products: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = model('Lead', leadSchema);
