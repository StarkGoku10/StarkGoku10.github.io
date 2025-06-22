import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin, FaMedium, FaFileAlt } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

// Container for the entire social section
const SocialContainer = styled.div`
  width: 30%; /* Set the container width */
  margin: 100px auto; /* Center the container with auto margins */
  padding: 20px 20px 30px 20px; /* Padding around the container */
  background-color: #2e2e2e; /* Dark background color */
  border-radius: 10px; /* Rounded corners */
  text-align: center; /* Center the text inside the container */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
  font-family: 'RobotoMono', sans-serif; /* Use the RobotoMono font */

  /* Adjust container width on smaller screens */
  @media (max-width: 768px) {
    width: 80%; /* Increase width on mobile screens */
  }
`;

// Styled title for the social section
const SocialTitle = styled.h3`
  color: #fff; /* White text color */
  font-size: 1.5em; /* Font size for the title */
  margin-bottom: 10px; /* Space below the title */
  background: linear-gradient(90deg, #10fcf0,rgb(103, 225, 247)); /* Gradient effect on text */
  -webkit-background-clip: text; /* Clip background to the text */
  -webkit-text-fill-color: transparent; /* Make text transparent to reveal gradient */
`;

// Styled description text
const SocialDescription = styled.p`
  color: #d3d3d3; /* Light gray text color */
  margin-bottom: 20px; /* Space below the description */

  .highlight {
    color: #10fcf0; /* Highlighted purple color for important words */
  }
`;

// Container for the social icons
const SocialIcons = styled.div`
  display: flex; /* Use flexbox to layout the icons */
  justify-content: center; /* Center the icons horizontally */
  gap: 20px; /* Space between the icons */

  a {
    color: #d3d3d3; /* Default icon color (light gray) */
    font-size: 2em; /* Size of the icons */
    transition: color 0.3s, transform 0.3s; /* Smooth color transition on hover */

    &:hover {
      color: #10fcf0; /* Change icon color to purple on hover */
      transform: scale(1.2); /* Add pop-up effect on hover */
    }
  }
`;

// Main React component
const SocialLinks: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const iconContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.6,
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <SocialContainer id="social-links">
        <motion.div variants={itemVariants}>
          <SocialTitle>Let's Connect!</SocialTitle>
        </motion.div>
        <motion.div variants={itemVariants}>
          <SocialDescription>
           I'd love to connect and chat! Feel free to <span className="highlight">reach out to me!</span><br />Say Hello! 👋
          </SocialDescription>
        </motion.div>
        <motion.div variants={iconContainerVariants}>
          <SocialIcons>
            {/* Social media links with icons */}
            <motion.a href="https://www.linkedin.com/in/shreyas-acharya-10gma/" target="_blank" rel="noopener noreferrer" variants={iconVariants}><FaLinkedin /></motion.a>
            <motion.a href="https://github.com/StarkGoku10" target="_blank" rel="noopener noreferrer" variants={iconVariants}><FaGithub /></motion.a>
            <motion.a href="https://mail.google.com/mail/?view=cm&fs=1&to=shreyasacharya3000@gmail.com" target="_blank" rel="noopener noreferrer" variants={iconVariants}><SiGmail /></motion.a>
            <motion.a href="https://medium.com/@shreyasacharya3000" target="_blank" rel="noopener noreferrer" variants={iconVariants}><FaMedium /></motion.a>
            <motion.a href="/resume/resume.pdf" target="_blank" rel="noopener noreferrer" variants={iconVariants}><FaFileAlt /></motion.a>
          </SocialIcons>
        </motion.div>
      </SocialContainer>
    </motion.div>
  );
};

export default SocialLinks;
