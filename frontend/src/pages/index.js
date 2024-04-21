import React from 'react';
import Menu from './menu';
import Intro from './Intro';
import About from './About';
import Exp from './Exp';
import Project from './Project';
import Leader from './Leader';
import Skills from './Skills';
import Contact from './Contact';

function index() {
  return (
    <div>
      <Menu />
      <Intro />
      <About />
      <Exp />
      <Project />
      <Leader />
      <Skills />
      <Contact />
    </div>
  )
}

export default index
