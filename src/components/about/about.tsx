import React, { useState, useEffect, useRef } from 'react';
import './about.scss';
import { motion, useInView } from 'framer-motion';

import shreyas1 from '../../assets/me/webp/shreyas1.webp';
import shreyas2 from '../../assets/me/webp/shreyas2.webp';
import shreyas3 from '../../assets/me/webp/shreyas3.webp';

const photos = [shreyas1, shreyas2, shreyas3];

const About: React.FC = () => {
  const [photo, setPhoto] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
    setPhoto(randomPhoto);
  }, []);

  // Animation Variants with explicit delays for sequencing
  const titleVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut', delay: 0.2 } },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.8, ease: 'easeOut', delay: 1.0 } },
  };

  const photoVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 1.8 } },
  };

  const borderVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeIn', delay: 2.1 } },
  };

  const textParentVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 2.6,
      },
    },
  };

  const textChildVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className="about-container" id="about" ref={ref}>
      <div className="about-title-container">
        <motion.h2
          className="about-title"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          About Me
        </motion.h2>
        <div className="title-line">
          <motion.div
            className="line"
            variants={lineVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          />
          <div className="dot"></div>
        </div>
      </div>
      <section className="about-intro">
        <motion.div
          className="about-text"
          variants={textParentVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.p variants={textChildVariants}>
            Hello All! My name is <span className="cyan-text">Shreyas Acharya</span>.
            I'm a <span className="cyan-text">Builder</span> with a love for cutting edge technology. I specialize in <span className="cyan-text">3D Vision</span>,
            <span className="cyan-text"> Multimodal AI</span>, <span className="cyan-text"> Computer Vision </span> and <span className="cyan-text"> Generative AI</span>.
            I am currently working at <span className="cyan-text">William Sonoma Inc.</span> as a <span className="cyan-text">AI Research Engineer</span>, building <span className="cyan-text">Generative AI</span> systems for the retail industry.
          </motion.p>
          <motion.p variants={textChildVariants}>
            I wrapped up my Masters in Robotics from University of Maryland, College Park. During my time at UMD, I worked on implementing and developing a novel deep reinforcement learning
            agent for tactile sensing and reconstruction of real-world objects using a TACTO sensor. The agent achieved over
            <span className="cyan-text"> 99% accuracy</span> in reconstructing 3D objects.
          </motion.p>
          <motion.p variants={textChildVariants}>
           Outside of tech, I stay active by <span className="cyan-text">playing football</span> and <span className="cyan-text">working out</span>. 
           I'm also a huge fan of <span className="cyan-text">Motorsport</span>, particularly <span className="cyan-text">Formula 1</span>, often known as <span className="cyan-text">the Pinnacle of Motorsport</span>.
           I also unwind by listening to <span className="cyan-text">music</span> or <span className="cyan-text">travelling</span> with friends
           or playing <span className="cyan-text">Open-world games</span>.
          </motion.p>
        </motion.div>
        <motion.div
          className="about-photo"
          variants={photoVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <img src={photo} alt="Shreyas Acharya" loading="lazy" />
          <motion.div
            className="photo-border"
            variants={borderVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          />
        </motion.div>
      </section>
    </div>
  );
};

export default About;
