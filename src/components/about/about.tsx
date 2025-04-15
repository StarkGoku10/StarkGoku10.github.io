import React, { useState, useEffect } from 'react';
import './about.scss';


import shreyas1 from '../../assets/me/webp/shreyas1.webp';
import shreyas2 from '../../assets/me/webp/shreyas2.webp';
import shreyas3 from '../../assets/me/webp/shreyas3.webp';

const photos = [shreyas1, shreyas2, shreyas3];

const About: React.FC = () => {
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
    setPhoto(randomPhoto);
  }, []);

  return (
    <div className="about-container" id="about">
      <section className="about-intro">
        <div className="about-text">
        <h2 className="about-title">About Me</h2>
          <p>
            Hello! My name is <span className="cyan-text">Shreyas Acharya</span>. 
            I'm an aspiring <span className="cyan-text">Robotics Software Engineer</span> with a love for cutting edge technologies. I specialize in <span className="cyan-text">Machine Learning</span>, 
            <span className="cyan-text"> Multimodal AI</span>, <span className="cyan-text"> Perception </span> and <span className="cyan-text"> Planning</span> for Robotic Systems.
          </p>
          <p>
            I'm currently pursuing a <span className="cyan-text"> Master's in Robotics Engineering at University of Maryland, College Park. </span> 
          </p>
          <p>
            I am passionate about advancing the intelligent systems to bridge the gap between human cognition and machine capabilities. I am ambitious about 
            providing innovative solutions to solve real world problems in the field of <span className="cyan-text">AI </span> and <span className="cyan-text"> Robotics</span>.
          </p>
          <p>
            Previously, as a <span className="cyan-text">Machine Learning Engineer at techR</span>, I worked on a project that involved developing a <span className="cyan-text">real-time action recognition model </span>  
            to detect and classify over 400 distinct human actions and <span className="cyan-text">raise an alert</span> if an unusual activity is detected. 
          </p>
          <p>
           Outside of tech, I stay active by <span className="cyan-text">playing football</span> and <span className="cyan-text">working out</span>. 
           I'm also a huge fan of <span className="cyan-text">Motorsport</span>, particularly <span className="cyan-text">Formula 1</span>, often known as <span className="cyan-text">the Pinnacle of Motorsport</span>.
           I also unwind by listening to <span className="cyan-text">music</span> and watching <span className="cyan-text">movies</span> with friends
           or playing <span className="cyan-text">Open-world role-playing games</span>.
          </p>
        </div>
        <div className="about-photo">
          <img src={photo} alt="Shreyas Acharya" />
        </div>
      </section>

      
    </div>
  );
}

export default About;
