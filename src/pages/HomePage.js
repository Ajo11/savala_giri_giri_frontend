import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


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
      const response = await fetch('http://127.0.0.1:8000/api/process-onion/', {
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
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213E 100%)'
      }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '2.5rem',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '2rem',
          textAlign: 'center',
          background: 'linear-gradient(45deg, #00ffcc, #00ccff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '700'
        }}>Savala Giri Giri</h1>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem'
        }}>
          <img 
            src="/onion-icon.png" 
            alt="Onion Icon" 
            style={{
              width: '120px',
              height: '120px',
              animation: 'bounce 2s infinite'
            }}
          />

          {isLoading ? (
            <div style={{
              textAlign: 'center'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '4px solid rgba(0, 255, 204, 0.1)',
                borderTopColor: '#00ffcc',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 1rem'
              }}></div>
              <p style={{
                color: '#00ffcc',
                fontSize: '1.2rem'
              }}>Giri giri giri... Counting layers...</p>
            </div>
          ) : (
            <>
              <label htmlFor="upload-input" style={{
                background: 'linear-gradient(45deg, #00ffcc, #00ccff)',
                color: '#1a1a2e',
                padding: '1rem 2rem',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: '600',
                transition: 'transform 0.2s ease',
                display: 'inline-block',
                hover: {
                  transform: 'scale(1.05)'
                }
              }}>
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
      </div>
    </main>
  );
}

export default HomePage;
