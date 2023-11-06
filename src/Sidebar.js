

import "./panel.css";

import { Background, Panel } from "reactflow";
import React, { useState ,useEffect} from "react";

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
      const url = "http://localhost:8080/Ethernet";
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const responseData = await response.json();
      
      // Filter the data by 'usage' field with 'yes' value
      const filteredData = responseData.filter(item => item.usage === 'no');
      
      // Sort the filtered data by the 'id' field in ascending order
      const sortedData = filteredData.sort((a, b) => a.id - b.id);

      setData(sortedData);
    } 
    catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    setTimeout(() => { 
      fetchData();
    }, 3000);
    // fetchData();
  });
  
  return (
    <>
  <div className="panel">
  <div style={{height:'50px', margin:'10px',textAlign:'center',marginBottom:'50px'}}>
    <h4 style={{fontFamily:'initial'}}>Available Interfaces</h4>
    <hr></hr>
    </div>
    <div>
		{data.map((data1) => (
        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, data1.id, data1.name, "default")}
          draggable
          key={data1.id}
        >
          {data1.name}
        </div>
      ))}
    </div>
  </div>
  </>
  );
};
