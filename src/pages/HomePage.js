import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Make sure the CSS file is imported

function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      processImage(file);
    }
  };

  const processImage = async (imageFile) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      const response = await fetch(process.env.backendUrl+'/api/process-onion/', { // Using Docker proxy path
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      navigate('/results', {
        state: {
          results: data,
          imageURL: URL.createObjectURL(imageFile)
        }
      });
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Could not connect to the backend. Is it running?");
      setIsLoading(false);
    }
  };

  return (
    <main className="home-container">
      <div className="glass-card">
        <h1>Savala Giri Giri</h1>

        <div className="content-wrapper">
          <img 
            src="/onion-icon.png" 
            alt="Onion Icon" 
            className="onion-icon"
          />

          {isLoading ? (
            <div className="loader-container">
              <div className="spinner"></div>
              <p className="loading-text">Giri giri giri... Counting layers...</p>
            </div>
          ) : (
            <>
              <label htmlFor="upload-input" className="upload-btn-styled">
                📷 Choose Onion Image
              </label>
              <input 
                id="upload-input" 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                disabled={isLoading} 
                hidden
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default HomePage;