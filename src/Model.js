import React from 'react';
import "./Model.css"
import { Button } from 'react-bootstrap';

import Tab from "./Tab";

function Modal({close}) {
    return (
        <div className="modal">
            <div className="modal_container">
                <div className='modal_close' onClick={()=>close(false)}>&times;</div>
                <div className="modal_title">
                    <h4 style={{fontFamily:'initial',fontWeight:'bold'}}>Dynamic Filter</h4>
                </div> 
                <div className="modal_content">
                    <Tab/>
                </div>
                <div className="modal_footer">
                   <button className='my-button'>Save</button>
                </div>
            </div>
        </div>
    );
}
export default Modal;