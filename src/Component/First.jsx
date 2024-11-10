import React, { useState, useEffect, useRef } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { gsap } from 'gsap';
import TextBlock from './textblock.jsx';
import gamelanAudio from '../assets/gamelan.mp3';
import './first.css'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.log(error);
      });
    } else {
      audio.pause();
    }

    const elementToAnimate = document.getElementById('cloud');
    const elementToAnimate2 = document.getElementById('back');
    const elementToAnimate3 = document.getElementById('sejarahbatik');

    gsap.to(elementToAnimate, {
      x: () => gsap.utils.random(-2, 2) + '%',
      y: () => gsap.utils.random(-2, 2) + '%',
      duration: 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    gsap.to(elementToAnimate2, {
      x: () => gsap.utils.random(-2, 2) + '%',
      y: () => gsap.utils.random(-2, 2) + '%',
      duration: 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    gsap.to(elementToAnimate3, {
      x: () => gsap.utils.random(2, -2) + '%',
      y: () => gsap.utils.random(2, -2) + '%',
      duration: 1,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }, [isPlaying]);

  useEffect(() => {
    if (isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, [isFullScreen]);

  const handleCheckChange = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.log(error);
      });
    }

    setIsPlaying((prevState) => !prevState);
  };

  const handleFullScreenToggle = () => {
    setIsFullScreen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsFullScreen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const scrollToEnd = () => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    };

    if (isPlaying) {
      scrollToEnd();
    }
  }, [isPlaying]);

  return (
    <div className="app-container">
      <div className='button'>
        <button onClick={() => navigate('/search')}>Cari Batik</button>
        <button onClick={() => navigate('/exhibition')}>Virtual Exhibition</button>
      </div>
      <div className="audio-controls">
        <div className="check-button">
          <label>
            <input
              type="checkbox"
              checked={isPlaying}
              onChange={handleCheckChange}
            />
            {isPlaying ? 'Pause Audio' : 'Play Audio'}
          </label>
        </div>
        <div className="fullscreen-button">
          <label>
            <input
              type="checkbox"
              checked={isFullScreen}
              onChange={handleFullScreenToggle}
            />
            {isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </label>
        </div>
      </div>

      <audio ref={audioRef} src={gamelanAudio} loop />

      <Parallax pages={2} style={{ top: '0', left: '0' }} className="animation">
        <ParallaxLayer offset={0} speed={1}>
          <div className="animation_layer parallax" id="back"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={2.5}>
          <div className="animation_layer parallax" id="down"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={3}>
          <div className="animation_layer parallax" id="temple"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={2}>
          <div className="animation_layer2 parallax" id="cloud"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={2.5}>
          <div className="animation_layer parallax" id="down"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.7}>
          <TextBlock />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.5}>
          <div className="animation_layer2 parallax" id="sejarahbatik"></div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}

export default Home;
