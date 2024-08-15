import { Schema, model } from 'mongoose';

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cart: [
    {
      img: String,
      title: String,
      price: String,
      quantity: { type: Number, default: 1 }
    }
  ]
});

// eslint-disable-next-line no-undef
export default Item = model('Items', ItemSchema);
