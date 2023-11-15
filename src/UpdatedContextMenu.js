// UpdatedContextMenu.js
import React from "react";
import "./ContextMenu.css";

const UpdatedContextMenu = ({ right, onClick }) => {
  const handleDelete = () => {
    // Implement deletion logic here
    onClick(); // Close the context menu after deletion
  };

  return (
    <div className="context-menu" style={{ position: 'absolute' }}>
      {right && (
        <div>
          <div onClick={handleDelete}>Delete</div>
        </div>
      )}
    </div>
  );
};

export default UpdatedContextMenu;
