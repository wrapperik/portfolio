export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-cream/10 py-8">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-1">
            <span className="text-xl font-black tracking-tighter text-cream font-serif">
              RP
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber mt-1.5"></span>
          </a>

          <p className="text-xs text-cream/40">
            &copy; {new Date().getFullYear()} Rikus Pretorius. Crafted with care.
          </p>

          {/* Back to top */}
          <a
            href="#home"
            className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/50 hover:text-amber hover:border-amber transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
