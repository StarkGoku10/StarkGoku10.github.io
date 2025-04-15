import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaGlobe } from 'react-icons/fa';
import { SiPython, SiPytorch, SiHuggingface, SiGooglegemini, SiOpencv, SiOpenai, SiNumpy, SiScipy,
  SiTensorflow, SiKeras, SiScikitlearn, SiOnnx, SiFlask } from 'react-icons/si';

// Importing assets for project GIFs
import mllmtcGif from '../../assets/projects/MLLMTC.gif';
import sfmGif from '../../assets/projects/Sfm.gif';
import homographyGif from '../../assets/projects/homography.gif';
import pbliteGif from '../../assets/projects/pblite.gif'; 
import portfolioGif from '../../assets/projects/portfolio.gif';

// Main container for all projects, handles layout and styling
const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column; /* Stack projects vertically */
  align-items: center; /* Center all content horizontally */
  color: #fff; /* White text color */
  font-family: 'RobotoMono', sans-serif;
  padding: 0 10px; /* Padding for horizontal content */
  overflow-x: hidden; /* Prevent horizontal scrolling */
  width: 80%; /* Set container width */
  margin: 0 auto; /* Center the container */
`;

// Title for the projects section
const SectionTitle = styled.h2`
  font-size: 2.5em; /* Large font size for section title */
  margin-bottom: 20px; /* Space below the title */
  text-align: left; /* Align text to the left */
  width: 100%; /* Take up full width of the container */
  box-sizing: border-box; /* Include padding and borders in width calculation */
`;

// Container for big projects, aligns them vertically
const BigProjectsContainer = styled.div`
  display: flex;
  flex-direction: column; /* Stack big projects vertically */
  align-items: center; /* Center content horizontally */
  width: 100%; /* Full width for the big projects container */
`;

// Container for individual projects, handles layout and background styling
const ProjectContainer = styled.div`
  width: 100%; /* Full width for individual projects */
  margin-bottom: 40px; /* Space below each project */
  background: rgba(0, 0, 0, 0.6); /* Semi-transparent dark background */
  border-radius: 10px; /* Rounded corners */
  padding: 20px; /* Padding around the project content */
  text-align: center; /* Center the text inside the project */
  position: relative; /* Relative positioning for background media */
  overflow: hidden; /* Ensure no content overflows outside the box */

  /* Style for project images or videos */
  img, video {
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    border-radius: 10px; /* Rounded corners for the media */
    object-fit: cover; /* Cover the area without distortion */
    position: absolute; /* Position absolutely within the container */
    top: 0;
    left: 0;
    z-index: 0; /* Place the image or video behind text */
    opacity: 0.3; /* Semi-transparent to not overpower the text */
  }

  /* Style for project titles */
  h3 {
    font-size: 2em; /* Large font for project titles */
    margin-bottom: 10px; /* Space below the title */
    z-index: 1; /* Ensure the title is above the background media */
    position: relative; /* Keep relative positioning for z-index */
  }

  /* Style for project description text */
  p {
    font-size: 1.2em; /* Medium size for description */
    margin-bottom: 20px; /* Space below the description */
    z-index: 1; /* Ensure text is above the media */
    position: relative; /* Keep relative positioning */
  }

  /* Style for the links section */
  .links {
    z-index: 1; /* Ensure links are above the background media */
    position: relative; /* Relative positioning for z-index control */
    display: flex; /* Use flexbox for layout */
    justify-content: center; /* Center the links */
    gap: 20px; /* Space between links */
  }

  /* Style for individual links */
  a {
    color:rgb(26, 186, 207); /* Purple color for links */
    font-size: 1.2em; /* Font size for links */
    display: flex; /* Flex layout for link icon and text */
    align-items: center; /* Center icon and text vertically */
    gap: 8px; /* Space between icon and text */
    text-decoration: none; /* Remove underline from links */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7); /* Add text shadow for visibility */

    /* Hover state for links */
    &:hover {
      color:rgb(38, 212, 235); /* Lighten the link color on hover */
    }
  }

  /* Responsive styles for small screens */
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
    padding: 10px;
  }
`;

// Container for small projects, wraps them and spaces them out
const SmallProjectsContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow the projects to wrap to new rows */
  justify-content: space-between; /* Space projects out evenly */
  width: 100%; /* Full width for the small projects container */
`;

