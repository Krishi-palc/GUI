import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import MapPopup from './MapPopup';
import FilterPopup from './FilterPopup';

const Example = (props) => {
  const [key, setKey] = useState('general');
  // console.log("Node Id in Tab : "+props.nodeId);
  return (
 
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-1"
    >
    <Tab eventKey="general" title="General">
        <MapPopup nodeId={props.nodeId}/>
      </Tab>
      <Tab eventKey="filter" title="Filter">
        <FilterPopup nodeId={props.nodeId}/>
      </Tab>
      </Tabs>
    
  );
};

export default Example;