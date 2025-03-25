import React from 'react';
import Lottie from 'lottie-react';

import groovyWalkAnimation from './message.json';

const LottieMessageAnimation = () => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{ width: '200px', height: '200px' }}>
      <Lottie animationData={groovyWalkAnimation} loop />
    </div>
  </div>
);

export default LottieMessageAnimation;
