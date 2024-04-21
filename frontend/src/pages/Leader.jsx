import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Leader() {
    return (
        <div className='leader'>
            <h1>Leadership</h1>
            <div className='leader-div'>
                <p>As a React developer with leadership experience, I bring technical expertise, project management skills, and strong communication abilities to the table. I have a proven track record of building large-scale applications, optimizing code for performance, and implementing best practices. Additionally, I have experience leading teams and projects, creating and maintaining project plans, managing timelines and budgets, and ensuring timely delivery of high-quality work. I excel at communicating effectively with team members, stakeholders, and clients, both verbally and in writing, and am a skilled listener who can provide clear and constructive feedback. I am also passionate about mentoring and training other developers to help them develop their skills and achieve their goals. With my ability to solve complex technical problems and think creatively, I am always up-to-date with the latest developments in React and related technologies, and am able to innovate and inspire a positive, collaborative work environment.</p>
                <Carousel autoPlay infiniteLoop showIndicators={false} showStatus={false} showThumbs={false} className='carousel1'>
                    <div className='carousel'>
                        <img src='leader1.webp' alt='image1' />
                    </div>
                    <div className='carousel'>
                        <img src='leader2.jpg' alt='image2' />
                    </div>
                    <div className='carousel'>
                        <img src='leader3.jpg' alt='image3' />
                    </div>
                    <div className='carousel'>
                        <img src='leader4.jpg' alt='image3' />
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default Leader;
