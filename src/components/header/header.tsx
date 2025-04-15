import React, { useState, useEffect } from 'react';
import { FaHome, FaUser, FaCode, FaFileAlt, FaBars, FaTimes, FaGithub, FaStar, FaCodeBranch, FaEnvelope } from 'react-icons/fa';
import styled from 'styled-components';
import './header.scss';

// Custom hook to track scroll direction
const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [prevOffset, setPrevOffset] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const toggleScrollDirection = () => {
      const currentOffset = window.pageYOffset;
      const isScrollingUp = prevOffset > currentOffset;
      
      if (currentOffset < 10) {
        setVisible(true);
      } else if (Math.abs(currentOffset - prevOffset) > 5) {
        setScrollDirection(isScrollingUp ? "up" : "down");
        setVisible(isScrollingUp);
      }

      setPrevOffset(currentOffset);
    };

    window.addEventListener("scroll", toggleScrollDirection);
    return () => window.removeEventListener("scroll", toggleScrollDirection);
  }, [prevOffset]);

  return visible;
};

const HeaderContainer = styled.header<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #1e1e1e;
  padding: 20px 40px;
  transform: translateY(${props => props.visible ? '0' : '-100%'});
  transition: transform 0.3s ease-in-out;
  box-shadow: ${props => props.visible ? '0 2px 10px rgba(0, 0, 0, 0.3)' : 'none'};
`;

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isVisible = useScrollDirection();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const section = document.getElementById(target);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <HeaderContainer visible={isVisible} className="header-container">
      <a href="#home" className="logo" onClick={(e) => handleClick(e, 'home')}>
        <div className="superman-logo"></div>
      </a>
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes size={30} className="close-icon" /> : <FaBars size={30} />}
      </div>
      <nav className={`nav ${isOpen ? 'open' : ''}`}>
        <a href="#home" className="nav-link" onClick={(e) => handleClick(e, 'home')}>
          <FaHome />
          Home
        </a>
        <a href="#about" className="nav-link" onClick={(e) => handleClick(e, 'about')}>
          <FaUser />
          About
        </a>
        <a href="#projects" className="nav-link" onClick={(e) => handleClick(e, 'projects')}>
          <FaCode />
          Projects
        </a>
        <a href="#resume" className="nav-link" onClick={(e) => handleClick(e, 'resume')}>
          <FaFileAlt />
          Education
        </a>
        <a href="#contact" className="nav-link" onClick={(e) => handleClick(e, 'social-links')}>
          <FaEnvelope />
          Contact
        </a>
        <a
          className="button"
          href="https://github.com/StarkGoku10"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(false)}
        >
          <FaStar />
          {`or\u00A0`}
          <FaCodeBranch />
        </a>
      </nav>
    </HeaderContainer>
  );
};

export default Header;
