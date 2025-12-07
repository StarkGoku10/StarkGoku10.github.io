import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';
import ParticleSphere from '../ParticleSphere/ParticleSphere'; // Import the new component

// Particle interface for 3D sphere animation
interface Particle {
  x: number;
  y: number;
  z: number; // Added Z coordinate for 3D
  vx: number;
  vy: number;
  vz: number; // Added Z velocity for 3D movement
  radius: number;
  color: string;
  opacity: number; // For fade effects
  originalTheta: number; // Spherical coordinates
  originalPhi: number;
  sphereRadius: number; // Distance from sphere center
}

// Main container for the hero section
const HeroContainer = styled.section`
  display: flex;
  flex-direction: column; /* Stack items vertically by default */
  min-height: 100vh; /* Full viewport height */
  background-color: #1e1e1e; /* Dark background */
  color: #fff; /* White text */
  overflow: hidden; /* Prevent overflow */
  font-family: 'RobotoMono', sans-serif; /* Use RobotoMono font */

  @media (min-width: 768px) {
    flex-direction: row; /* On larger screens, layout side by side */
  }
`;

// Left container for text and main title
const LeftContainer = styled.div`
  flex: 1; /* Take up equal space */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center text vertically */
  padding: 40px; /* Padding around the text */
  text-align: left; /* Left-align the text */
  margin-top: -10%; /* Adjust to move text slightly up */

  h1 {
    margin-bottom: 0; /* Remove default bottom margin from h1 */
  }

  @media (max-width: 768px) {
    padding-top: 0; /* Remove padding for smaller screens */
    margin-top: 0; /* Remove negative margin for mobile */
  }

  @media (min-width: 768px) {
    flex: 0 0 35%; /* Take up 35% of the space on larger screens */
  }
`;

// Right container for the particle animation
const RightContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center; /* Center the animation horizontally */
  align-items: center; /* Center the animation vertically */
  overflow: hidden;
  min-height: 50vh;

  @media (min-width: 768px) {
    flex: 0 0 65%;
  }
`;

// Canvas for particle system
const ParticleCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  cursor: crosshair;
`;

// Floating animation for the hero image
const floatAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

// Styling for the gradient text (title)
const GradientText = styled.h2`
  background: 
    linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 20%,
      rgba(255, 255, 255, 0.9) 50%,
      rgba(255, 255, 255, 0) 80%
    ) -200% 0 / 200% 100%,
    rgb(33, 223, 230); /* Base color is now a solid cyan */
  
  background-repeat: no-repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  font-size: 4em;
  font-weight: bold;
  margin: 0.2em 0 0.5em;

  &:hover {
    animation: shine 4s linear infinite;
  }

  @keyframes shine {
    from {
      background-position: 200% 0, 0 0;
    }
    to {
      background-position: -200% 0, 0 0;
    }
  }
`;

// Styling for the job seeking text
const JobSeekingText = styled.div`
  color: #fff;
  font-size: 0.96em;
  margin: -1.25em 0 1em 0;
  font-weight: bold;
`;

const HighlightedText = styled.span`
  color: rgb(33, 223, 230);
`;

// Styling for the reach out link
const ReachOutLink = styled.a`
  color:rgb(33, 223, 230);
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 1.5px; /* Reduced from 2px to 1.5px */
    bottom: -2px;
    left: 0;
    background-color:rgb(39, 227, 252);
    transition: width 0.3s ease;
  }
  
  &:hover {
    text-shadow: 0 0 5px rgb(80, 241, 233); /* Subtler glow effect */
    color: rgb(33, 223, 230);
    
    &::after {
      width: 100%; /* Full width underline on hover */
    }
  }
`;

// Styling for the typewriter effect text
const TypewriterText = styled.div`
  color:rgb(33, 223, 230); /* Light purple color */
  font-size: 1.5em; /* Medium font size */
  margin-top: 0.5em; /* Space above the text */
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden; /* Hide overflowing text */
`;

// Styling for the Resume button
const ResumeButton = styled.a`
  display: inline-block;
  padding: 8px 12px;
  max-width: 100px;
  text-align: center;
  margin-top: 20px;
  background: transparent;
  color: rgb(33, 223, 230);
  border: 2px solid rgb(33, 223, 230);
  border-radius: 5px;
  font-size: 1em;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(33, 223, 230, 0.1);
    box-shadow: 0 0 10px rgba(33, 223, 230, 0.5);
    transform: translateY(-4px);
  }
`;

