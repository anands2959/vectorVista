import React, { useEffect } from 'react';

function About() {
  useEffect(() => {
    window.location.href = 'https://anandsharma.info';
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center bg-black">
      <div className="text-white text-xl">Redirecting to Developer Portfolio...</div>
    </div>
  );
}

export default About;
