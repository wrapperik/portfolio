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
  { number: '5+', label: 'UX & development projects built from research to code' },
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
              <a
                href="https://github.com/wrapperik"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/rikus_pretorius"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                </svg>
              </a>
              <a
                href="https://www.behance.net/rikuspretoriusweb"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300"
                aria-label="Behance"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/rikus-pretorius-982013410"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
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
                    {stat.number}<span className="text-amber"> ~ </span>
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
              <div className="aspect-[4/5] bg-off-white rounded-[2rem] overflow-hidden relative shadow-xl border border-gray-light">
                <img
                  src="https://res.cloudinary.com/dvq3toyi0/image/upload/q_auto/f_auto/v1781986573/IMG_0330_gx8aqn.jpg"
                  alt="Rikus Pretorius"
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream/80 to-transparent flex items-end p-8">
                  <p className="font-serif italic text-xl text-charcoal">Rikus Pretorius</p>
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-amber rounded-3xl -z-10"></div>

             
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
