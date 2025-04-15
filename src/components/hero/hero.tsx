import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Thirdeye from '../../assets/Thirdeye/webp/Thirdeye.gif'; // Importing hero animation image

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

  @media (max-width: 768px) {
    padding-top: 0; /* Remove padding for smaller screens */
    margin-top: 0; /* Remove negative margin for mobile */
  }

  @media (min-width: 768px) {
    flex: 0 0 35%; /* Take up 35% of the space on larger screens */
  }
`;

// Right container for the hero animation
const RightContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center; /* Center the hero animation horizontally */
  align-items: center; /* Center the hero animation vertically */
  overflow: hidden;
  min-height: 50vh;

  @media (min-width: 768px) {
    flex: 0 0 65%;
  }
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

// Styling for the hero image with floating animation
const HeroImage = styled.img`
  width: 80%;
  z-index: 1;
  animation: ${floatAnimation} 3s infinite;

  @media (min-width: 768px) {
    width: 50%;
  }
`;

// Animation for shrinking and moving shapes
const shrinkAndMove = (left: number, top: number, containerWidth: number, containerHeight: number) => keyframes`
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(${containerWidth / 2 - left}px, ${containerHeight / 2 - top}px) scale(0);
    opacity: 0;
  }
`;

// Define shape types as a constant
const shapeTypes = ['circle', 'triangle', 'square', 'cross'] as const;
type ShapeType = typeof shapeTypes[number];

// Base shape props interface
interface ShapeBaseProps {
  left: number;
  top: number;
  size: number;
  containerWidth: number;
  containerHeight: number;
}

// Base shape styling with animation
const Shape = styled.div<ShapeBaseProps>`
  position: absolute;
  border: 2px solid rgb(33, 223, 230);
  background: transparent;
  opacity: 0.9;

  ${({ left, top, size, containerWidth, containerHeight }) => css`
    width: ${size}px;
    height: ${size}px;
    left: ${left}px;
    top: ${top}px;
    animation: ${shrinkAndMove(left, top, containerWidth, containerHeight)} 2s linear forwards;
  `}
`;

const Circle = styled(Shape)`
  border-radius: 50%;
`;

const Triangle = styled(Shape)`
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  width: ${props => props.size * 1.2}px;
  height: ${props => props.size * 1.2}px;
`;

const Square = styled(Shape)`
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
`;

const Cross = styled(Shape)`
  clip-path: polygon(
    40% 0%, 60% 0%, 60% 40%, 100% 40%, 100% 60%, 60% 60%, 60% 100%, 40% 100%, 40% 60%, 0% 60%, 0% 40%, 40% 40%
  );
  transform: rotate(45deg) scale(1.2);
`;

// Styling for the gradient text (title)
const GradientText = styled.h2`
  background: linear-gradient(90deg,rgb(17, 206, 206),rgb(110, 255, 255)); /* cyan gradient */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 4em;
  font-weight: bold;
  margin: 0.5em 0;
`;

// Styling for the job seeking text
const JobSeekingText = styled.div`
  color: #fff;
  font-size: 0.95em;
  margin: -1.25em 0 1em 0;
  font-weight: bold;
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
    transform: translateY(-2px);
  }
