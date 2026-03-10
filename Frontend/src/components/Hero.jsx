import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stats = [
  { number: '10+', label: 'UX & development projects built from research to code' },
  { number: '3rd', label: 'Year studying Interactive Development & UX Design' },
];

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-20">
      <div className="w-full max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left - 5 columns */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-off-white rounded-full text-sm font-medium text-gray-warm border border-gray-light">
                <span className="w-2 h-2 rounded-full bg-amber animate-pulse"></span>
                Seeking internship opportunities
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight text-charcoal"
            >
              <span className="font-serif italic font-normal">design</span>
              <br />
              <span>meets code</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-base lg:text-lg text-gray-warm max-w-md leading-relaxed"
            >
              Third-year Interactive Development & UX student crafting user-centered
              digital experiences — from research and wireframes to fully coded interfaces.
            </motion.p>

            {/* Social Links */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex items-center gap-3"
            >
              {['GitHub', 'LinkedIn', 'Behance', 'Email'].map((platform) => (
                <a
                  key={platform}
                  href="#contact"
                  className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center text-xs font-medium text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300"
                >
                  {platform.slice(0, 2).toLowerCase()}
                </a>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex gap-12 pt-6 border-t border-gray-light"
            >
              {stats.map((stat) => (
                <div key={stat.number}>
                  <p className="text-4xl lg:text-5xl font-black text-charcoal">
                    <span className="text-amber">+</span>{stat.number}
                  </p>
                  <p className="text-sm text-gray-warm mt-1 max-w-[180px] leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - 7 columns */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg xl:max-w-xl">
              {/* Main image card */}
              <div className="aspect-[4/5] bg-amber rounded-[2rem] overflow-hidden relative shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-charcoal/80">
                    <svg className="w-14 h-14 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <p className="font-serif italic text-lg">UX & Dev</p>
                    <p className="text-sm mt-1 opacity-60">Interactive Development Student</p>
                  </div>
                </div>
                {/* Signature overlay */}
                <div className="absolute top-8 left-8">
                  <p className="font-serif italic text-2xl text-charcoal/60">Rikus</p>
                </div>
              </div>

              {/* Floating globe badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute right-6 top-[30%] w-12 h-12 bg-charcoal rounded-full flex items-center justify-center shadow-lg"
              >
                <svg className="w-6 h-6 text-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </motion.div>

              {/* Floating arrow badge */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute left-6 bottom-[20%] w-12 h-12 bg-cream border-2 border-charcoal rounded-full flex items-center justify-center shadow-lg"
              >
                <svg className="w-5 h-5 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
