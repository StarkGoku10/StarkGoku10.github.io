import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaGlobe } from 'react-icons/fa';
import { FaRepeat } from 'react-icons/fa6';
import { PiCubeFocusFill } from 'react-icons/pi';
import { SiPython, SiPytorch, SiHuggingface, SiGooglegemini, SiOpencv, SiOpenai, SiNumpy, SiScipy,
  SiTensorflow, SiKeras, SiScikitlearn, SiMeta, SiReact, SiTypescript, SiNodedotjs} from 'react-icons/si';

// Importing assets for project GIFs
import mllmtcGif from '../../assets/projects/MLLMTC.gif';
import sfmGif from '../../assets/projects/Sfm.gif';
import homographyGif from '../../assets/projects/homography.gif';
import pbliteGif from '../../assets/projects/pblite.gif'; 
import portfolioGif from '../../assets/projects/portfolio.gif';
import touch3dGif from '../../assets/projects/touch3d.gif';
import tetrisGif from '../../assets/projects/projectgif.gif';
import './projects.scss';

// Reusable component to animate items as they come into view
const AnimatedItem = ({ children, customWidth = '100%' }: { children: React.ReactNode; customWidth?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
      style={{ width: customWidth, display: 'flex', justifyContent: 'center' }}
    >
      {children}
    </motion.div>
  );
};

// Keyframes for the pop-up animation
const popAnimation = keyframes`
  0%, 100% {
    transform: scale(1.0);
  }
  50% {
    transform: scale(1.15);
  }
`;

const AnimatedTryItOutLink = styled.a`
  /* Inherit all link styles and add the animation */
  color: rgb(26, 186, 207);
  font-size: 1.3em;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  animation: ${popAnimation} 1.5s ease-in-out infinite;

  &:hover {
    color: rgb(38, 212, 235);
    animation-play-state: paused; /* Pause the animation on hover */
  }
`;

// Main container for all projects, handles layout and styling
const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column; /* Stack projects vertically */
  align-items: center; /* Center all content horizontally */
  color: #fff; /* White text color */
  font-family: 'RobotoMono', sans-serif;
  padding: 0 10px; /* Padding for horizontal content */
  overflow-x: hidden; /* Prevent horizontal scrolling */
  overflow-y: hidden; /* Prevent vertical scrolling during animation */
  width: 80%; /* Set container width */
  margin: 0 auto; /* Center the container */
`;

// Title for the projects section
const SectionTitle = styled.h2`
  font-size: 2.7em; /* Large font size for section title */
  margin: 0;
  white-space: nowrap;
`;

const MotionSectionTitle = motion(SectionTitle);

// Container for big projects, aligns them vertically
const BigProjectsContainer = styled.div`
  display: flex;
  flex-direction: column; /* Stack big projects vertically */
  align-items: center; /* Center content horizontally */
  width: 100%; /* Full width for the big projects container */
