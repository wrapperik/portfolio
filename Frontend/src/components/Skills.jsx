import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const skillCategories = [
  {
    title: 'Front-End Development',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    skills: [
      { name: 'React / Next.js', level: 85 },
      { name: 'JavaScript / TypeScript', level: 80 },
      { name: 'HTML / CSS / Tailwind', level: 90 },
      { name: 'Responsive & Accessible Code', level: 82 },
    ],
  },
  {
    title: 'UX Design',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    skills: [
      { name: 'User Research & Testing', level: 85 },
      { name: 'Wireframing & Prototyping', level: 90 },
      { name: 'Information Architecture', level: 80 },
      { name: 'Design Systems', level: 82 },
    ],
  },
  {
    title: 'Tools & Workflow',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    skills: [
      { name: 'Figma / FigJam', level: 92 },
      { name: 'Git / GitHub', level: 78 },
      { name: 'Agile / Scrum', level: 75 },
      { name: 'Node.js / REST APIs', level: 70 },
    ],
  },
];

const tools = [
  'Figma', 'React', 'Tailwind CSS', 'VS Code', 'Git',
  'Miro', 'Notion', 'Node.js', 'Framer', 'Notion',
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-24 lg:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0}
          className="flex items-center gap-4 mb-8"
        >
          <span className="text-sm font-medium text-amber uppercase tracking-widest">03</span>
          <div className="h-px flex-1 bg-gray-light"></div>
          <span className="text-sm font-medium text-gray-warm uppercase tracking-widest">Skills & Tools</span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={1}
          className="text-4xl lg:text-6xl font-black leading-tight text-charcoal mb-16"
        >
          What I
          <br />
          <span className="font-serif italic font-normal text-amber">bring to the table</span>
        </motion.h2>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={catIndex + 2}
              className="bg-white rounded-2xl p-8 border border-gray-light hover:border-amber/30 transition-colors duration-500"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-amber/10 rounded-xl flex items-center justify-center text-amber">
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-charcoal">{category.title}</h3>
              </div>

              <div className="flex flex-col gap-5">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-charcoal">{skill.name}</span>
                      <span className="text-xs text-gray-warm">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-light rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1.2, delay: catIndex * 0.2 + 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-gradient-to-r from-orange to-amber-light rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools Marquee */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={6}
        >
          <p className="text-sm font-medium text-gray-warm uppercase tracking-widest mb-6 text-center">
            Tools I work with
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool) => (
              <span
                key={tool}
                className="px-5 py-2.5 bg-off-white border border-gray-light rounded-full text-sm font-medium text-charcoal hover:bg-charcoal hover:text-cream hover:border-charcoal transition-all duration-300 cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
