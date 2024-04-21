import React, { useState, useEffect } from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link, animateScroll as scroll } from 'react-scroll';

function Intro() {
    const [displayText, setDisplayText] = useState('');

    const introStyle = {
        background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        backgroundSize: '400% 400%',
        animation: 'gradient 10s ease infinite',
        height: '100vh',
    };

    useEffect(() => {
        const text = "Passionate about changing the world with technology.";
        let index = 0;
        const intervalId = setInterval(() => {
            setDisplayText(text.substring(0, index + 1));
            index++;
            if (index === text.length) clearInterval(intervalId);
        }, 100); // Adjust the interval duration as needed
    }, []);


    return (
        <div className='intro-container' style={introStyle}>
            <h1>Nishant Sourav</h1>
            <p>{displayText}</p>
            <div className='icons'>
                <a href="https://github.com/Remaker00"><GitHubIcon /></a>
                <a href="https://facebook.com/your-profile"><FacebookIcon /></a>
                <a href="https://instagram.com/your-profile"><InstagramIcon /></a>
                <a href="https://www.linkedin.com/in/nishant-sourav-bb5b02269/"><LinkedInIcon /></a>
            </div>
            <Link
                to="about"
                spy={true}
                smooth={true}
                duration={500}
            >
                <button>More about me</button>
            </Link>

        </div>
    )
}

export default Intro;
