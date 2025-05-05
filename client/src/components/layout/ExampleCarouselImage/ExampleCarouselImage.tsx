import React from 'react';

const ExampleCarouselImage: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div style={{ height: '300px', backgroundColor: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {text}
    </div>
  );
};

export default ExampleCarouselImage;
