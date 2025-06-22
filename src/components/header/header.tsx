import React, { useState, useEffect, useRef } from 'react';
import { FaHome, FaUser, FaCode, FaFileAlt, FaBars, FaTimes, FaStar, FaCodeBranch, FaEnvelope } from 'react-icons/fa';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import './header.scss';

// Custom hook to track scroll direction
const useScrollDirection = () => {
  const [visible, setVisible] = useState(true);
  const prevScrollY = useRef(window.pageYOffset);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const prevY = prevScrollY.current;

      // Threshold to avoid jittery behavior on small scrolls
      if (Math.abs(currentScrollY - prevY) <= 5) {
        return;
      }

      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY > prevY) { // Scrolling down
        setVisible(false);
      } else { // Scrolling up
        setVisible(true);
      }
      
      // Update ref for next scroll event
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return visible;
};

const MotionHeaderContainer = styled(motion.header)<{ visible: boolean }>`
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
  display: flex;
  justify-content: space-between;
  align-items: center;
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

  const headerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 1.5,
        staggerChildren: 0.1,
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const logoChildrenVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
      }
    },
  };

  const navItemVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <MotionHeaderContainer
      visible={isVisible}
      className="header-container"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.a 
        href="#home" 
        className="logo" 
        onClick={(e) => handleClick(e, 'home')} 
        variants={logoVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="superman-logo"
          variants={{
            visible: { transition: { staggerChildren: 0.4 } },
          }}
        >
          <motion.div className="logo-pentagon" variants={logoChildrenVariants} />
          <motion.div className="logo-s" variants={logoChildrenVariants}>S</motion.div>
        </motion.div>
      </motion.a>
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes size={30} className="close-icon" /> : <FaBars size={30} />}
      </div>
      <motion.nav className={`nav ${isOpen ? 'open' : ''}`}>
        <motion.a href="#home" className="nav-link" onClick={(e) => handleClick(e, 'home')} variants={navItemVariants}>
          <FaHome />
          Home
        </motion.a>
        <motion.a href="#about" className="nav-link" onClick={(e) => handleClick(e, 'about')} variants={navItemVariants}>
          <FaUser />
          About
        </motion.a>
        <motion.a href="#projects" className="nav-link" onClick={(e) => handleClick(e, 'projects')} variants={navItemVariants}>
          <FaCode />
          Projects
        </motion.a>
        <motion.a href="#resume" className="nav-link" onClick={(e) => handleClick(e, 'resume')} variants={navItemVariants}>
          <FaFileAlt />
          Experience
        </motion.a>
        <motion.a href="#contact" className="nav-link" onClick={(e) => handleClick(e, 'social-links')} variants={navItemVariants}>
          <FaEnvelope />
          Contact
        </motion.a>
        <motion.a
          className="button"
          href="https://github.com/StarkGoku10"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(false)}
          variants={navItemVariants}
        >
          <FaStar />
          {`or\u00A0`}
          <FaCodeBranch />
        </motion.a>
      </motion.nav>
    </MotionHeaderContainer>
  );
};

export default Header;
