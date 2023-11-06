import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import MapPopup from './MapPopup';
import FilterPopup from './FilterPopup';

const Example = () => {
  const [key, setKey] = useState('general');
  return (
 
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-1"
    >


      
    <Tab eventKey="general" title="General">
        <MapPopup/>
      </Tab>
      <Tab eventKey="filter" title="Filter">
        <FilterPopup/>
      </Tab>
      </Tabs>
    
  );
};

export default Example;