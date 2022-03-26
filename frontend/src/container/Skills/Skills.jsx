import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactToolTip from 'react-tooltip';

import { AppWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Skills.scss';

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const SkillsQuery = '*[_type == "skills"]';

    client.fetch(query).then((data) => {
      setExperiences(data);
      console.log(data);
    });

    client.fetch(SkillsQuery).then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <div className='app__skills'>
      <h2 className='head-text'>Skills & Experience</h2>

      <div className='app__skills-container'>
        <motion.div className='app__skills-list'>
          {skills?.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className='app__skills-item app__flex'
              key={skill.name}
            >
              <div
                className='app__flex'
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className='p-text'>{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Nested Mapping of data due to data structure in sanity - need to simplify data structure */}
        <div className='app__skills-exp'>
          {experiences?.map((experience) => (
            <motion.div className='app__skills-exp-item' key={experience.year}>
              <div className='app__skills-exp-year'>
                <p className='bold-text'>{experience.year}</p>
              </div>
              <motion.div className='app__skills-exp-works'>
                {experience.works.map((work) => (
                  <div key={work.name}>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className='app__skills-exp-work'
                      data-tip
                      data-for={work.id}
                    >
                      <h4 className='bold-text'>{work.name}</h4>
                      <p className='p-text'>{work.company}</p>
                    </motion.div>
                    <ReactToolTip
                      id={work.id}
                      effect='solid'
                      arrowColor='#fff'
                      className='skills-tooltip'
                    >
                      {work.desc}
                    </ReactToolTip>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AppWrap(Skills, 'skills');
