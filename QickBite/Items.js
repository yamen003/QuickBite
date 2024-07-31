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
  }
});

// eslint-disable-next-line no-undef
export default Item = model('Items', ItemSchema);