// Container for individual small projects
const SmallProject = styled.div`
  width: 45%; /* Width for small projects (45% allows 2 per row) */
  margin-bottom: 40px; /* Space below each small project */
  background: rgba(0, 0, 0, 0.6); /* Semi-transparent dark background */
  border-radius: 10px; /* Rounded corners */
  padding: 20px; /* Padding around the content */
  text-align: center; /* Center text inside the project */
  position: relative; /* Relative positioning for background media */
  overflow: hidden; /* Prevent overflow outside the project box */

  /* Style for project images or videos */
  img, video {
    width: 100%; /* Full width for media */
    height: 100%; /* Full height for media */
    border-radius: 10px; /* Rounded corners for the media */
    object-fit: cover; /* Cover the area without distortion */
    position: absolute; /* Position the media absolutely */
    top: 0;
    left: 0;
    z-index: 0; /* Place the media behind the text */
    opacity: 0.3; /* Semi-transparent to not overpower text */
  }

  /* Style for small project titles */
  h3 {
    font-size: 1.5em; /* Smaller font for small project titles */
    margin-bottom: 10px; /* Space below the title */
    z-index: 1; /* Ensure title is above the background media */
    position: relative; /* Keep relative positioning */
  }

  /* Style for small project description text */
  p {
    font-size: 1em; /* Smaller font size for description */
    margin-bottom: 20px; /* Space below the description */
    z-index: 1; /* Ensure text is above the background media */
    position: relative; /* Keep relative positioning */
  }

  /* Style for links in small projects */
  .links {
    z-index: 1; /* Ensure links are above background media */
    position: relative; /* Relative positioning for z-index control */
    display: flex; /* Use flexbox for layout */
    justify-content: center; /* Center the links */
    gap: 20px; /* Space between the links */
  }

  /* Style for individual links */
  a {
    color:rgb(26, 186, 207); /* cyan color for links */
    font-size: 1em; /* Smaller font size for links */
    display: flex; /* Flex layout for icon and text */
    align-items: center; /* Align icon and text vertically */
    gap: 8px; /* Space between icon and text */
    text-decoration: none; /* Remove underline */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7); /* Text shadow for visibility */

    /* Hover state for links */
    &:hover {
      color:rgb(38, 212, 235); /* Lighten link color on hover */
    }
  }

  /* Responsive styles for different screen sizes */
  @media (max-width: 1250px) {
    width: 45%; /* Maintain two columns on medium screens */
  }

  @media (max-width: 968px) {
    width: 43%; /* Adjust slightly on smaller screens */
  }

  @media (max-width: 768px) {
    width: 100%; /* Full width for small screens */
    margin: 0 auto 20px auto; /* Center and space out projects */
  }
`;

// Styling for tech stack container
const TechStackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin: 15px 0;
  z-index: 1;
  position: relative;
`;

// Styling for individual tech stack item
const TechStackItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  
  &:hover {
    svg {
      transform: scale(1.2);
      color: #01AFAF;
      transition: all 0.3s ease;
    }
    
    span {
      transform: scale(1.1);
      color: #01AFAF;
      transition: all 0.3s ease 0.1s;
    }
  }
  
  svg {
    font-size: 2em;
    color: #fff;
    transition: all 0.3s ease;
  }
  
  span {
    font-size: 0.8em;
    color: #fff;
    transition: all 0.3s ease;
  }
`;

// Handle the "Coming Soon" click event
const handleComingSoonClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  event.preventDefault(); /* Prevent the default link behavior */
  alert('Coming soon!'); /* Show an alert when clicked */
};

