import React,{ useState } from 'react';
import Switch from "react-switch";

import "./FilterPopup.css";

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
        <div className='c1'>
            <table className='c2'>
            <tbody>
               <tr> 
                  <td className='c3'>
                     <label>Map Id</label><br/>
                     <input
                        className="form-control"
                        type="text" 
                        value={MapId}
                        onChange={(e) => setMapId(e.target.value)}
                     />
                  </td>
                  <td>
                     <label>Rule Id</label>
                     <input
                        className="form-control"
                        type="text" 
                        value={RuleId}
                        onChange={(e) => setRuleId(e.target.value)}
                     />
                  </td>
               </tr>
               <tr className='c4'>
                  <td>
                     <label>Action: </label>
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
                     <label>Stats: </label>
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
                        <span>Match_All*:</span>
                        <Switch onChange={handleToggleChange} checked={toggleCheck}/>
                     </label>
                  </td>
               </tr>
               <tr>
                  <td colSpan={2}>
                     <table id='e1'>
                     <tbody>
                        <tr className='d1'>
                           <td id='dd1'>
                               <p id='dd2'>Availablefilters:</p>
                           </td>
                        </tr>
                        <tr className='c7'>
                           <td id='cc1'>L2</td>
                           <td id='cc2'>
                              <button className="btn btn-outline-dark">SMAC</button>
                              <button className="btn btn-outline-dark">DMAC</button>
                              <button className="btn btn-outline-dark">Ether Ty..</button>
                              <button className="btn btn-outline-dark">Inner VI...</button>
                              <button className="btn btn-outline-dark">Outer VI...</button>
                           </td>
                        </tr>
                        <tr className='c5'>
                           <td className='col-1' id='cc1'>L3</td>
                           <td className='col-12' id='cc2'>
                              <button className="btn btn-outline-dark">DIP</button>
                              <button className="btn btn-outline-dark">SIP</button>
                              <button className="btn btn-outline-dark">SIP V6</button>
                              <button className="btn btn-outline-dark">SMA..</button>
                              <button className="btn btn-outline-dark">DIP V6</button>
                              <button className="btn btn-outline-dark">DMASK</button>
                              <button className="btn btn-outline-dark">TTL</button>
                           </td>
                        </tr>
                        <tr className='c6'>
                           <td className='col-1' id='cc1'>L4</td>
                           <td className='col-12' id='cc2'>
                              <button className="btn btn-outline-dark">S Port</button>
                              <button className="btn btn-outline-dark">D Port</button>
                              <button className="btn btn-outline-dark">Protocol</button>
                           </td>
                        </tr>
                        <tr>
                           <td>
                              <button className='btn btn-primary' id='bb1'>Reset</button>
                           </td>
                           <td>
                              <button className='btn btn-primary' id='bb2'>Add rule</button>
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
                     <td colSpan={5} className='c8'>
                        <button className='btn btn-primary'>Clear all stats</button>
                     </td>
                  </tr>
                  <tr className='c9'>
                     <th>RuleId </th>
                     <th>Stats</th>
                     <th>Filters</th>
                     <th colSpan={3}>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  <tr className='final'>
                     <td>10</td>
                     <td>0</td>
                     <td>Action:permit</td>
                     <td><button className='btn btn-success'>Edit</button></td>
                     <td id='c10'><button className='btn btn-warning'>clr_stats</button></td>
                     <td><button className='btn btn-danger'>Del</button></td>
                  </tr> 
              </tbody>
            </table>

         </div>    
      </>
   );
}
export default FilterPopup;