`;

// Container for individual projects, handles layout and background styling
const ProjectContainer = styled.div`
  width: 90%; /* Full width for individual projects */
  margin-bottom: 30px; /* Space below each project */
  background: rgba(0, 0, 0, 0.6); /* Semi-transparent dark background */
  border-radius: 15px; /* Rounded corners */
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

  /* Target the specific GIF to adjust its position */
  .mllm-gif {
    object-position: center 68%; /* Adjusts the vertical focus up from the bottom */
  }

  /* Style for project titles */
  h3 {
    font-size: 1.7em; /* Large font for project titles */
    margin-bottom: 5px; /* Space below the title */
    z-index: 1; /* Ensure the title is above the background media */
    position: relative; /* Keep relative positioning for z-index */
  }

  /* Style for project description text */
  p {
    font-size: 1.2em; /* Medium size for description */
    margin-bottom: 5px; /* Space below the description */
    z-index: 1; /* Ensure text is above the media */
    position: relative; /* Keep relative positioning */
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
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
  width: 93%; /* Full width for the small projects container */
`;

// Container for individual small projects
const SmallProject = styled.div`
  width: 100%; /* Fill the animation wrapper */
  margin-bottom: 25px; /* Space below each small project */
  background: rgba(0, 0, 0, 0.6); /* Semi-transparent dark background */
  border-radius: 10px; /* Rounded corners */
  padding: 15px; /* Padding around the content */
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
    font-size: 1.4em; /* Smaller font for small project titles */
    margin-bottom: 5px; /* Space below the title */
    z-index: 1; /* Ensure title is above the background media */
    position: relative; /* Keep relative positioning */
  }

  /* Style for small project description text */
  p {
    font-size: 1em; /* Smaller font size for description */
    margin-bottom: 15px; /* Space below the description */
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


const NoteworthyProjectTile = styled(SmallProject)`
  display: flex;
  flex-direction: column;
  justify-content: center; /* Vertically center content */
  align-items: center; /* Horizontally center content */

  h3 {
    font-size: 1.8em; /* Increase font size */
    margin-bottom: 25px; /* Add space below the title */
  }

  /* Ensure the absolutely positioned image doesn't interfere */
  img {
    opacity: 0.2;
  }

  a {
    font-size: 1.2em; /* Increase font size for the link */
  }
`;

const Projects: React.FC = () => {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 });

  const titleContainerVariants = {
    hidden: {},
    visible: {},
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 1.2, ease: 'easeOut', delay: 0.5 } },
  };

  return (
    <ProjectsContainer id="projects">
      <motion.div
        ref={titleRef}
        className="projects-title-container"
        variants={titleContainerVariants}
        initial="hidden"
        animate={isTitleInView ? 'visible' : 'hidden'}
      >
        <MotionSectionTitle variants={titleVariants}>Projects</MotionSectionTitle>
        <div className="projects-title-line">
          <motion.div className="line" variants={lineVariants} />
        </div>
      </motion.div>
      <BigProjectsContainer>
        <AnimatedItem>
          <ProjectContainer>
            <img src={touch3dGif} alt="Touch-3D" loading="lazy" />
            <h3>Touch3D: Tactile-Based Object Reconstruction using Deep Reinforcement Learning</h3>
            <p>An active tactile exploration pipeline driven by Reinforcement Learning(PPO) for object 3D reconstruction using a tactile sensor, achieving over 95% 
              reconstruction(coverage) on objects with complex geometries.
            </p>
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
                <FaRepeat />
                <span>Stable-Baselines3</span>
              </TechStackItem>
              <TechStackItem>
                <PiCubeFocusFill />
                <span>Open3D</span>
              </TechStackItem>
              <TechStackItem>
                <SiPython />
                <span>PyBullet</span>
              </TechStackItem>
              <TechStackItem>
                <SiMeta />
                <span>Tacto Sensor</span>
              </TechStackItem>
            </TechStackContainer>
            <div className="links">
              <a href="https://github.com/StarkGoku10/Touch3D.git" target="_blank" rel="noopener noreferrer">
                <FaGithub /> See on GitHub
              </a>
            </div>
          </ProjectContainer>
        </AnimatedItem>
        <AnimatedItem>
          <ProjectContainer>
            <img src={mllmtcGif} alt="MLLM-TC" className="mllm-gif" loading="lazy" />
            <h3>Evaluating Temporal Coherence in Multimodal Foundation Models for Video Understanding</h3>
            <p>A comprehensive framework for evaluating temporal coherence in multimodal foundation models for video-language tasks,
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
            </div>
          </ProjectContainer>
        </AnimatedItem>
        <AnimatedItem>
          <ProjectContainer>
            <img src={sfmGif} alt="Structure from Motion Project" loading="lazy" />
            <h3> Multiview Structure from Motion</h3>
            <p>An end-to-end pipeline for reconstructing a scene from a set of continuous images featuring fundamental computer vision concepts
              like feature matching, pose estimation triangulation and bundle adjustment featuring synthetic and real world datasets.

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
        </AnimatedItem>
      </BigProjectsContainer>

      <SmallProjectsContainer>
        <AnimatedItem customWidth="45%">
          <SmallProject>
            <img src={pbliteGif} alt="Pb-lite Edge Detection" loading="lazy" />
            <h3>Pb-Lite Edge Detection</h3>
            <p>An efficient edge detection framework inspired by advanced contour detection. It finds edges by examining 
              brightness, color, and texture information across multiple scales to give an accurate edge detection on images of any quality and format.
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
              <AnimatedTryItOutLink href="https://edge-detection-using-pblite.streamlit.app/" target="_blank" rel="noopener noreferrer">
                <FaGlobe /> Try it Out
              </AnimatedTryItOutLink>
            </div>
          </SmallProject>
        </AnimatedItem>
        <AnimatedItem customWidth="45%">
          <SmallProject>
            <img src={homographyGif} alt="Homography-Net Project" loading="lazy" />
            <h3>Homography-Net: A Deep Learning model for Homography Estimation</h3>
            <p>A deep learning model for estimating homography from a pair of images, featuring a synthetic panorama stitching pipeline
            and custom deep learning architecture, reducing the reprojection error by 68%.
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
        </AnimatedItem>
        <AnimatedItem customWidth="45%">
          <SmallProject>
            <img src={portfolioGif} alt="Portfolio" loading="lazy" />
            <h3>My Portfolio Website</h3>
            <p>An immersive portfolio website built with React, TypeScript, and styled-components to showcase my projects and skills.</p>
            <TechStackContainer>
              <TechStackItem>
                <SiReact />
                <span>React</span>
              </TechStackItem>
              <TechStackItem>
                <SiTypescript />
                <span>TypeScript</span>
              </TechStackItem>
              <TechStackItem>
                <SiNodedotjs />
                <span>Node.js</span>
              </TechStackItem>
            </TechStackContainer>
            <div className="links">
              <a href="https://starkgoku10.github.io/" target="_blank" rel="noopener noreferrer">
                <FaGithub /> See on GitHub
              </a>
            </div>
          </SmallProject>
        </AnimatedItem>
        <AnimatedItem customWidth="45%">
          <NoteworthyProjectTile>
            <img src={tetrisGif} alt="Noteworthy Projects" loading="lazy" />
            <h3>Other Noteworthy Projects</h3>
            <div className="links">
              <a href="https://github.com/StarkGoku10?tab=repositories" target="_blank" rel="noopener noreferrer"><FaGithub /> Check it out!!</a>
            </div>
          </NoteworthyProjectTile>
        </AnimatedItem>
      </SmallProjectsContainer>
    </ProjectsContainer>
  );
};

export default Projects;
