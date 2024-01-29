import { useState , useEffect } from 'react';
import url1 from './url1';
 
import './MapPopup.css';
 
function MapPopup(props) {
  const [textarea, setTextarea] = useState();
  const [MapId, setMapId] = useState("");
  const [NetPort, setNetPort] = useState("");
  const [ToolPort, setToolPort] = useState("");
 
  const handleChange = (event) => {
    setTextarea(event.target.value)
  }
 
  const fetchData = async () => {
    try {
      // const url = "https://my-json-server.typicode.com/rajkumar-palc/api/ethernet";
      // const url = "http://localhost:2000/api/ethernets";
      const url = `${url1}/Map/${props.nodeId}`;
      const response = await fetch(url);
     
      // console.log("Node Id in Popup : "+props.nodeId);
 
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
     
      const responseData = await response.json();
      setMapId(responseData.id);
      setNetPort(responseData.from);
      setToolPort(responseData.to);
      setTextarea(responseData.description);
      // console.log(responseData);
    }
    catch (error) {
      console.error(error);
    }
  };
 
  useEffect(() => {
    fetchData();
  });
 
  return (
    <>
    <form>
      <table>
      <tbody>
        <tr className='b1'>
          <td>
            <label>Map Id</label>
          </td>
        </tr>
        <tr>
          <td className='b2'>
            <input
              className="form-control"
              type="text"
              value={MapId}
              onChange={(e) => setMapId(e.target.value)}
            />
          </td>
        </tr>
        <tr className='b1'>
          <td>
            <label>Network Port:</label>
          </td>
        </tr>
        <tr>
          <td>
            <input
              className="form-control"
              type="text"
              value={NetPort}
              onChange={(e) => setNetPort(e.target.value)}
            />
          </td>
        </tr>
        <tr className='b1'>
          <td>
            <label>Tool Port:</label>
          </td>
        </tr>
        <tr>
          <td>
            <input
              className="form-control"
              type="text"
              value={ToolPort}
              onChange={(e) => setToolPort(e.target.value)}
            />
          </td>
        </tr>
        <tr className='b1'>
          <td>
            <label>Description:</label>
          </td>
        </tr>
        <tr className='b2'>
          <td>
            <textarea className="form-control" value={textarea} onChange={handleChange}  rows="6" cols="40"/>
          </td>
        </tr>
      </tbody>
      </table>
    </form>
   </>
  );
}
export default MapPopup;