`;

// Interface for shape properties
interface ShapeProps extends ShapeBaseProps {
  id: string;
  type: ShapeType;
}

// Main Hero component
const Hero: React.FC = () => {
  const [shapes, setShapes] = useState<ShapeProps[]>([]);
  const [topLine, setTopLine] = useState('');
  const [currentText, setCurrentText] = useState('');
  const rightContainerRef = useRef<HTMLDivElement>(null);

  const topLines = [
    "You're finally awake. Let's explore my work.",
    "Interfacing reality with imagination — one model at a time.",
    "Not all heroes wear capes. Some fine-tune PyTorch models.",
    "Crafting intelligent systems, one adventure at a time.",
    "Greetings! I'm thrilled to have you here.",
    "This is the part where you scroll down and everything starts making sense.",
    "It's dangerous to go alone! Take this portfolio.",
    "I build things that see, think, and move — and they’re all right here!",
    "It started with a passion for learning. It led here. Dive in.",
    "One portfolio to rule them all.",

  ]; // Array of possible headline texts

  const typewriterTexts = [
    "ML Engineer",
    "Robotics Software Engineer",
    "Ex-MLE Intern @ techR Business Solutions ",
    "AI Enthusiast",
    "F1 Fanatic",
    "Part-time Body Builder",
    "Gamer",
    "Home Chef",
  ]; // Array of texts for the typewriter effect

  useEffect(() => {
    // Pick a random top line for the header when the component mounts
    setTopLine(topLines[Math.floor(Math.random() * topLines.length)]);
  }, []);

  useEffect(() => {
    // Typewriter effect
    const typeWriter = () => {
      let i = 0;
      let textPos = 0;
      let currentString = typewriterTexts[i];
      const speed = 100; // Typing speed
      const deleteSpeed = 50; // Deleting speed
      const waitTime = 2000; // Time before deleting starts

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

      type(); // Start the typewriter effect
    };

    typeWriter(); // Invoke the typewriter function on component mount
  }, []);

  useEffect(() => {
    // Create new shapes every 200 milliseconds for the hero animation
    const interval = setInterval(() => {
      if (rightContainerRef.current) {
        const containerWidth = rightContainerRef.current.clientWidth;
        const containerHeight = rightContainerRef.current.clientHeight;

        const newShapes: ShapeProps[] = Array.from({ length: 6 }).map(() => {
          const isVerticalEdge = Math.random() > 0.5;
          const left = isVerticalEdge 
            ? (Math.random() > 0.5 ? 0 : containerWidth - 10)
            : Math.random() * containerWidth;

          const top = !isVerticalEdge 
            ? (Math.random() > 0.5 ? 0 : containerHeight - 10)
            : Math.random() * containerHeight;

          const randomType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];

          return {
            id: `${Date.now()}-${Math.random()}`,
            type: randomType,
            left,
            top,
            size: Math.random() * 20 + 10,
            containerWidth,
            containerHeight,
          };
        });

        setShapes(prevShapes => [...prevShapes, ...newShapes]);

        // Remove shapes after animation completes
        setTimeout(() => {
          setShapes(prevShapes =>
            prevShapes.filter(shape => !newShapes.some(newShape => newShape.id === shape.id))
          );
        }, 1500);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [rightContainerRef]);

  return (
    <HeroContainer>
      <LeftContainer>
        <h1>{topLine}</h1>
        <GradientText>I'm Shreyas Acharya.</GradientText>
        <JobSeekingText>
          Currently looking for full-time roles in Robot Computer Vision and Machine Learning starting June 2025. 
          Please feel free to <ReachOutLink href="https://www.linkedin.com/in/shreyas-acharya-10gma/" target="_blank" rel="noopener noreferrer">reach out</ReachOutLink> if you think I'd be a good fit for your organization.
        </JobSeekingText>
        <TypewriterText>{currentText}</TypewriterText>
        <ResumeButton 
          href="/resume/resume.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Resume
        </ResumeButton>
      </LeftContainer>
      <RightContainer ref={rightContainerRef}>
        <HeroImage src={Thirdeye} alt="Hero Animation" />
        {shapes.map(shape => {
          switch (shape.type) {
            case 'circle':
              return <Circle key={shape.id} {...shape} />;
            case 'triangle':
              return <Triangle key={shape.id} {...shape} />;
            case 'square':
              return <Square key={shape.id} {...shape} />;
            case 'cross':
              return <Cross key={shape.id} {...shape} />;
            default:
              return null;
          }
        })}
      </RightContainer>
    </HeroContainer>
  );
};

export default Hero;
