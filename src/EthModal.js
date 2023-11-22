import React from 'react';
import "./Model.css"
import EthPopup from './EthPopup';

function EthModal({close , nodeId}) {
    // console.log("Nodes: "+nodes);
    
    return (
        <div className="modal">
            <div className="modal_container">
                <div className='modal_close' onClick={()=>close(false)}>&times;</div>
                <div className="modal_title">
                    <h4>Ethernet</h4>
                </div> 
                <div className="modal_content">
                   <EthPopup/>
                </div>
                <div className="modal_footer">
                   <button className='my-button'>Save</button>
                </div>
            </div>
        </div>
    );
}
export default EthModal;