const Projects: React.FC = () => {
  return (
    <ProjectsContainer id="projects">
      <SectionTitle>Projects</SectionTitle>
      <BigProjectsContainer>
        <ProjectContainer>
          <img src={mllmtcGif} alt="MLLM-TC" />
          <h3>Evaluating Temporal Coherence in Multimodal Foundation Models for Video Understanding</h3>
          <p>A comprehensive framework for evaluating temporal coherence in multimodal foundation models,
             featuring novel metrics like CLIPGain and BERTScore, tested on benchmarks such as TOMATO and MSR-VTT.</p>
          <TechStackContainer>
            <TechStackItem>
              <SiPython />
              <span>Python</span>
            </TechStackItem>
            <TechStackItem>
              <SiPytorch />
              <span>PyTorch</span>
            </TechStackItem>
            <TechStackItem>
              <SiHuggingface />
              <span>HuggingFace</span>
            </TechStackItem>
            <TechStackItem>
              <SiGooglegemini />
              <span>Google Gemini</span>
            </TechStackItem>
            <TechStackItem>
              <SiOpenai />
              <span>OpenAI</span>
            </TechStackItem>            
          </TechStackContainer>
          <div className="links">
            <a href="https://github.com/StarkGoku10/Video-Temporal-Consistency-Analysis.git" target="_blank" rel="noopener noreferrer">
              <FaGithub /> See on GitHub
            </a>
            {/* <a href="#" onClick={handleComingSoonClick}>
              <FaGlobe /> Try it Out
            </a> */}
          </div>
        </ProjectContainer>
        <ProjectContainer>
          <img src={sfmGif} alt="Structure from Motion Project" />
          <h3> Multiview structure from motion</h3>
          <p>A comprehensive pipeline designed to resonctruct 3D point clouds from a set of continuous images of a scene featuring 
            fundamental concepts like feature matching, triangulation, and bundle adjustment.
          </p>
          <TechStackContainer>
            <TechStackItem>
              <SiPython />
              <span>Python</span>
            </TechStackItem>
            <TechStackItem>
              <SiOpencv/>
              <span>OpenCV</span>
            </TechStackItem>
            <TechStackItem>
              <SiNumpy />
              <span>Numpy</span>
            </TechStackItem>
            <TechStackItem>
              <SiScipy />
              <span>SciPy</span>
            </TechStackItem>
          </TechStackContainer>
          <div className="links">
            <a href="https://github.com/StarkGoku10/Multiview-Structure-From-Motion.git" target="_blank" rel="noopener noreferrer">
              <FaGithub /> See on GitHub
            </a>
          </div>
        </ProjectContainer>
      </BigProjectsContainer>

      <SmallProjectsContainer>
        <SmallProject>
          <img src={homographyGif} alt="Homography-Net Project" />
          <h3>Homography-Net: A Deep Learning Approach to Homography Estimation</h3>
          <p>A deep learning model for estimating homography matrices from a pair of images, 
            featuring a synthetic panorama stitching pipeline and custom deep learning architecture
          </p>
          <TechStackContainer>
            <TechStackItem>
              <SiPython />
              <span>Python</span>
            </TechStackItem>
            <TechStackItem>
              <SiTensorflow />
              <span>TensorFlow</span>
            </TechStackItem>
            <TechStackItem>
              <SiNumpy />
              <span>Numpy</span>
            </TechStackItem>
            <TechStackItem>
              <SiKeras />
              <span>Keras</span>
            </TechStackItem>
            
          </TechStackContainer>
          <div className="links">
            <a href="https://github.com/StarkGoku10/Homography-Net.git" target="_blank" rel="noopener noreferrer">
              <FaGithub /> See on GitHub
            </a>
            {/* <a href="#" onClick={handleComingSoonClick}>
              <FaGlobe /> Try it Out
            </a> */}
          </div>
        </SmallProject>
        <SmallProject>
          <img src={pbliteGif} alt="Pb-lite Edge Detection" />
          <h3>Pb-Lite Edge Detection</h3>
          <p>An efficient edge detection framework inspired by advanced contour detection techniques. It finds boundaries by examining 
            brightness, color, and texture information across multiple scales
          </p>
          <TechStackContainer>
            <TechStackItem>
              <SiPython />
              <span>Python</span>
            </TechStackItem>
            <TechStackItem>
              <SiTensorflow />
              <span>Tensorflow</span>
            </TechStackItem>
            <TechStackItem>
              <SiScikitlearn />
              <span>Scikit-learn</span>
            </TechStackItem>
            <TechStackItem>
              <SiScipy />
              <span>SciPy</span>
            </TechStackItem>
          </TechStackContainer>
          <div className="links">
            <a href="https://github.com/StarkGoku10/Pb_lite_Edgedetection.git" target="_blank" rel="noopener noreferrer">
              <FaGithub /> See on GitHub
            </a>
            {/* <a href="https://tjklint.github.io" onClick={handleComingSoonClick}>
              <FaGlobe /> You're already here!
            </a> */}
          </div>
        </SmallProject>
        <SmallProject>
          <img src={portfolioGif} alt="Portfolio" />
          <h3>More Projects Coming Soon...</h3>
          <p>Stay tuned!</p>
          <div className="links">
            <a href="https://github.com/StarkGoku10" target="_blank" rel="noopener noreferrer">
              <FaGithub /> See on GitHub
            </a>
            {/* <a href="https://tjklint.com" target="_blank" rel="noopener noreferrer">
              <FaGlobe /> Try it Out
            </a> */}
          </div>
        </SmallProject>
      </SmallProjectsContainer>
    </ProjectsContainer>
  );
};

export default Projects;
