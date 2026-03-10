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

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 lg:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-sm font-medium text-amber uppercase tracking-widest">01</span>
          <div className="h-px flex-1 bg-gray-light"></div>
          <span className="text-sm font-medium text-gray-warm uppercase tracking-widest">About Me</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Image / Visual */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={1}
            className="relative"
          >
            <div className="aspect-square bg-off-white rounded-[2rem] overflow-hidden relative border border-gray-light">
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-amber/20 via-amber/10 to-transparent flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-amber/20 flex items-center justify-center">
                      <span className="text-4xl font-serif font-bold text-amber">R</span>
                    </div>
                    <p className="font-serif italic text-xl text-charcoal">Rikus Pretorius</p>
                    <p className="text-sm text-gray-warm mt-2">UX Designer & Front-End Developer</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative corner */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-amber rounded-2xl -z-10"></div>
          </motion.div>

          {/* Right - Content */}
          <div className="flex flex-col gap-8">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={1}
              className="text-4xl lg:text-5xl font-black leading-tight text-charcoal"
            >
              Crafting digital
              <br />
              <span className="font-serif italic font-normal text-amber">experiences</span> that
              <br />
              leave a mark
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={2}
              className="text-base text-gray-warm leading-relaxed"
            >
              I'm a third-year student majoring in Interactive Development and UX Design.
              I'm passionate about bridging the gap between design thinking and front-end
              development — turning user research into intuitive, accessible, and beautifully
              coded interfaces.
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={3}
              className="text-base text-gray-warm leading-relaxed"
            >
              I believe great UX is invisible — it guides, delights, and connects. Whether
              it's conducting usability testing, designing information architectures, or building
              responsive front-end interfaces, I approach every project with empathy and precision.
            </motion.p>

            {/* Key details */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={4}
              className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-light"
            >
              {[
                { label: 'Focus', value: 'UX Design & Front-End Dev' },
                { label: 'Seeking', value: 'Internship Opportunity' },
                { label: 'Education', value: '3rd Year — Interactive Development' },
                { label: 'Location', value: 'South Africa' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs font-medium text-amber uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm font-medium text-charcoal mt-1">{item.value}</p>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={5}
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-3 group text-charcoal font-medium"
              >
                <span className="border-b-2 border-amber pb-0.5 group-hover:border-charcoal transition-colors">
                  View my work
                </span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