// Main Hero component
const Hero: React.FC = () => {
  const [topLine, setTopLine] = useState('');
  const [currentText, setCurrentText] = useState('');
  const rightContainerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (rightContainerRef.current) {
      const rect = rightContainerRef.current.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition(null);
  };

  const topLines = [
    "You're finally awake. Let's explore my work.",
    "Interfacing reality with imagination — one model at a time.",
    "Not all heroes wear capes. Some fine-tune PyTorch models.",
    "Crafting intelligent systems, one adventure at a time.",
    "Greetings! I'm thrilled to have you here.",
    "This is the part where you scroll down and everything starts making sense.",
    "It's dangerous to go alone! Take this portfolio.",
    "I build things that see, think, and move — and they're all right here!",
    "It started with a passion for learning. It led here. Dive in.",
    "One portfolio to rule them all.",
  ]; // Array of possible headline texts

  const typewriterTexts = [
    "AI Research Engineer @ William Sonoma Inc.",
    "Software Engineer",
    "3D Vision Efficianado",
    "AI Enthusiast",
    "F1 Fanatic",
    "Part-time Athlete",
    "Gamer",
    "Home Chef",
  ]; // Array of texts for the typewriter effect

  useEffect(() => {
    // Pick a random top line for the header when the component mounts
    setTopLine(topLines[Math.floor(Math.random() * topLines.length)]);
  }, []);

  useEffect(() => {
    // Set the initial static text
    setCurrentText(typewriterTexts[0]);

    const typeWriter = () => {
      let i = 0;
      let textPos = typewriterTexts[0].length; // Start at the end of the first word
      let currentString = typewriterTexts[0];
      const speed = 100; // Typing speed
      const deleteSpeed = 50; // Deleting speed
      const initialWaitTime = 2000; // Time before deleting the first word
      const waitTime = 2000; // Time before deleting subsequent words

      // Function to handle typing the text
      function type() {
        setCurrentText(currentString.substring(0, textPos) + '_'); // Add typing cursor

        if (textPos++ === currentString.length) {
          setTimeout(() => deleteText(), waitTime); // Wait and start deleting
        } else {
          setTimeout(type, speed); // Continue typing
        }
      }

      // Function to handle deleting the text
      function deleteText() {
        setCurrentText(currentString.substring(0, textPos) + '_'); // Add typing cursor while deleting

        if (textPos-- === 0) {
          i = (i + 1) % typewriterTexts.length; // Cycle through text array
          currentString = typewriterTexts[i]; // Get next string
          setTimeout(type, speed); // Start typing again
        } else {
          setTimeout(deleteText, deleteSpeed); // Continue deleting
        }
      }

      // Start by deleting the first word after a delay
      setTimeout(() => deleteText(), initialWaitTime);
    };

    const timer = setTimeout(typeWriter, 4000); // Delay the start of the entire effect

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <HeroContainer>
      <LeftContainer
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} transition={{ duration: 0.5, delay: 1.5 }}>
          {topLine}
        </motion.h1>
        <motion.div variants={itemVariants} transition={{ duration: 0.8, delay: 0.5 }}>
          <GradientText>I'm Shreyas Acharya.</GradientText>
        </motion.div>
        <motion.div variants={itemVariants} transition={{ duration: 0.5, delay: 1.5 }}>
          <JobSeekingText>
            My playground is the intersection of <HighlightedText>Language</HighlightedText>, <HighlightedText>Vision</HighlightedText>, and <HighlightedText>Action</HighlightedText>. I'm driven to build Multimodal AI Systems that can perceive and interact with the world in new ways.
            <br /><br />
            Actively seeking full-time roles in Software Engineering, AI and Robotics for 2026.
            Feel free to <ReachOutLink href="https://www.linkedin.com/in/shreyas-acharya-10gma/" target="_blank" rel="noopener noreferrer">reach out</ReachOutLink> if you're looking for a passionate engineer to help build something amazing.
          </JobSeekingText>
        </motion.div>
        <motion.div variants={itemVariants} transition={{ duration: 0.5, delay: 2.2 }}>
          <TypewriterText>{currentText}</TypewriterText>
        </motion.div>
        <motion.div variants={itemVariants} transition={{ duration: 0.8, delay: 2.9 }}>
          <ResumeButton href="/resume/resume.pdf" target="_blank">
            My Resume
          </ResumeButton>
        </motion.div>
      </LeftContainer>
      <RightContainer
        ref={rightContainerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <ParticleSphere mousePosition={mousePosition} />
      </RightContainer>
    </HeroContainer>
  );
};

export default Hero;
