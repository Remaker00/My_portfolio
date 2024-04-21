import React, { useState } from 'react';

function Skills() {
  const [showTechSkills, setShowTechSkills] = useState(true);

  const handleTechnicalClick = () => {
    setShowTechSkills(true);
  }

  const handleSoftClick = () => {
    setShowTechSkills(false);
  }

  return (
    <div className='skill'>
      <h1>Skills</h1>
      <div className='skill-button'>
        <button onClick={handleTechnicalClick}>Tech Skill</button>
        <button onClick={handleSoftClick}>Soft Skill</button>
      </div>

      {showTechSkills ? (
        <div className='tech-skill'>
          <div className='tech-skill1'>ReactJS
            <div><progress value="80" max="100"></progress></div>
          </div>
          <div className='tech-skill1'>HTML/CSS
            <div><progress value="90" max="100"></progress></div>
          </div>
          <div className='tech-skill1'>JavaScript
            <div><progress value="80" max="100"></progress></div>
          </div>
          <div className='tech-skill1'>Data Structure
            <div><progress value="90" max="100"></progress></div>
          </div>
          <div className='tech-skill1'>MongoDB
            <div><progress value="95" max="100"></progress></div>
          </div>
          <div className='tech-skill1'>MySQL
            <div><progress value="95" max="100"></progress></div>
          </div>
        </div>
      ) : (
        <div className='tech-skill'>
          <div className='tech-skill1'>Goal-Oriented
            <div><progress value="90" max="100"></progress></div>
          </div>
          <div className='tech-skill1'>Positivity
            <div><progress value="85" max="100"></progress></div>
          </div>
          <div className='tech-skill1'>Adaptability
            <div><progress value="80" max="100"></progress></div>
          </div>
          <div className='tech-skill1'>Problem Solving
            <div><progress value="80" max="100"></progress></div>
          </div>
          <div className='tech-skill1'>Organization
            <div><progress value="80" max="100"></progress></div>
          </div>
          <div className='tech-skill1'>Creativity
            <div><progress value="80" max="100"></progress></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Skills;
