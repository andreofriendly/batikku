import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, useScroll, OrthographicCamera } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { Suspense } from 'react';
import Model from './Model.jsx';
import React, { useState, useEffect, useRef } from 'react';
import './Experience.css'


export default function Experience() {
  const [zoom, setZoom] = useState(150);
  const { pointer } = useThree();

  const MIN_ZOOM = 0;
  const MAX_ZOOM = 300;
  const [zoomSpeed, setZoomSpeed] = useState(0.025);

  const handleScroll = (event) => {
    event.preventDefault();

    const zoomFactor = 1 - event.deltaY * zoomSpeed;
    const newZoom = zoom * zoomFactor;
    const clampedZoom = Math.max(MIN_ZOOM, Math.min(newZoom, MAX_ZOOM));
    setZoom(clampedZoom);
  };

  const targetZoomRef = useRef(zoom);
  useEffect(() => {
    targetZoomRef.current = zoom;
  }, [zoom]);

  const updateZoom = () => {
    setZoom((prevZoom) => {
      const targetZoom = targetZoomRef.current;
      const difference = targetZoom - prevZoom;
      const delta = difference * smoothingFactor;
      return prevZoom + delta;
    });

    requestAnimationFrame(updateZoom);
  };

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const lastGrabPosition = useRef({ x: 0, y: 0 });
  const [grabLengthX, setGrabLengthX] = useState(0);
  const [grabLengthY, setGrabLengthY] = useState(0);
  const [smoothedGrabLengthX, setSmoothedGrabLengthX] = useState(0);
  const [smoothedGrabLengthY, setSmoothedGrabLengthY] = useState(0);
  const dampingFactor = 0.1;
  const smoothingFactor = 0.2;
  const maxPanningX = 200; // Maximum panning in the X-axis
  const maxPanningY = 200; // Maximum panning in the Y-axis

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isGrabbing) {
        const targetX = event.clientX;
        const targetY = event.clientY;

        const deltaX = targetX - lastGrabPosition.current.x;
        const deltaY = targetY - lastGrabPosition.current.y;

        setGrabLengthX((prevLengthX) => prevLengthX + deltaX * dampingFactor);
        setGrabLengthY((prevLengthY) => prevLengthY + deltaY * dampingFactor);

        lastGrabPosition.current.x = targetX;
        lastGrabPosition.current.y = targetY;
      }
    };

    const handleMouseDown = (event) => {
      setIsGrabbing(true);
      lastGrabPosition.current.x = event.clientX;
      lastGrabPosition.current.y = event.clientY;
    };

    const handleMouseUp = () => {
      setIsGrabbing(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isGrabbing]);

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: false });
    requestAnimationFrame(updateZoom);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  useFrame(() => {
    setSmoothedGrabLengthX((prevLengthX) => {
      const clampedLengthX = Math.max(-maxPanningX, Math.min(maxPanningX, prevLengthX + (grabLengthX - prevLengthX) * smoothingFactor));
      return clampedLengthX;
    });
    setSmoothedGrabLengthY((prevLengthY) => {
      const clampedLengthY = Math.max(-maxPanningY, Math.min(maxPanningY, prevLengthY + (grabLengthY - prevLengthY) * smoothingFactor));
      return clampedLengthY;
    });
  });

  return (
    
      <>
      
        <directionalLight castShadow position={[1, 2, 3]} intensity={0.5} />
        <ambientLight intensity={1} />

        <Suspense fallback={null}>
          <Model />
        </Suspense>

        <OrthographicCamera
          makeDefault
          position={[-smoothedGrabLengthX / 20, smoothedGrabLengthY / 20, 0]}
          zoom={100 + zoom / 2}
          rotation={[-Math.PI / 4, Math.atan(-1 / Math.sqrt(2)), 100]}
          near={-1000}
          far={1000}
          cursor={isGrabbing ? 'grabbing' : pointer.isHovered ? 'grab' : 'auto'}
        />
      </>
  );
}
