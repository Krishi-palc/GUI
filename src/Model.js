import Tab  from "./Tab";
import React, { useState} from "react";
function Modal({close, nodeId, onDelete}) {
    const [activeTab, setActiveTab] = useState('general');

    const handleTabChange = (tab) => {
      setActiveTab(tab);
      console.log(activeTab);
    };
    return (
        <div className="modal">
            <div className="modal_container">
                <div className='modal_close' onClick={()=>close(false)}>&times;</div>
                <div className="modal_title">
                    <h4>Dynamic Filter</h4>
                </div>
                <div className="modal_content">
                    <Tab nodeId={nodeId} onTabChange={handleTabChange}/>
                </div>
                <div className="modal_footer">
                    {/* <button className='my-button' onClick={() => onDelete(nodeId)}>Delete</button> */}
                    {activeTab === 'general' && ( <button className="my-button" onClick={() => onDelete(nodeId)}>
                        Delete
                    </button>)}
                    {activeTab === 'filter' && ( <button className="my-button" onClick={() => console.log('Save')}>
                        Save
                     </button>)}
                    
                </div>
            </div>
        </div>
    );
}  
export default Modal;