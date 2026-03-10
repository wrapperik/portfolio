import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

// Fallback projects used when API is unavailable
const fallbackProjects = [
  {
    _id: '1',
    title: 'HealthHub — Patient Portal Redesign',
    tag: 'UX',
    description:
      'End-to-end UX redesign of a patient portal. Conducted user interviews, created journey maps and personas, then designed and tested a streamlined booking flow that reduced task completion time by 40%.',
    tags: ['User Research', 'Figma', 'Usability Testing'],
    year: '2025',
  },
  {
    _id: '2',
    title: 'CampusConnect — Student App',
    tag: 'DV',
    description:
      'A full-stack React web app for campus event discovery. Built with responsive design, real-time filtering, and an accessible component library from scratch using Tailwind CSS.',
    tags: ['React', 'Tailwind CSS', 'REST API'],
    year: '2025',
  },
  {
    _id: '3',
    title: 'EcoTrack — Sustainability Dashboard',
    tag: 'UX',
    description:
      'Designed an interactive dashboard for tracking personal carbon footprint. Led the UX process from competitive analysis through wireframing, prototyping, and iterative user testing.',
    tags: ['Wireframing', 'Prototyping', 'Figma'],
    year: '2024',
  },
  {
    _id: '4',
    title: 'OpenShelf — Library Platform',
    tag: 'DV',
    description:
      'A responsive front-end for a community library platform featuring search, filtering, and a bookmarking system. Built with React, styled-components, and integrated with a Node.js API.',
    tags: ['React', 'Node.js', 'Responsive Design'],
    year: '2024',
  },
  {
    _id: '5',
    title: 'FinFlow — Banking App Prototype',
    tag: 'UX',
    description:
      'A high-fidelity interactive prototype for a mobile banking app. Created a design system, conducted A/B testing on navigation patterns, and delivered developer-ready specs.',
    tags: ['Design System', 'A/B Testing', 'Figma'],
    year: '2024',
  },
  {
    _id: '6',
    title: 'Portfolio Website',
    tag: 'DV',
    description:
      'This very site — a responsive portfolio built with React, Tailwind CSS, and Framer Motion. Focused on performance, accessibility, and clean component architecture.',
    tags: ['React', 'Framer Motion', 'Tailwind CSS'],
    year: '2025',
  },
];

const filters = ['All', 'UX', 'DV'];
const filterLabels = { All: 'All', UX: 'UX Design', DV: 'Development' };

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    api
      .get('/projects')
      .then(({ data }) => {
        if (data.length > 0) setProjects(data);
      })
      .catch(() => {
        // API unavailable — keep fallback projects
      });
  }, []);

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.tag === activeFilter);

  return (
    <section id="projects" className="py-24 lg:py-32 bg-off-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0}
          className="flex items-center gap-4 mb-8"
        >
          <span className="text-sm font-medium text-amber uppercase tracking-widest">02</span>
          <div className="h-px flex-1 bg-gray-light"></div>
          <span className="text-sm font-medium text-gray-warm uppercase tracking-widest">Selected Work</span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={1}
            className="text-4xl lg:text-6xl font-black leading-tight text-charcoal"
          >
            Featured
            <br />
            <span className="font-serif italic font-normal">projects</span>
          </motion.h2>

          {/* Filters */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={2}
            className="flex gap-2"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-charcoal text-cream'
                    : 'bg-cream text-gray-warm hover:bg-gray-light'
                }`}
              >
                {filterLabels[filter]}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filtered.map((project, i) => {
            const color = project.tag === 'UX' ? 'bg-amber' : 'bg-charcoal';
            const categoryLabel = project.tag === 'UX' ? 'UX Design' : 'Development';
            const projectIndex = projects.indexOf(project) + 1;
            const thumbnail = project.images?.length
              ? project.images[0]
              : project.image || '';

            const card = (
              <motion.article
                key={project._id}
                layout
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={i * 0.5 + 2}
                className="group cursor-pointer"
              >
                <Link to={`/project/${project._id}`}>
                  {/* Thumbnail */}
                  <div
                    className={`aspect-[4/3] ${color} rounded-2xl overflow-hidden relative mb-6 transition-transform duration-500 group-hover:scale-[0.98]`}
                  >
                    {thumbnail ? (
                      <img
                        src={
                          thumbnail.startsWith('http')
                            ? thumbnail
                            : `${import.meta.env.VITE_API_URL?.replace('/api', '') || ''}${thumbnail}`
                        }
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center p-8">
                        <div className="text-center">
                          <p
                            className={`text-6xl font-black ${color === 'bg-charcoal' ? 'text-cream/20' : 'text-charcoal/15'} font-serif`}
                          >
                            {String(projectIndex).padStart(2, '0')}
                          </p>
                          <p
                            className={`font-serif italic text-lg mt-2 ${color === 'bg-charcoal' ? 'text-cream/70' : 'text-charcoal/60'}`}
                          >
                            {categoryLabel}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500 flex items-end p-6">
                      <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <svg
                          className="w-5 h-5 text-charcoal"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 17L17 7M17 7H7M17 7v10"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Year badge */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${color === 'bg-charcoal' ? 'bg-cream/20 text-cream' : 'bg-charcoal/10 text-charcoal'}`}
                      >
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-bold text-charcoal group-hover:text-amber transition-colors duration-300">
                        {project.title}
                      </h3>
                      <span className="text-xs font-medium text-gray-warm bg-cream px-3 py-1 rounded-full shrink-0">
                        {categoryLabel}
                      </span>
                    </div>
                    <p className="text-sm text-gray-warm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.tags?.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-medium text-charcoal/70 border border-gray-light px-3 py-1 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.article>
            );

            return card;
          })}
        </div>
      </div>
    </section>
  );
}
