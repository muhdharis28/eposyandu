import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Stats from './Stats';
import Schedule from './Schedule';
import Documentation from './Documentation';
import Footer from './Footer';

const Homepage = () => {
  return (
    <>
      <Header />
      <Hero />
      <Stats />
      <Schedule />
      <Documentation />
      <Footer />
    </>
  );
};

export default Homepage;
