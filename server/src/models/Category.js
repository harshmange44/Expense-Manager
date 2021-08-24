import mongoose from 'mongoose';
import Joi from 'joi';
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    categoryTitle: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

categorySchema.methods.toJSON = function () {
  return {
    id: this._id,
    categoryTitle: this.categoryTitle,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

export const validateCategory = (category) => {
  const schema = {
    categoryTitle: Joi.string().min(5).max(30).required(),
  };
  return Joi.validate(category, schema);
};

const Category = mongoose.model('Category', categorySchema);

export default Category;
