import React, {  useState,useRef,useEffect } from 'react'
import {nanoid} from 'nanoid'
import uuid from 'react-uuid'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

import './drawing.css'

const Drawing = () => {
// Drawing states---------------------------------------------------------------------------->>.

const [update, setUpate]= useState({
    drw:'', 
    rev:'',
    page:'', 
    balloon:'',
   
});

//Tollerance states------------------------------------------------------------------------->>

const [inputUpdate, setInputUpdate]= useState({ d4:'',d3:'',d2:'',d1:'',ang1:'',ang2:''});

// Toggle state ---------------------------------------------------------------------------->>
const [toggleClass, setToggleClass] = useState('')

// Conversion state ------------------------------------------------------------------------->>
const [decimal,setDecimal]  = useState(null)


// output state ----------------------------------------------------------------------------->>
const [target, setTarget] = useState({})
const [submit, setSubmit] = useState([]);
const [btn, setBtn]= useState(false)

//range state ------------------------------------------------------------------------->>

let lowerLimit = useRef(Number);
let upperLimit = useRef(Number);

//////////////////////////////////////////////////////////////////////////////////////////////
const preSet = ['Z001', 'Z002', '2200']
const unit = ['Inch','deg','µin']

// Range handle _------------------------------------------------------------------------->>
const rangeHandler=()=>{
   
  let l1 =lowerLimit.current.name
  let LL = Number(lowerLimit.current.value);
  let UL = Number(upperLimit.current.value);
   setTarget((prv)=>{
    setBtn(true)
    
    if(l1==='inch-range'){
      
      return{...prv,lowerLimit:LL, upperLimit:UL,preSet:preSet[1],unit:unit[0], Target:'', decimal:4}
    }else  if (l1==='ang-range'){
      return {...prv,lowerLimit:LL, upperLimit:UL,preSet:preSet[1],unit:unit[1], Target:'', decimal:4}
    }else if(l1==='surface-range'){
      return {...prv,lowerLimit:LL, upperLimit:UL,preSet:preSet[1],unit:unit[2], Target:'', decimal:4}
    }   

  })
}

///////////////////////////////////////////////////////////////////////////////////////////

// Drawing details---------------------------------------------------------------->
const HandleUpdate= (event) => {

    const value = event.target.value.trim();
    const name = event.target.name.trim();

    setUpate((prevValue)=>{
        if(name==='drw'){
            return {
                ...prevValue,
                drw:value,
                
            }
        } else if(name==="rev"){
            return {
                ...prevValue,
                rev:value,
                
            }
        }else if (name==="page"){
            return {
                ...prevValue,
                page:value
            }


        }else if (name==="balloon"){
            return {
                ...prevValue,
                balloon:value
            }

   }});

}
////////////////////////////////////////////////////////////////////////////////////////////////////

// Tolerance value---------------------------------------------------------------------->>
const inputUpdateHandler= (event) => {    
    const value = event.target.value.trim();
    const name = event.target.name.trim();

    setInputUpdate((prevValue)=>{
        if(name==='d4'){
            return {
                ...prevValue,
                d4:value,
            }}else if(name ==='d3'){
              return {
                ...prevValue,
                d3:value,
            }}else if(name ==='d2'){
              return {
                ...prevValue,
                d2:value,
            }}else if(name ==='d1'){
              return {
                ...prevValue,
                d1:value,
            }}else if(name ==='ang1'){
              return {
                ...prevValue,
                ang1:value,
            }}else if(name ==='ang2'){
                return {
                  ...prevValue,
                  ang2:value,
              }}    
        });

        
} 

///////////////////////////////////////////////////////////////////////////////////////////////////////

// Dropdown- decimal ---------------------------------------------------------------------->
const decimalHandler=(event)=>{
    const value  = +event.target.value
    
    const fourDigitTollerance = Number(inputUpdate.d4);
    const threeDigitTollerance = Number(inputUpdate.d3);
    const twoDigitTollerance = Number(inputUpdate.d2);
    const singleDigitTollerance = Number(inputUpdate.d1);
    const angTollerance1 = Number(inputUpdate.ang1);
    const angTollerance2 = Number(inputUpdate.ang2);
  
    setDecimal(()=>{
      if(value===4){
        return fourDigitTollerance
      }else if(value===3){
        return threeDigitTollerance
      }else if(value ===2){
        return twoDigitTollerance
      }else if(value ===1){
            return singleDigitTollerance 
        }else if(value ===0){
        return angTollerance1
      }else if(value===5){
        return angTollerance2
      }
    })
    
}

///////////////////////////////////////////////////////////////////////////////////////////////////

// Dropdown -target---------------------------------------------------------------->>
const toggleHandler= (event)=>{
  const getValue = event.target.value;
  setToggleClass(getValue);
  console.log(getValue)

  if(getValue==='a'){
   setBtn(true)
  }else if(getValue==='b'){
    setBtn(true)
  }else if(getValue==='c'){
    setBtn(true)
  }else{
    setBtn(false)
  }
  
}

//////////////////////////////////////////////////////////////////////////////////////////////

// target range thread ----> output------------------------------------------------------>>
const valueHandler=(event)=>{
    
    const name = event.target.name.trim();

    setTarget(()=>{
        

        if(name==='target'){

            const value = +event.target.value.trim();

            let Target = value;
            let upperLimit = +(decimal + Target).toFixed(4);
            let lowerLimit = Target - decimal >= 0 ? +(Target -decimal).toFixed(4)  :0

            return({preSet:preSet[0],Target,lowerLimit,upperLimit, decimal:'4',unit:unit[0]})

        }else if(name==='angle'){

            const value = +event.target.value.trim();
            let Target = value;
            let upperLimit = +(decimal + Target).toFixed(4);
            let lowerLimit = Target - decimal >= 0 ? +(Target -decimal).toFixed(4)  :0

            return({preSet:preSet[0],Target,lowerLimit,upperLimit, decimal:'4',unit:unit[1]})

        }else if (name ==='thread'){

            const value = event.target.value.trim();

            return({preSet:preSet[2],Target:value,lowerLimit:'',upperLimit:'', decimal:'',unit:''})

        }

    })

    
}

///////////////////////////////////////////////////////////////////////////////////////////////////

// Form submit ----------------------------------------------------------------------------->>

const handleAddFormSubmit = (event)=>{
    event.preventDefault()

    const newUpdate = {
        id:uuid(),
        //Drw data
        newDrw:update.drw, 
        newRev:update.rev,
        newPage:update.page, 
        newBalloon:update.balloon,

        // tol data
        newPreset:target.preSet,
        newTarget:target.Target,
        newUpperlimit:target.upperLimit,
        newLowerlimit:target.lowerLimit,
        newDecimal:target.decimal,
        newUnit:target.unit,
    
        }

        setSubmit((prev)=>{
            return [...prev, newUpdate]
        })
      
        console.log(uuid)
      
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Local storage ------------------------------------------------------------------------->>>>>>>>>

// let store = []
// const stoarge = useEffect(()=>{
//     localStorage.setItem('List', JSON.stringify(target))
// },[target])



//////////////////////////////////////End ///////////////////////////////////////////////////////////
  return (
    <> 
    <div className='outer-container'> 
        <div className='container'>       
            <h1>Emmott dimensional sheet generator</h1>
                <form onSubmit={handleAddFormSubmit}>
                {/* Drawing data */}
                    <div className='drawing-container'>
                        <div className="drawing-inner" >
                            <div className='drawing-heading-container'>
                                <label className='heading'>Drawing No:</label>
                                <input type="text" className='headingInput' name="drw" onChange={HandleUpdate} required/>
                            </div>
                            <div className='drawing-heading-container'>
                                <label className='heading'>Rev No:</label>
                                <input type="text" className='headingInput'name="rev" onChange={HandleUpdate} />
                            </div>
                            <div className='drawing-heading-container'>
                                <label className='heading'>Page No:</label>
                                <input type="text" className='headingInput' min="1" max="10" name="page" onChange={HandleUpdate} required/>
                            </div>                
                        </div>
                        <div>
                            {/* Tollarance data */}
                        <h4>DEFAULT TOLLERANCE</h4>
                        {/* tolerance values */}
                        <div className='inch-row'>
                            <span>Inch</span>
                            <div>
                                <label className='heading'>0.XXXX:</label>
                                <input type="Number"className='headingInput' min='0.0000' step='0.0001' max='0.9999' name="d4" onChange={inputUpdateHandler}/>
                    
                                <label className='heading' >0.XXX:</label>
                                <input type="Number"className='headingInput'  min='0.000' step='0.001' max='0.999' name="d3" onChange={inputUpdateHandler}/>
                        
                                <label className='heading'>0.XX:</label>
                                <input type="Number"className='headingInput' min='0.00' step='0.001' max='0.999' name="d2" onChange={inputUpdateHandler}/>
                        
                                <label className='heading'>0.X:</label>
                                <input type="Number" className='headingInput' min='0.00' step='0.01' max='0.99' name="d1" onChange={inputUpdateHandler}/>
                            </div>
                        </div>
                        <div className='angle-row'>
                            <span>Angle</span>
                            <label className='heading'>X:</label>
                            <input type="Number" className='headingInput'min="0" max="100" name="ang1"  onChange={inputUpdateHandler}/>
                            <label className='heading'>0.X:</label>
                            <input type="Number" className='headingInput'min="0.00" step='.01' max="100" name="ang2"  onChange={inputUpdateHandler}/>
                        </div>
                    
                        {/* digit */}
                        <div className='types'>
                            <div className='decimal-container'>
                                <label className='decimail-label'>Balloon No:</label> 
                                <input type="Number" min="1"className='decimail-option ballon' max="500" name="balloon" onChange={HandleUpdate} required/>
                            </div> 
                                <div>
                                    <div className='decimal-container'>
                                        <label className='decimail-label'>Decimal:</label>
                                        <select className='decimail-select' onChange={(e)=>decimalHandler(e)}>
                                        <option className='decimail-option'></option>
                                        <option  className='decimail-option'>0</option>
                                        <option  className='decimail-option'>1</option>
                                        <option  className='decimail-option'>2</option>
                                        <option className='decimail-option' >3</option>
                                        <option  className='decimail-option'>4</option>
                                        <option  className='decimail-option'>5</option>
                                        </select>
                                    </div>
                                </div>
                            {/* types */}
                                <div className='dt'>
                                    <div className='type-container'>
                                        <label className='type-label'>Types:</label>
                                        <select className='type' onChange={(e)=>toggleHandler(e)}>
                                        <option className='types'></option>
                                        <option  className='types'value='1' name='target-type'>Inch</option>
                                        <option  className='types'value='2' name='angle-type'>Angle</option>
                                        <option  className='types'value='a' name='inch-range-type'>Inch-range</option>
                                        <option  className='types'value='b' name='angle-range-type'>Angle-range</option>
                                        <option  className='types'value='c' name='tir-type'>Surface</option>
                                        <option  className='types'value='4' name='thread-type'>Thread</option>
                                        </select>         
                                    </div>                     
                                    <div >
                                        { !btn && <button type='submit' className='btn' >ADD</button>   }          
                                        <div >
                                            {
                                            toggleClass==="1" && (        
                                                <input type="Number"  className='toggle'min='0.0000' step='0.0001' max='9999' name='target' onChange={valueHandler} />) 
                                            } 
                                        </div>
                                        <div >
                                            {
                                            toggleClass==="2" && (        
                                                <input type="Number"  className='toggle'min='0.0000' step='0.0001' max='9999' name='angle' onChange={valueHandler} />) 
                                            } 
                                        </div>                    
                                        {/* Range  */}
                                        <div>
                                        <div >
                                            {
                                            toggleClass==="a" && 
                                            (<>
                                            <input type="Number"  className='toggle' min='0.0000' step='0.0001' max='9999' name='inch-range' ref={lowerLimit}  />
                                            <input type="Number"  className='toggle' min='0.0000' step='0.0001' max='9999' ref={upperLimit} />
                                            </> )       
                                            }                                   
                                        </div>
                                            <div >
                                                {
                                                toggleClass==="b" && 
                                                (<>
                                                <input type="Number"  className='toggle' min='0.0000' step='0.0001' max='9999' name='ang-range' ref={lowerLimit}  />
                                                <input type="Number"  className='toggle' min='0.0000' step='0.0001' max='9999' ref={upperLimit}  />
                                                </> )       
                                                }                               
                                            </div>
                                            <div >
                                                {
                                                toggleClass==="c" && 
                                                (<>
                                                <input type="Number"  className='toggle' min='0.0000' step='0.0001' max='9999' name='surface-range' ref={lowerLimit}  />
                                                <input type="Number"  className='toggle' min='0.0000' step='0.0001' max='9999' ref={upperLimit}  />
                                                </> )       
                                                } 
                                                
                                            </div>
                                        {btn && <button onClick={rangeHandler}  className='btn1' >Add</button>} 
                                        </div>
                                        <div>
                                            {
                                            toggleClass==="4" && (        
                                                <input type="String" className='toggle' name='thread'onChange={valueHandler}/>) 
                                            } 
                                        </div>          
                                    </div> 
                                </div>                           
                            </div>                                 
                        </div>
                    </div>      
                </form>
            </div>
    {/* Table Data */}
            <div className="outer-wrapper">
                <div className="table-wrapper">
                        <table id='tableData'>
                            <thead> 
                                <tr> 
                                
                                    <th className='table-elements' >Preset</th>
                                    <th className='table-desc'>Description</th>
                                    <th className='table-elements' >Decimal</th>
                                    <th className='table-elements' >Unit</th>
                                    <th className='table-elements' >Target</th>
                                    <th className='table-elements' >U limit</th>
                                    <th className='table-elements' >L limit</th>
                                </tr>              
                            </thead>
                            <tbody className='table-body'>                             
                                    {submit.map((item)=>(
                                    
                                    <tr className='table-list'key={item.id}>
                                    <>
                                        {/* preset */}
                                        <td  className='table-elements'>{`${item.newPreset}`}</td>
                                        {/* Drawing */}
                                        <td  className='table-desc'>{`page ${item.newPage}/#${item.newBalloon} ${item.newDrw} ${item.newRev}`}</td>
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
                                        </>
                                        </tr> ))}
                                    
                            </tbody>
                        </table>
                    <ReactHTMLTableToExcel
                        table='tableData'
                        filename='DDS'
                        sheet = 'Sheet'
                        buttonText = 'Export'
                        className='export-btn'
                    />
                </div> 
            </div>  
         </div>  
    </>
  )
  }

export default Drawing