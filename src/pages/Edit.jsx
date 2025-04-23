

import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const Edit = () => {
  const location = useLocation();
  const { imageUrl } = location.state || {};

  const [zoom, setZoom] = useState(1);
  const [annotations, setAnnotations] = useState([]);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const handleZoomIn = () => setZoom((z) => z + 0.1);
  const handleZoomOut = () => setZoom((z) => Math.max(0.2, z - 0.1));

  const handleAnnotate = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    const newAnnotation = {
      id: Date.now(),
      x,
      y,
      width: 50,
      height: 50,
      color: 'blue',
    };

    setAnnotations([...annotations, newAnnotation]);
  };
  const handleDeleteLast = () => {
    setAnnotations((prev) => prev.slice(0, -1));
  };
  
  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      annotations.forEach((a) => {
        ctx.strokeStyle = a.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(a.x, a.y, a.width, a.height);
      });

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'annotated-image.png';
      link.click();
    };
  };

  return (
    <>
   
    <div className="editContainer">
      <h2 className="imgHeading" >Image Annotation</h2>

      <div className="mainContent">
        <div
          className="imageBox"
          onClick={handleAnnotate}
          ref={containerRef}
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          <p className="annotationText">Your uploaded image will appear here</p>
          <div className="emptyBox">
            {imageUrl ? (
              <>
                <img
                  ref={imageRef}
                  src={imageUrl}
                  alt="Uploaded"
                  style={{
                    width: '100%',
                    height: '100%',
                    transform: `scale(${zoom})`,
                    transformOrigin: 'top left',
                    display: 'block',
                  }}
                />
                {annotations.map((a) => (
                  <div
                    key={a.id}
                    style={{
                      position: 'absolute',
                      left: `${a.x * zoom}px`,
                      top: `${a.y * zoom}px`,
                      width: `${a.width * zoom}px`,
                      height: `${a.height * zoom}px`,
                      border: `2px solid ${a.color}`,
                      boxSizing: 'border-box',
                      pointerEvents: 'none',
                    }}
                  />
                ))}
              </>
            ) : (
              <p>No image uploaded</p>
            )}
          </div>

          <div className="bottomButtons">
            <button onClick={handleZoomIn}>Zoom In</button>
            <button onClick={handleZoomOut}>Zoom Out</button>
            <button onClick={handleDownload}>Download</button>
          </div>
        </div>

        <div className="rightButtons">
          <button disabled>Annotate</button>
          <button disabled>Edit</button>
          <button onClick={() => handleDeleteLast()}>Delete</button>
</div>
      </div>
    </div>
    </>
  );
};

export default Edit;
