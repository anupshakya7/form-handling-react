import React from 'react'

const ContextMenu = ({menuPosition, setMenuPosition, expenses, setExpenses, expense, setExpense,setEditingRowId ,rowId}) => {
  if(!menuPosition.left) return;
  return (
    <div className='context-menu' style={{ ...menuPosition}}>
      <div onClick={() => {
        setEditingRowId(rowId);
        const {title, category, amount} = expenses.find((expense) => expense.id === rowId);
        setExpense({title, category, amount});
        setMenuPosition({});
      }}>Edit</div>
      <div onClick={() => {
        setExpenses((prevState) => prevState.filter(expense => expense.id !== rowId))
        setMenuPosition({});
      }}>Delete</div>
    </div>
  )
}

export default ContextMenu
