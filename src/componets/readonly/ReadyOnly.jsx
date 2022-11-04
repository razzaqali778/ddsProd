import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './readyonly.css'

const ReadyOnly = ({item,handleEdit,handleDeleteClick}) => {
  return (
    <tr className='table-list'key={item.id}>
    <>
       
        {/* preset */}
        <td  className='table-elements'>{`${item.newPreset}`}</td>
        {/* Drawing */}
        <td  className='table-desc'>{`Page ${item.newPage}/#${item.newBalloon} ${item.newDrw} Rev ${item.newRev}`}</td>
        {/* Decimal */}
        <td  className='table-elements'>{`${item.newDecimal}`}</td>
        {/* Unit */}
        <td  className='table-elements'>{`${item.newUnit}`}</td>
        {/* Target */}
        <td  className='table-desc'>{`${item.newTarget}`}</td>
        {/* LowerLimit */}
        <td  className='table-elements'>{`${item.newLowerlimit}`}</td>
        {/* UpperLimit */}
        <td  className='table-elements'>{`${item.newUpperlimit}`}</td>
        <td >
          <button type='button'className='icons' onClick={(event)=>handleEdit(event, item)}><EditIcon></EditIcon></button>
          <button type="button" className='icons' onClick={() => handleDeleteClick(item.id)}>
          <DeleteIcon></DeleteIcon>
        </button>
          
        </td>                 
        </>
        </tr>
  )
}

export default ReadyOnly