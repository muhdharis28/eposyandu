import React, { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import Stats from './Stats';
import Schedule from './Schedule';
import Documentation from './Documentation';
import Footer from './Footer';
import FloatingFilterDropdown from './FloatingFilterDropdown';

const Homepage = () => {
  const [selectedPosyandu, setSelectedPosyandu] = useState('');

  const handleFilterChange = (posyanduId) => {
    setSelectedPosyandu(posyanduId);
  };

  return (
    <>
      <Header />
      <Hero />
      <Stats selectedPosyandu={selectedPosyandu} />
      <Schedule selectedPosyandu={selectedPosyandu} />
      <Documentation selectedPosyandu={selectedPosyandu} />
      <Footer />
      <FloatingFilterDropdown onFilterChange={handleFilterChange} />
    </>
  );
};

export default Homepage;
