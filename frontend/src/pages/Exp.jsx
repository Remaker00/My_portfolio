import React from 'react'

function Exp() {
  return (
    <div className='experience'>
      <h1>Education</h1>
      <ul>
        <l1 className='exp-items'>
          <img src='sharpener.png' alt='sharpener' />
          <p>Full-Stack Developer</p>
          <p>May 2023 - February 2024</p>
        </l1>
        <l1 className='exp-items'>
          <img src='mvit.png' alt='college' />
          <p>Electrical & Electronics Engineer</p>
          <p>Aug 2019 - Apr 2023</p>
        </l1>
        <l1 className='exp-items'>
          <img src='school.webp' alt='college' />
          <p>10th & 12th</p>
          <p>old</p>
        </l1>
      </ul>
    </div>
  )
}

export default Exp
