import React, { useEffect, useRef, useState } from 'react'
import Input from './Input'
import Select from './Select'

const ExpenseForm = ({ setExpenses }) => {
  const [expense, setExpense] = useState({
    title: '',
    category: '',
    amount: '',
    email: ''
  })

  const [errors, setErrors] = useState({})

  // const titleRef = useRef(null);
  // const categoryRef = useRef(null);
  // const amountRef = useRef(null);

  const validationConfig = {
    title: [
      { required: true, message: 'Please Enter Title' },
      { minLength: 5, message: 'Title should be at least 5 characters long' }
    ],
    category: [{required: true, message: 'Please Select a Category'}],
    amount: [{required: true, message: 'Please Enter an Amount'}],
    email: [
      {required: true, message: 'Please Enter an Email'},
      { pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Please Enter a Valid Email'}
    ],
  }

  const validate = formData => {
    const errorsData = {}

    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        if(rule.required && !value){
          errorsData[key] = rule.message;
          return true;
        }

        if(rule.minLength && value.length < 5){
          errorsData[key] = rule.message;
          return true;
        }

        if(rule.pattern && !rule.pattern.test(value)){
          errorsData[key] = rule.message;
          return true;
        }
      });
    });

    if (!formData.title) {
      errorsData.title = 'Title is required'
    }

    if (!formData.category) {
      errorsData.category = 'Cateory is required'
    }

    if (!formData.amount) {
      errorsData.amount = 'Amount is required'
    }

    if (!formData.email) {
      errorsData.email = 'Email is required'
    }

    setErrors(errorsData)
    return errorsData
  }

  const handleSubmit = e => {
    e.preventDefault();

    const validateResult = validate(expense)
    if (Object.keys(validateResult).length) return

    setExpenses(prevState => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() }
    ])

    setExpense({
      title: '',
      category: '',
      amount: '',
      email: ''
    })

    // setExpenses((prevState) => [
    //   ...prevState,
    //   {
    //     title: titleRef.current.value,
    //     category: categoryRef.current.value,
    //     amount: amountRef.current.value,
    //     id: crypto.randomUUID()
    //   }
    // ])
    // console.log({
    //   title: titleRef.current.value,
    //   category: categoryRef.current.value,
    //   amount: amountRef.current.value,
    //   id: crypto.randomUUID()
    // })
  }

  // const getFormData = (form) => {
  //   const formData = new FormData(form);
  //   const data = {}

  //   for(const [key, value] of formData.entries()){
  //     data[key] = value;
  //   }

  //   return data;
  // }

  // useEffect(() => {
  //   console.log(titleRef);
  // })

  const handleChange = e => {
    const { name, value } = e.target

    setExpense(prevState => ({
      ...prevState,
      [name]: value
    }))

    setErrors({})
  }

  const categoryLists = [
    {
      key: 'Grocery',
      value: 'Grocery'
    },
    {
      key: 'Clothes',
      value: 'Clothes'
    },
    {
      key: 'Bills',
      value: 'Bills'
    },
    {
      key: 'Education',
      value: 'Education'
    },
    {
      key: 'Medicine',
      value: 'Medicine'
    }
  ]

  return (
    <form className='expense-htmlForm' onSubmit={handleSubmit}>
      <Input
        label='Title'
        id='title'
        name='title'
        value={expense.title}
        onChange={handleChange}
        error={errors.title}
      />
      <Select
        label='Category'
        id='category'
        name='category'
        value={expense.category}
        onChange={handleChange}
        options={['Grocery', 'Clothes', 'Bills', 'Education', 'Medicine']}
        defaultOption='Select Category'
        error={errors.category}
      />
      <Input
        label='Amount'
        id='amount'
        name='amount'
        value={expense.amount}
        onChange={handleChange}
        error={errors.amount}
      />
      <Input
        label='Email'
        id='email'
        name='email'
        value={expense.email}
        onChange={handleChange}
        error={errors.email}
      />
      <button className='add-btn'>Add</button>
    </form>
  )
}

export default ExpenseForm
