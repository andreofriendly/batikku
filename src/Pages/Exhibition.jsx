import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from '../Component/Experience';
import React from 'react';

const root = ReactDOM.createRoot(document.querySelector('#root'));

const Exhibition = () => (
  <Canvas shadows>
    <Experience />
  </Canvas>
);

export default Exhibition;
