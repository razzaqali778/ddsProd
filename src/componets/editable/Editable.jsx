import React from 'react'
import './editable.css'

import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';



const Editable = ({editFormData,handleEditFrormChange, handleCancelClick}) => {
  return (
    <tr className='table-list'>
    <>
       
        {/* preset */}
        <td  className='table-elements'  ><input className='eInput' onChange={handleEditFrormChange} value={editFormData.newPreset} name ='surface-range'/></td>
        {/* Drawing */}
        <td  className='table-desc' onChange={handleEditFrormChange} ><input className='eInput' name = 'dr'value={`page ${editFormData.newPage}/#${editFormData.newBalloon} ${editFormData.newDrw} ${editFormData.newRev}`}/></td>
        {/* Decimal */}
        <td  className='table-elements' ><input  className='eInput' name ='d' onChange={handleEditFrormChange} value={editFormData.newDecimal}/></td>
        {/* Unit */}
        <td  className='table-elements' ><input className='eInput'  name = 'u' onChange={handleEditFrormChange} value={editFormData.newUnit}/></td>
        {/* Target */}
        <td  className='table-desc' ><input  className='eInput' name='target' onChange={handleEditFrormChange} value={editFormData.newTarget}/></td>
        {/* LowerLimit */}
        <td  className='table-elements' ><input  className='eInput' name='ll' onChange={handleEditFrormChange} value={editFormData.newLowerlimit}/></td>
        {/* UpperLimit */}
        <td  className='table-elements'><input className='eInput'  name='ul' onChange={handleEditFrormChange} value={editFormData.newUpperlimit}/></td>
        <td>
          <button type='submit'><SaveIcon></SaveIcon></button>
          <button type='submit'><CancelIcon></CancelIcon></button>     
        </td>                 
        </>
        </tr>
  )
}

export default Editable