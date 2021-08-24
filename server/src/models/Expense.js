import mongoose from 'mongoose';
import Joi from 'joi';
const { Schema } = mongoose;

const expenseSchema = new Schema(
  {
    expenseTitle: {
      type: String,
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: { 
        type: Number,
        required: true,
     },
    category: { 
      type: String,
      required: true,
     },
    description: { 
        type: String,
        required: true,
     },
  },
  { timestamps: true },
);

expenseSchema.methods.toJSON = function () {
  return {
    id: this._id,
    expenseTitle: this.expenseTitle,
    user: this.user.toJSON(),
    amount: this.amount,
    category: this.category,
    description: this.description,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

export const validateExpense = (expense) => {
  const schema = {
    expenseTitle: Joi.string().min(5).max(30).required(),
    amount: Joi.number().min(50).max(10000000).required(),
    description: Joi.string().min(5).max(1000).required(),
    category: Joi.string().required(),
  };
  return Joi.validate(expense, schema);
};

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
