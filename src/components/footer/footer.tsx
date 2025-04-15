import React from 'react';
import './footer.scss';
import { FaGithub, FaLinkedin, FaGlobe, FaMedium, FaFileAlt } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="left-align">
        <p>
          Designed by Me and Adapted from <a href="https://linkedin.com/in/timothy-klint" target="_blank" rel="noopener noreferrer" className="footer-link">Timothy Klint</a>.
        </p>
      </div>
      <div className="center-align">
        <p>&copy; Shreyas Acharya 2025</p>
      </div>
      <div className="right-align social-icons">
        <a href="https://www.linkedin.com/in/shreyas-acharya-10gma/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        <a href="https://github.com/StarkGoku10" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
        <a href="https://starkgoku10.github.io/" target="_blank" rel="noopener noreferrer"><FaGlobe /></a>
        <a href="https://medium.com/@shreyasacharya3000" target="_blank" rel="noopener noreferrer"><FaMedium /></a>
        <a href="/resume/resume.pdf" target="_blank" rel="noopener noreferrer"><FaFileAlt /></a>
      </div>
    </footer>
  );
};

export default Footer;
