import React, { useEffect, useState } from 'react';
import "./styles.css";
 
const LoadingPage = () => {
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);
 
    return () => {
      // Clear the timeout to avoid memory leaks
      clearTimeout(timeoutId);
    };
  }, []); // Empty dependency array means the effect runs once on mount
 
  return (
    <div>
      {loading ? (
        <div id="yourDiv" className="loading-screen" >
            <h1 id="style" className="loading-text">Loading...</h1>
          {/* You can add a loading spinner or any other content here */}
        </div>
      ) : (
        // Redirect or transition to the main content
        <div>
          {/* Your main content goes here */}
        </div>
      )}
    </div>
  );
};
 
export default LoadingPage;