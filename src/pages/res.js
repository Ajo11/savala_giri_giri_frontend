import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

export default function Res() {
  const location = useLocation();
  const navigate = useNavigate();

  const { results, imageURL } = location.state || {};

  const [pops, setPops] = useState([]);
  const ringCount = results?.ring_count ?? 0;

  useEffect(() => {
    if (!results) {
      navigate("/");
      return;
    }

    // Play audio if available
    if (results.final_audio_data) {
      const audioSrc = `data:audio/mp3;base64,${results.final_audio_data}`;
      const audio = new Audio(audioSrc);
      audio.play();
    }
    // --- Sync pops to audio ---
    const startDelay = 1500; // delay before pops start
    const beatInterval = 100; // ms between pops

    const popTimeout = setTimeout(() => {
      let ringIndex = 0;
      const interval = setInterval(() => {
        if (ringIndex < ringCount) {
          triggerPop(ringIndex);
          ringIndex++;
        } else {
          clearInterval(interval);
        }
      }, beatInterval);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(popTimeout);
  }, [results, ringCount, navigate]);

  const triggerPop = (ringIndex) => {
    const id = Date.now() + Math.random();
    const onionRadius = 200; // Half of onion image size (400px)
    const margin = 40; // px, so memes don't touch the edge
    const maxDistance = onionRadius - margin;
    const angle = Math.random() * 2 * Math.PI;
    const x = Math.cos(angle) * maxDistance;
    const y = Math.sin(angle) * maxDistance;
    const newPop = { id, x, y };
    setPops((prev) => [...prev, newPop]);
    setTimeout(() => {
      setPops((prev) => prev.filter((p) => p.id !== id));
    }, 1000);
  };

  if (!results) {
    return null;
  }

  return (
    <div className="results-panel">
      <div className="onion-counter-wrapper" style={{ position: "relative" }}>
        <img
          src={imageURL}
          alt="Onion cross section"
          className="onion-slice-image"
        />
        {pops.map((pop) => (
          <img
            key={pop.id}
            src="/images/pop.webp"
            alt="pop meme"
            className="pop-img"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) translate(${pop.x}px, ${pop.y}px)`
            }}
          />
        ))}
      </div>
      <p className="ring-label">Counter rings</p>
      <p className="ring-count">{ringCount}</p>
    </div>
  );
}
