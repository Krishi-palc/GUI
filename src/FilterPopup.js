import React,{ useState } from 'react';
import Switch from "react-switch";

function FilterPopup(props) {
    const [MapId, setMapId] = useState(props.nodeId);
    const [RuleId, setRuleId] = useState("");
    const [allchecked, setAllChecked] = React.useState([]);
    const [toggleCheck, setToggleCheck] = useState(false);

  const handleToggleChange = (newChecked) => {
   setToggleCheck(newChecked);
  };
   function handleCheckChange(e) {
      if (e.target.checked) {
         setAllChecked([...allchecked, e.target.value]);
      } else {
         setAllChecked(allchecked.filter((item) => item !== e.target.value));
      }
   }
    return (
        <>
        <div style={{display:'flex'}}>
            <table style={{height:'30%',flexWrap:'wrap'}}>
            <tbody>
               <tr> 
                  <td style={{ fontSize: 'medium' , width: '65%' }}>
                     <label style= {{fontWeight: 'bold',marginLeft:'10px',fontFamily:'initial'}}>Map Id</label><br/>
                     <input
                        className="form-control"
                        style={{marginLeft:'10px'}} 
                        type="text" 
                        value={MapId}
                        onChange={(e) => setMapId(e.target.value)}
                     />
                  </td>
                  <td style={{ fontSize: 'medium' , width: '70%' }}>
                     <label style= {{fontWeight: 'bold',marginLeft:'10px',fontFamily:'initial'}}>Rule Id</label>
                     <input
                        style={{marginRight:'10px',marginLeft:'10px'}} 
                        className="form-control"
                        type="text" 
                        value={RuleId}
                        onChange={(e) => setRuleId(e.target.value)}
                     />
                  </td>
               </tr>
               <tr>
                  <td style={{width:'20px',padding: '5px'}}>
                     <label style= {{fontWeight: 'bold',marginLeft:'10px',fontFamily:'initial'}}>Action: </label>
                     <div>
                        <input value = "Permit" type = "checkbox" onChange = {handleCheckChange} />
                        <span> Permit </span>
                     </div>
                     <div>
                        <input value = "Deny" type = "checkbox" onChange = {handleCheckChange} />
                        <span> Deny </span>
                     </div>
                  </td>
                  <td>
                     <label style= {{fontWeight: 'bold',marginLeft:'10px',fontFamily:'initial'}}>Stats: </label>
                     <div>
                        <input value = "Permit" type = "checkbox" onChange = {handleCheckChange} />
                        <span> Enable </span>
                     </div>
                     <div>
                        <input value = "Deny" type = "checkbox" onChange = {handleCheckChange} />
                        <span> Disable </span>
                     </div>
                  </td>
                  <td>
                     <label>
                        <span style= {{fontWeight: 'bold',fontFamily:'initial'}}>Match_All*:</span>
                        <Switch onChange={handleToggleChange} checked={toggleCheck}/>
                     </label>
                  </td>
               </tr>
               <tr>
                  <td colSpan={2}>
                     <table style={{width: '450px', fontSize: '20px',height:'30%'}}>
                     <tbody>
                        <tr >
                           <td style={{height:'50px'}}>
                               <p style={{fontWeight:'bolder',fontFamily:'initial'}}>Availablefilters:</p>
                           </td>
                        </tr>
                        <tr>
                           <td  style={{border: '1px solid black', textAlign: 'center'}}>L2</td>
                           <td  style={{border: '1px solid black', borderRadius: '10px', height: '10px', marginLeft: '20px'}}>
                              <button className="btn btn-outline-dark" style={{marginRight: '5px', fontSize: '12px',padding:'10px',marginLeft:'10px'}}>SMAC</button>
                              <button className="btn btn-outline-dark" style={{marginRight: '5px', fontSize: '12px',padding:'10px'}}>DMAC</button>
                              <button className="btn btn-outline-dark" style={{marginRight: '5px', fontSize: '12px',marginBottom:'10px',marginTop:'10px'}}>Ether Ty..</button>
                              <button className="btn btn-outline-dark" style={{marginRight: '5px', fontSize: '12px',marginBottom:'10px',marginLeft:'10px'}}>Inner VI...</button>
                              <button className="btn btn-outline-dark" style={{marginRight: '5px', fontSize: '12px',marginBottom:'10px'}}>Outer VI...</button>
                           </td>
                        </tr>
                        <tr>
                           <td className='col-1' style={{border: '1px solid black', textAlign: 'center', width: '2px'}}>L3</td>
                           <td className='col-12' style={{border: '1px solid black', borderRadius: '10px', height: '10px', marginLeft: '20px'}}>
                              <button className="btn btn-outline-dark" style={{marginRight: '5px', fontSize: '12px',padding:'10px',marginLeft:'10px'}}>DIP</button>
                              <button className="btn btn-outline-dark" style={{marginRight: '5px', fontSize: '12px',padding:'10px'}}>SIP</button>
                              <button className="btn btn-outline-dark" style={{marginRight: '5px', fontSize: '12px',marginBottom:'10px',marginTop:'10px'}}>SIP V6</button>
                              <button className="btn btn-outline-dark" style={{marginRight: '5px', fontSize: '12px',marginLeft:'2px'}}>SMA..</button>
                              <button className="btn btn-outline-dark" style={{marginRight: '5px', fontSize: '12px',marginBottom:'10px',marginLeft:'10px'}}>DIP V6</button>
                              <button className="btn btn-outline-dark" style={{marginRight: '5px', fontSize: '12px',marginBottom:'10px'}}>DMASK</button>
                              <button className="btn btn-outline-dark" style={{marginLeft:'2px',fontSize: '12px',marginBottom:'10px'}}>TTL</button>
                           </td>
                        </tr>
                        <tr>
                           <td className='col-1' style={{border: '1px solid black', textAlign: 'center', width: '2px'}}>L4</td>
                           <td className='col-12' style={{border: '1px solid black', borderRadius: '10px', height: '10px', marginLeft: '20px'}} >
                              <button className="btn btn-outline-dark" style={{marginRight: '5px', fontSize: '12px',padding:'10px',marginLeft:'10px'}}>S Port</button>
                              <button className="btn btn-outline-dark" style={{marginRight: '5px', fontSize: '12px',padding:'10px'}}>D Port</button>
                              <button className="btn btn-outline-dark" style={{marginRight: '5px', fontSize: '12px',marginBottom:'10px',marginTop:'10px'}}>Protocol</button>
                           </td>
                        </tr>
                        <tr>
                           <td>
                              <button className='btn btn-primary' style={{marginLeft:'50px',marginTop:'5px'}}>reset</button>
                           </td>
                           <td>
                              <button className='btn btn-primary' style={{marginLeft:'90px',marginTop:'5px'}}>Add rule</button>
                           </td>     
                        </tr>
                        </tbody>
                     </table>
                  </td>
               </tr>
            </tbody>
            </table>


            <table className='table' >
               <thead>
                  <tr>
                     <td>
                        <input  type="text" name='name' className="form-control" placeholder='Search by id' />
                     </td>
                     <td colSpan={5} style={{textAlign:'end'}}>
                        <button className='btn btn-primary'>Clear all stats</button>
                     </td>
                  </tr>
                  <tr>
                     <th style={{fontFamily:'initial'}}>RuleId </th>
                     <th style={{fontFamily:'initial'}}>Stats</th>
                     <th style={{fontFamily:'initial'}}>Filters</th>
                     <th colSpan={3} style={{fontFamily:'initial',textAlign:'center'}}>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  <tr >
                     <td>10</td>
                     <td>0</td>
                     <td>Action:permit</td>
                     <td><button className='btn btn-success'>Edit</button></td>
                     <td><button className='btn btn-warning' style={{height:'45px',width:'80px',textAlign:'center',color:'white'}}>clr_stats</button></td>
                     <td><button className='btn btn-danger'>Del</button></td>
                  </tr>
              </tbody>
            </table>

         </div>    
      </>
   );
}
export default FilterPopup;