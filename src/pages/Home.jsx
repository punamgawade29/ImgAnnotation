


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Bloom from '../assets/Bloom.png';

const Home = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); 
        
        navigate('/edit', { state: { imageUrl: reader.result } });
      };
      reader.readAsDataURL(file);
    }
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '1px',
    fontSize: '30px',
    marginLeft: '40px',
  };

  const subheadingStyle = {
    textAlign: 'center',
    color: '#777',
    fontSize: '18px',
    marginTop: '30px',
    marginLeft: '30px',
  };

  return (
    <>
      <div className="annolog">
        <div className="homeimg">
          <img src={Bloom} alt="Bloom" />
        </div>

        <h2 style={headingStyle}>Annotate Images Instantly</h2>
        <h4 style={subheadingStyle}>100% Free, Easy & Accurate — Just Like That!</h4>

        <div className="upload-img">
          <h2>Upload Your File</h2>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            hidden
            accept="image/*"
          />
          <label htmlFor="fileInput" className="upload-btn">
            Upload
          </label>
        </div>

        {imagePreview && (
          <div className="image-preview-container">
            <h3>Image Preview</h3>
            <img
              src={imagePreview}
              alt="Preview"
              className="image-preview"
              style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
