import React, { useRef } from 'react';
import './footer.scss';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin, FaMedium, FaFileAlt } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

const Footer: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const containerVariants = {
    hidden: {},
    visible: {},
  };

  const centerItemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.0, delay: 0.5 } },
  };

  const sideItemsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, delay: 0.8 } },
  };

  return (
    <motion.footer
      ref={ref}
      className="footer-container"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.div className="left-align" variants={sideItemsVariants}>
        <p>
          Designed by Me and Adapted from <a href="https://github.com/tjklint" target="_blank" rel="noopener noreferrer" className="footer-link"> Timothy Klint</a>.
        </p>
      </motion.div>
      <motion.div className="center-align" variants={centerItemVariants}>
        <p>&copy; Shreyas Acharya 2025 <br/> V2.0</p>
      </motion.div>
      <motion.div className="right-align social-icons" variants={sideItemsVariants}>
        <a href="https://www.linkedin.com/in/shreyas-acharya-10gma/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        <a href="https://github.com/StarkGoku10" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
        <a href="mailto:shreyasacharya3000@gmail.com" target="_blank" rel="noopener noreferrer"><SiGmail /></a>
        <a href="https://medium.com/@shreyasacharya3000" target="_blank" rel="noopener noreferrer"><FaMedium /></a>
        <a href="/resume/resume.pdf" target="_blank" rel="noopener noreferrer"><FaFileAlt /></a>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
