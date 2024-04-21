import React from 'react';

function About() {
  return (
    <div className='about'>
      <img src='pic.png' alt='Profile photo' />
      <div className='about-info'>
        <h1>About Me</h1>
        <p>My name is Nishant Sourav. I’m a post-graduate of 2023 from Sir M. Visvesvaraya Institute Of Technology at Bangalore with a degree in Bachelor of Electrical & Electronic's Engineering. I'm most passionate about giving back to the community, and my goal is to pursue this passion within the field of software engineering. In my free time I like working on open source projects.</p>
        <button><a href="Nishant_CV.pdf" download>Resume</a></button>
      </div>
    </div>
  )
}

export default About
