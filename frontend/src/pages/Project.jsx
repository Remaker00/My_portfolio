import React from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';

function Project() {
  return (
    <div className='projects'>
      <h1>Recent Projects</h1>
      <ul>
        <li>
          <h4>My Portfolio</h4>
          <div className='anchor'>
            <a href="#Live"><LanguageIcon />Live Project</a>
            <a href="https://github.com/Remaker00/My_portfolio"><GitHubIcon />Repo</a>
          </div>
          <div className='lang'>Languages: <span>javaScript:51.5%</span><span>CSS:45.3%</span><span>HTML:3%</span></div>
          <div className='stars'><GitHubIcon />Stars<span>updated on January 17,2024</span></div>
        </li>
        <li>
          <h4>Expense-Tracker</h4>
          <div className='anchor'>
            <a href="https://expense-tracker-91.vercel.app/"><LanguageIcon />Live Project</a>
            <a href="https://github.com/Remaker00/Expense-tracker-app"><GitHubIcon />Repo</a>
          </div>
          <div className='lang'>Languages: <span>javaScript:51.5%</span><span>CSS:45.3%</span><span>HTML:3%</span></div>
          <div className='stars'><GitHubIcon />Stars<span>updated on January 17,2024</span></div>
        </li>
        <li>
          <h4>Mail-Box Client</h4>
          <div className='anchor'>
            <a href="https://my-mail9.vercel.app/"><LanguageIcon />Live Project</a>
            <a href="https://github.com/Remaker00/MaiL-BoX"><GitHubIcon />Repo</a>
          </div>
          <div className='lang'>Languages: <span>javaScript:40.5%</span><span>CSS:30.3%</span><span>React:30%</span></div>
          <div className='stars'><GitHubIcon />Stars<span>updated on January 17,2024</span></div>
        </li>
        <li>
          <h4>E-commerce</h4>
          <div className='anchor'>
            <a href="https://e-commerce-zuwava.netlify.app/"><LanguageIcon />Live Project</a>
            <a href="https://github.com/Remaker00/E-commerce_Web"><GitHubIcon />Repo</a>
          </div>
          <div className='lang'>Languages: <span>javaScript:51.5%</span><span>CSS:45.3%</span><span>HTML:3%</span></div>
          <div className='stars'><GitHubIcon />Stars<span>updated on January 17,2024</span></div>
        </li>
      </ul>
    </div>
  )
}

export default Project
