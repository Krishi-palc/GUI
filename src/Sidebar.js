import "./panel.css";
 
import { Background, Panel } from "reactflow";
import React, { useState ,useEffect} from "react";
import url1 from "./url1";
 
export default () => {
  const [data, setData] = useState([]);
 
  const onDragStart = (event, id, name, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("id", id);
    event.dataTransfer.setData("name", name);
    event.dataTransfer.effectAllowed = "move";
  };
 
  const fetchData = async () => {
    try {
      // const url = "https://my-json-server.typicode.com/rajkumar-palc/api/ethernet";
      // const url = "http://localhost:2000/api/ethernets";
      const url = `${url1}/Ethernet`;
      const response = await fetch(url);
 
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
     
      const responseData = await response.json();
     
      // Filter the data by 'usage' field with 'yes' value
      // const filteredData = responseData.filter(item => item.usage === 'no');
     
      // Sort the filtered data by the 'id' field in ascending order
      // const sortedData = filteredData.sort((a, b) => a.id - b.id);
      const sortedData = responseData.sort((a, b) => a.id - b.id);
 
      setData(sortedData);
    }
    catch (error) {
      console.error(error);
    }
  };
 
  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1500);
    // fetchData();
  });
 
  return (
  <>
    <div className="panel">
     
      <div id="a1">
        <h4 id='a2'>Available Interfaces</h4>
        <hr></hr>
      </div>
 
      <div className="panel1">
        <div>
          {data.map((data1) => (
            <div
              className="dndnode"
              onDragStart={(event) => onDragStart(event, data1.id, data1.name, "default")}
              key={data1.id}
              draggable
             
            >
              {data1.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
  );
};