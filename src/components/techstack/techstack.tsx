import React from 'react';
import { FaGithub, FaGitlab, FaDocker, FaJira, FaPython, FaJs, FaReact, FaDatabase, FaChartLine, FaLinux } from 'react-icons/fa';
import { 
  SiCplusplus, SiPostgresql, SiMongodb, SiMysql, SiSqlite, 
  SiPandas, SiPytorch, SiTensorflow, SiNvidia, SiOpencv, 
  SiVisualstudio, SiCisco, SiScikitlearn, SiWebpack, SiNumpy, 
  SiRos, SiScipy, SiKubernetes, SiGithubactions,
  SiDocker, SiGit, SiHuggingface
} from 'react-icons/si';
import './techstack.scss';

const Techstack: React.FC = () => {
  return (
    <div className="about-technologies-container">
      <section className="about-technologies">
        <h2>My Techstack</h2>
        <div className="technology-categories">
          <div className="technology-category">
            <h3>Languages</h3>
            <div className="technology-items">
              <div className="technology-item"><FaPython /><p>Python</p></div>
              <div className="technology-item"><SiCplusplus /><p>C++</p></div>
              <div className="technology-item"><FaDatabase /><p>SQL</p></div>
              <div className="technology-item"><SiMysql /><p>MySQL</p></div>
              <div className="technology-item"><SiSqlite /><p>SQLite</p></div>
              <div className="technology-item"><SiPostgresql /><p>PostgreSQL</p></div>
              <div className="technology-item"><FaJs /><p>JavaScript</p></div>
              <div className="technology-item"><FaChartLine /><p>MATLAB</p></div>
            </div>
          </div>

          <div className="technology-category">
            <h3>Frameworks</h3>
            <div className="technology-items">
              <div className="technology-item"><SiPytorch /><p>PyTorch</p></div>
              <div className="technology-item"><SiTensorflow /><p>Tensorflow</p></div>
              <div className="technology-item"><SiRos /><p>ROS2</p></div>
              <div className="technology-item"><SiRos /><p>Gazebo</p></div>
              <div className="technology-item"><SiRos /><p>MoveIt</p></div>
              <div className="technology-item"><SiNvidia /><p>CUDA</p></div>
              <div className="technology-item"><SiWebpack /><p>RESTful API</p></div>
            </div>
          </div>

          <div className="technology-category">
            <h3>Developer Tools</h3>
            <div className="technology-items">
              <div className="technology-item"><FaGithub /><p>GitHub</p></div>
              <div className="technology-item"><FaGitlab /><p>GitLab</p></div>
              <div className="technology-item"><FaDocker /><p>Docker</p></div>
              <div className="technology-item"><SiVisualstudio /><p>Visual Studio</p></div>
              <div className="technology-item"><FaLinux /><p>Linux</p></div>
              <div className="technology-item"><SiGit /><p>Git</p></div>
              <div className="technology-item"><SiKubernetes /><p>Kubernetes</p></div>
              <div className="technology-item"><SiGithubactions /><p>GitHub Actions</p></div>
              <div className="technology-item"><SiGithubactions /><p>CI/CD Pipeline</p></div>
              <div className="technology-item"><SiVisualstudio /><p>UML</p></div>
              <div className="technology-item"><SiVisualstudio /><p>SolidWorks</p></div>
              <div className="technology-item"><SiWebpack /><p>Agile</p></div>
              <div className="technology-item"><SiWebpack /><p>Software Architecture</p></div>
            </div>
          </div>

          <div className="technology-category">
            <h3>Libraries</h3>
            <div className="technology-items">
              <div className="technology-item"><FaPython /><p>PyGame</p></div>
              <div className="technology-item"><SiOpencv /><p>OpenCV</p></div>
              <div className="technology-item"><SiScikitlearn /><p>Scikit-learn</p></div>
              <div className="technology-item"><SiNumpy /><p>NumPy</p></div>
              <div className="technology-item"><SiPandas /><p>Pandas</p></div>
              <div className="technology-item"><SiScipy /><p>Matplotlib</p></div>
              <div className="technology-item"><SiScipy /><p>SciPy</p></div>
              <div className="technology-item"><SiHuggingface /><p>Hugging Face</p></div>
              <div className="technology-item"><SiPytorch /><p>stable-Baseline3</p></div>
              <div className="technology-item"><SiPytorch /><p>PyBullet</p></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Techstack;
