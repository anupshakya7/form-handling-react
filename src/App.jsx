import { useState } from 'react'
import './App.css'
import ExpenseForm from './components/ExpenseForm'
import ExpenseTable from './components/ExpenseTable'
import ContextMenu from './components/ContextMenu'
import expenseData from './expenseData'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [expenses, setExpenses] = useLocalStorage('expenses',expenseData);
  const [expense, setExpense] = useLocalStorage('expense',{
    title: '',
    category: '',
    amount: ''
  })
  const [editingRowId, setEditingRowId] = useLocalStorage('editingRowId','');

  return (
    <main>
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
        <ExpenseForm setExpenses={setExpenses} expense={expense} setExpense={setExpense} editingRowId={editingRowId} setEditingRowId={setEditingRowId}/>
        <ExpenseTable expenses={expenses} setExpenses={setExpenses} expense={expense} setExpense={setExpense} setEditingRowId={setEditingRowId}/>
      </div>
    </main>
  )
}

export default App
