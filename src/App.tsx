import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { HashRouter as Router } from 'react-router-dom';

// @ts-ignore
import Header from './components/header/header.tsx';
// @ts-ignore
import Hero from './components/hero/hero.tsx';
// @ts-ignore
import SocialLinks from './components/social_links/social_links.tsx';
// @ts-ignore
import Resume from './components/resume/resume.tsx';
// @ts-ignore
import Projects from './components/projects/projects.tsx';
// @ts-ignore
import About from './components/about/about.tsx';
// @ts-ignore
import Footer from './components/footer/footer.tsx';
// @ts-ignore
import Techstack from './components/techstack/techstack.tsx';
// @ts-ignore
// import ContributionMap from './components/contribution_map/contribution_map.tsx';

const AppContainer = styled.div`
  background-color: #1e1e1e; /* Match the background color of the hero section */
  min-height: 100vh;
  padding: 20px 0;
`;

const MainContent = styled.div`
`;

const VersionTag = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 15px;
  right: 15px;
  background: linear-gradient(45deg, #01AFAF,rgb(52, 187, 187));
  color: #fff;
  padding: 5px 12px;
  border-radius: 15px;
  font-family: 'RobotoMono', sans-serif;
  font-size: 0.8em;
  font-weight: bold;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transform: ${props => (props.isVisible ? 'scale(1)' : 'scale(0)')};
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: ${props => (props.isVisible ? 'auto' : 'none')};

  &:hover {
    transform: ${props => (props.isVisible ? 'scale(1.1)' : 'scale(0)')};
  }
`;

const App: React.FC = () => {
  const [isVersionTagVisible, setIsVersionTagVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const socialLinksElement = document.getElementById('social-links');
      if (socialLinksElement) {
        const rect = socialLinksElement.getBoundingClientRect();
        // Show the tag only when the social links section is in the viewport
        const isInViewport = rect.top < window.innerHeight && rect.bottom >= 0;
        setIsVersionTagVisible(isInViewport);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run on initial load

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Router>
      <AppContainer>
        <Header />
        <MainContent>
          <div id="home">
            <Hero />
          </div>
          
          <About />
          
          <Resume />
          
          <Techstack />
          
          <Projects />
          
          <SocialLinks />
        </MainContent>
        <Footer />
        <VersionTag isVisible={isVersionTagVisible}>v 2.0</VersionTag>
      </AppContainer>
    </Router>
  );
}

export default App;
