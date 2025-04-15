import React from 'react';
import styled from 'styled-components';
import './resume.scss';

const HoverText = styled.span`
  position: relative;
  display: inline-block;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #33cccc; // Cyan color

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: -2px;
      left: 0;
      background-color: #33cccc;
      animation: underline 0.3s ease forwards;
    }
  }

  @keyframes underline {
    from {
      transform: scaleX(0);
    }
    to {
      transform: scaleX(1);
    }
  }
`;

const Resume: React.FC = () => {
  return (
    <div className="resume-container" id="resume">
      {/* <h1 className="resume-title">Resume</h1> */}
      <div className="content-wrapper">
        <div className="left-column">
          <div className="section-container">
            <h1 className="section-title">Education</h1>
            <div className="line-container">
              <div className="job-container">
                <h3 className="job-title">
                  <HoverText>Master of Engineering in Robotics</HoverText> <span className="company">@University of Maryland, College Park</span>
                </h3>
                <p className="job-dates">August 2023 - May 2025</p>
                <ul>
                  <li className="bullet-point">
                    Relevant Courses: Multimodal Foundation Models, Computer Processing of Pictoral information, Perception of Autonomous Robots, Planning of Automonous Robots, 
                    Software Design and Implementation, Robot Learning 
                  </li>
                </ul>
              </div>
              <div className="job-container">
                <h3 className="job-title">
                  <HoverText>Bachelor of Engineering in Computer Engineering</HoverText> <span className="company">@Savitribai Phule Pune University</span>
                </h3>
                <p className="job-dates">August 2019 - May 2023</p>
                <ul>
                  <li className="bullet-point">
                    Relevant Courses: Data Structures and Algorithms, Machine Learning, Artificial Intelligence, Database Management Systems, Deep learning
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="section-container">
            <h1 className="section-title">Experience</h1>
            <div className="line-container">
              <div className="job-container">
                <h3 className="job-title">
                  <HoverText>Machine Learning Engineer</HoverText> <span className="company">@techR Business Solutions</span>
                </h3>
                <p className="job-dates">January 2023 - July 2023</p>
                <ul>
                  <li className="bullet-point">
                    Implemented and deployed a deep learning model(Resnet) for real-time human action recognition using OpenCV's DNN module.
                  </li>
                  <li className="bullet-point">
                    Developed a real-time video processing pipeline that captures live video feed, perform inference using the
                     action recognition model and classify from 400 distinct activities and raises an alarm if an unusual ativity is detected.
                  </li>
                  <li className="bullet-point">
                    Engineered a web application using Flask and SocketIO to stream and display real-time action recognition resylts to the user interface.  
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
