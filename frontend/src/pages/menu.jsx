import React, { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, animateScroll as scroll } from 'react-scroll';

function Menu() {
  const [showMenu, setShowMenu] = useState(false);
  const [menuBackground, setMenuBackground] = useState('transparent');

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const twentyPercentOfWindow = window.innerHeight * 0.2;

      if (scrollPosition >= twentyPercentOfWindow) {
        setMenuBackground('rgba(233, 236, 239, 0.836)');
      } else {
        setMenuBackground('transparent');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <div className='menu' style={{ backgroundColor: menuBackground, transition: 'background-color 0.5s ease' }}>
      <nav>
        <ul>
          <div className={showMenu ? 'bold-show' : 'bold'}>
          <a href="#" onClick={scrollToTop} className='nish'>&lt;Nish/&gt;</a>
            <button className='toggle-btn' onClick={toggleMenu}>
              <MenuIcon />
            </button>
          </div>
          <div className={showMenu ? 'show' : 'hide'}>
            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
            >
              <li>About</li>
            </Link>
            <Link
              to="projects"
              spy={true}
              smooth={true}
              duration={500}
            >
              <li>Projects</li>
            </Link>
            <li><a href="Nishant_CV.pdf" download>Resume</a></li>
            <Link
              to="skill"
              spy={true}
              smooth={true}
              duration={500}
            >
              <li>Skills</li>
            </Link>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
