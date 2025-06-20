import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useInView } from 'framer-motion';
import './resume.scss';

const underline = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`;

const underlineReverse = keyframes`
  from { transform: scaleX(1); }
  to { transform: scaleX(0); }
`;

const HoverText = styled.span`
  position: relative;
  display: inline-block;
  transition: color 0.3s ease;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: #10fcf0;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease-out;
  }

  &:hover {
    color: #10fcf0; // Matched Cyan color
    &::after {
      transform: scaleX(1);
    }
  }
`;

const Resume: React.FC = () => {
  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const isExperienceInView = useInView(experienceRef, { once: true, amount: 0.2 });
  const isEducationInView = useInView(educationRef, { once: true, amount: 0.2 });

  // Variants for main section container
  const sectionVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.4 } },
  };

  // Variants for title elements
  const titleVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };
  const decorativeLineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.7, ease: 'easeOut', delay: 0.3 } },
  };

  // Variants for the timeline itself
  const timelineLineVariants = {
    hidden: { scaleY: 0 },
    visible: { scaleY: 1, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  // Stagger the job containers themselves
  const jobListVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.6, delayChildren: 0.6 } },
  };

  // Stagger the contents within each job container
  const jobContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  // Variants for individual pieces of content
  const timelineTickVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };
  const jobContentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };
  
  // Simplified variants for education section
  const educationListVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3, delayChildren: 0.8 } },
  };

  return (
    <div className="resume-container" id="resume">
      <div className="content-wrapper">
        <div className="left-column">
          {/* --- Experience Section --- */}
          <motion.div 
            className="section-container" 
            ref={experienceRef}
            variants={sectionVariants}
            initial="hidden"
            animate={isExperienceInView ? 'visible' : 'hidden'}
          >
            <motion.div className="section-title-container" variants={titleVariants}>
              <h1 className="section-title">Experience</h1>
              <motion.div className="title-line" variants={decorativeLineVariants}>
                <div className="line from-right"></div>
              </motion.div>
            </motion.div>

            <div className="line-container">
              <motion.div className="timeline-line" variants={timelineLineVariants} />
              <motion.div variants={jobListVariants}>
                {/* Job 1 */}
                <motion.div className="job-container" variants={jobContainerVariants}>
                  <motion.div className="timeline-tick" variants={timelineTickVariants} />
                  <motion.h3 className="job-title" variants={jobContentVariants}>
                    <HoverText>Graduate Research Assistant</HoverText> <span className="company">@ PRG Lab at UMD, College Park</span>
                  </motion.h3>
                  <motion.p className="job-dates" variants={jobContentVariants}>January 2024 - June 2024</motion.p>
                  <motion.ul variants={jobContentVariants}>
                    <li className="bullet-point">
                    Developed an end-to-end Deep Reinforcement Learning agent for 3D object reconstruction using tactile sensing, achieving 95% surface coverage (IoU) 
                    on unseen objects through a novel CNN-based policy network and temporal tactile stacking approach.
                    </li>
                    <li className="bullet-point">
                    Engineered a sophisticated reward structure combining area maximization with exploration bonuses, resulting in 85%+ average IoU across diverse
                    objects with complex geometries demonstrating strong generalization capabilities and system's robustness in real-world applications.
                    </li>
                    <li className="bullet-point">
                    Implemented the 3D reconstruction pipeline using PyBullet and TACTO simulation environments, reducing exploration steps by 40% through optimized action space design and early termination conditions,
                    while maintaining high reconstruction quality and enabling efficient tactile exploration in visually challenging environments.
                    </li>
                  </motion.ul>
                </motion.div>

                {/* Job 2 */}
                <motion.div className="job-container" variants={jobContainerVariants}>
                  <motion.div className="timeline-tick" variants={timelineTickVariants} />
                  <motion.h3 className="job-title" variants={jobContentVariants}>
                    <HoverText>Software Engineer</HoverText> <span className="company">@ techR Business Solutions</span>
                  </motion.h3>
                  <motion.p className="job-dates" variants={jobContentVariants}>June 2022 - July 2023</motion.p>
                  <motion.ul variants={jobContentVariants}>
                    <li className="bullet-point">
                    Architected and deployed a real-time Human Activity Recognition system  with optimized ONNX model and 
                    16-frame temporal window analysis, reducing false positive alerts by 35% for automated monitoring.
                    </li>
                    <li className="bullet-point">
                    Engineered a hybrid multi-threaded application architecture combining Kivy desktop GUI with Flask web interface and WebSocket communication,
                    enabling concurrent real-time video monitoring and cross-platform monitoring while reducing system latency by 25%.
                    </li>
                    <li className="bullet-point">
                    Developed an intelligent action detection pipeline with context-aware alert mechanisms, incorporating temporal analysis and smart triggering logic
                    that improved detection accuracy by 28% over baseline models, enabling real-time intervention capabilities for fall detection systems.
                    </li>
                  </motion.ul>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* --- Education Section --- */}
          <motion.div 
            className="section-container" 
            ref={educationRef}
            variants={sectionVariants}
            initial="hidden"
            animate={isEducationInView ? 'visible' : 'hidden'}
          >
            <motion.div className="section-title-container" variants={titleVariants}>
              <h1 className="section-title">Education</h1>
              <motion.div className="title-line" variants={decorativeLineVariants}>
                <div className="line"></div>
              </motion.div>
            </motion.div>
            <div 
              className="line-container"
            >
              <motion.div className="timeline-line" variants={timelineLineVariants} />
              <motion.div 
                initial="hidden"
                animate={isEducationInView ? 'visible' : 'hidden'}
                variants={educationListVariants}
              >
                {/* Education Entry 1 */}
                <motion.div className="job-container" variants={jobContentVariants}>
                  <motion.div className="timeline-tick" variants={timelineTickVariants} />
                  <h3 className="job-title">
                    <HoverText>Master of Engineering in Robotics</HoverText> <span className="company">@ University of Maryland, College Park</span>
                  </h3>
                  <p className="job-dates">August 2023 - May 2025</p>
                  <ul>
                    <li className="bullet-point">
                      Relevant Courses: Multimodal Foundation Models, Computer Processing of Pictoral information, Perception of Autonomous Robots, Planning of Automonous Robots, 
                      Software Design and Implementation, Robot Learning 
                    </li>
                  </ul>
                </motion.div>
                {/* Education Entry 2 */}
                <motion.div className="job-container" variants={jobContentVariants}>
                  <motion.div className="timeline-tick" variants={timelineTickVariants} />
                  <h3 className="job-title">
                    <HoverText>Bachelor of Engineering in Computer Engineering</HoverText> <span className="company">@ Savitribai Phule Pune University</span>
                  </h3>
                  <p className="job-dates">August 2019 - May 2023</p>
                  <ul>
                    <li className="bullet-point">
                      Relevant Courses: Data Structures and Algorithms, Machine Learning, Artificial Intelligence, Database Management Systems, Deep learning
                    </li>
                  </ul>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
