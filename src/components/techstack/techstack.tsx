import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaGitlab, FaDocker, FaPython, FaJs, FaReact, FaDatabase, FaChartLine, FaLinux, FaMobileAlt } from 'react-icons/fa';
import { SiCplusplus, SiPostgresql, SiMysql, SiSqlite, SiPandas, SiPytorch, SiTensorflow, SiNvidia, SiOpencv, SiVisualstudio, SiScikitlearn, 
  SiWebpack, SiNumpy, SiRos, SiScipy, SiKubernetes, SiGithubactions, SiGit, SiHuggingface, SiFlask, SiFastapi, SiGoogle} from 'react-icons/si'; 
import './techstack.scss';

const technologies = [
    // Languages
    { name: 'Python', icon: <FaPython />, category: 'Languages' },
    { name: 'C++', icon: <SiCplusplus />, category: 'Languages' },
    { name: 'SQL', icon: <FaDatabase />, category: 'Languages' },
    { name: 'MySQL', icon: <SiMysql />, category: 'Languages' },
    { name: 'SQLite', icon: <SiSqlite />, category: 'Languages' },
    { name: 'PostgreSQL', icon: <SiPostgresql />, category: 'Languages' },
    { name: 'JavaScript', icon: <FaJs />, category: 'Languages' },
    { name: 'MATLAB', icon: <FaChartLine />, category: 'Languages' },
    // Frameworks
    { name: 'PyTorch', icon: <SiPytorch />, category: 'Frameworks' },
    { name: 'Tensorflow', icon: <SiTensorflow />, category: 'Frameworks' },
    { name: 'ROS2', icon: <SiRos />, category: 'Frameworks' },
    { name: 'MoveIt', icon: <SiRos />, category: 'Frameworks' },
    { name: 'CUDA', icon: <SiNvidia />, category: 'Frameworks' },
    { name: 'RESTful API', icon: <SiWebpack />, category: 'Frameworks' },
    { name: 'LangChain', icon: <SiHuggingface />, category: 'Frameworks' },
    { name: 'React', icon: <FaReact />, category: 'Frameworks' },
    { name: 'Kivy', icon: <FaMobileAlt />, category: 'Frameworks' },
    { name: 'Flask', icon: <SiFlask />, category: 'Frameworks' },
    { name: 'FastAPI', icon: <SiFastapi />, category: 'Frameworks' },
    { name: 'GANs/Diffusion', icon: <SiPytorch />, category: 'Frameworks' },
    { name: 'Mujoco', icon: <SiGoogle />, category: 'Frameworks' },
    // Developer Tools
    { name: 'GitHub', icon: <FaGithub />, category: 'Developer Tools' },
    { name: 'GitLab', icon: <FaGitlab />, category: 'Developer Tools' },
    { name: 'Docker', icon: <FaDocker />, category: 'Developer Tools' },
    { name: 'Visual Studio', icon: <SiVisualstudio />, category: 'Developer Tools' },
    { name: 'Linux', icon: <FaLinux />, category: 'Developer Tools' },
    { name: 'Git', icon: <SiGit />, category: 'Developer Tools' },
    { name: 'Kubernetes', icon: <SiKubernetes />, category: 'Developer Tools' },
    { name: 'GitHub Actions', icon: <SiGithubactions />, category: 'Developer Tools' },
    { name: 'CI/CD Pipeline', icon: <SiGithubactions />, category: 'Developer Tools' },
    { name: 'UML', icon: <SiVisualstudio />, category: 'Developer Tools' },
    { name: 'Gazebo', icon: <SiRos />, category: 'Developer Tools' },
    { name: 'SolidWorks', icon: <SiVisualstudio />, category: 'Developer Tools' },
    { name: 'Agile', icon: <SiWebpack />, category: 'Developer Tools' },
    { name: 'Software Design', icon: <SiWebpack />, category: 'Developer Tools' },
    // Libraries
    { name: 'PyGame', icon: <FaPython />, category: 'Libraries' },
    { name: 'OpenCV', icon: <SiOpencv />, category: 'Libraries' },
    { name: 'Scikit-learn', icon: <SiScikitlearn />, category: 'Libraries' },
    { name: 'NumPy', icon: <SiNumpy />, category: 'Libraries' },
    { name: 'Pandas', icon: <SiPandas />, category: 'Libraries' },
    { name: 'Matplotlib', icon: <SiScipy />, category: 'Libraries' },
    { name: 'SciPy', icon: <SiScipy />, category: 'Libraries' },
    { name: 'Hugging Face', icon: <SiHuggingface />, category: 'Libraries' },
    { name: 'stable-Baseline3', icon: <SiPytorch />, category: 'Libraries' },
    { name: 'PyBullet', icon: <SiPytorch />, category: 'Libraries' },
];

const categories = ["Languages", "Frameworks", "Developer Tools", "Libraries"];

// Animation variants updated to match About Me section timings for title and line
const titleVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.2 } },
};
  
const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.7 } },
};

const categoriesContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: 1.5, // Adjusted delay to follow line animation
            staggerChildren: 0.5,
        }
    }
}

const categoryTileVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
        duration: 0.8,
        ease: "easeOut",
    },
  },
};

const itemsContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: 0.5,
            staggerChildren: 0.08,
        }
    }
}

const techItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
}

const Techstack: React.FC = () => {
  return (
    <motion.div 
        className="about-technologies-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
    >
      <section className="about-technologies">
        <motion.div className="title-container" variants={titleVariants}>
          <h2 className="techstack-title">My Techstack</h2>
          <div className="title-line-container">
            <motion.div className="title-line" variants={lineVariants} style={{ transformOrigin: 'left' }}/>
          </div>
        </motion.div>
        <motion.div className="technology-categories" variants={categoriesContainerVariants}>
          {categories.map((category) => (
            <motion.div className="technology-category" key={category} variants={categoryTileVariants}>
              <h3>{category}</h3>
              <motion.div className="technology-items" variants={itemsContainerVariants}>
                {technologies.filter((tech) => tech.category === category).map((tech) => (
                    <motion.div className="technology-item" key={tech.name} variants={techItemVariants}>
                      <div className="icon">{tech.icon}</div>
                      <p>{tech.name}</p>
                    </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </motion.div>
  );
}

export default Techstack;
