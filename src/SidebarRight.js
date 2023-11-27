import "./panel.css";
 
import { Background, Panel } from "reactflow";
import React, { useState ,useEffect} from "react";
import url1 from "./url1";
 
export default () => {
  const [data, setData] = useState([]);
 
  const onDragStart = (event, id, name, nodeType) => {
    console.log(name);
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("id", id);
    event.dataTransfer.setData("name", name);
    event.dataTransfer.effectAllowed = "move";
  };
 
  const fetchData = async () => {
    try {
      const url = `${url1}/Map`;
      const response = await fetch(url);
 
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
     
      const responseData = await response.json();
      const sortedData = responseData.sort((a, b) => a.id - b.id);
    //   console.log(sortedData);
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
  });
 
  return (
  <>
    <div className="panel">
     
      <div id="a1">
        <h4 id='a2'>Available Maps</h4>
      </div>
      <div className="panel1">
        <div id="r">
          {data.map((data1) => (
            <div
              className="dndnode" id="r1"
              onDragStart={(event) => onDragStart(event, data1.id, data1.description, "default")}
              key={data1.id}
              draggable
            >
              {data1.description}
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
  );
};