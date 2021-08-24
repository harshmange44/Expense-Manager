import * as yup from 'yup';

export const expenseFormSchema = yup.object().shape({
    expenseTitle: yup.string().required(),
    amount: yup.number().required().min(2),
    category: yup.string().required(),
    description: yup.string().required(),
  });

  export const categoryFormSchema = yup.object().shape({
    category: yup.string().required(),
  });