import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="py-24 lg:py-32 bg-charcoal text-cream" ref={ref}>
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0}
          className="flex items-center gap-4 mb-8"
        >
          <span className="text-sm font-medium text-amber uppercase tracking-widest">04</span>
          <div className="h-px flex-1 bg-cream/10"></div>
          <span className="text-sm font-medium text-cream/50 uppercase tracking-widest">Get In Touch</span>
        </motion.div>

        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={1}
            className="text-4xl lg:text-6xl font-black leading-tight mb-8"
          >
            Let's create
            <br />
            something
            <br />
            <span className="font-serif italic font-normal text-amber">beautiful</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={2}
            className="text-cream/60 text-base leading-relaxed mb-12 mx-auto max-w-2xl"
          >
            Whether you have an internship opening, want to collaborate on a project, or just want to chat
            about UX and development — I'd love to hear from you.
          </motion.p>

          {/* Contact Info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={3}
            className="flex flex-col sm:flex-row justify-center gap-6 mb-10"
          >
            <a
              href="mailto:hello@rikuspretorius.com"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-amber text-charcoal font-bold rounded-full hover:bg-amber/90 transition-colors duration-300 group"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              hello@rikuspretorius.com
            </a>
          </motion.div>

          {/* Location */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={4}
            className="flex items-center justify-center gap-2 text-cream/50 text-sm mb-10"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Based in South Africa
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={5}
            className="flex gap-3 justify-center"
          >
            {['GitHub', 'LinkedIn', 'Behance', 'Dribbble'].map((platform) => (
              <a
                key={platform}
                href="#"
                className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-xs font-medium text-cream/70 hover:bg-amber hover:border-amber hover:text-charcoal transition-all duration-300"
              >
                {platform.slice(0, 2)}
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
