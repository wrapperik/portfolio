import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || '';

function resolveImg(src) {
  if (!src) return '';
  return src.startsWith('http') ? src : `${API_BASE}${src}`;
}

/**
 * Extract a YouTube embed ID from various URL formats.
 * Supports youtube.com/watch?v=, youtu.be/, youtube.com/embed/, etc.
 */
function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  let videoId = null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      videoId = parsed.pathname.slice(1);
    } else if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname.startsWith('/embed/')) {
        videoId = parsed.pathname.split('/embed/')[1];
      } else {
        videoId = parsed.searchParams.get('v');
      }
    }
  } catch {
    // Try regex fallback
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/);
    if (match) videoId = match[1];
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const scrollRef = useRef(null);
  const [canScroll, setCanScroll] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  const handleImageLoad = useCallback(() => {
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) {
        setCanScroll(el.scrollHeight > el.clientHeight + 10);
      }
    });
  }, []);

  const handleScroll = useCallback((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setAtBottom(scrollTop + clientHeight >= scrollHeight - 20);
  }, []);

  useEffect(() => {
    api
      .get(`/projects/${id}`)
      .then(({ data }) => setProject(data))
      .catch(() => navigate('/'))
      .finally(() => setLoading(false));
  }, [id]);

  // Reset scroll position when switching images
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    setCanScroll(false);
    setAtBottom(false);
  }, [activeImg]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightbox || !project) return;
    const imgs = project.images?.length ? project.images : [];
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightbox(false);
      if (imgs.length > 1) {
        if (e.key === 'ArrowLeft') setActiveImg((prev) => (prev === 0 ? imgs.length - 1 : prev - 1));
        if (e.key === 'ArrowRight') setActiveImg((prev) => (prev === imgs.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox, project]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  if (loading) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-charcoal/20 border-t-charcoal rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) return null;

  const color = project.tag === 'UX' ? 'bg-amber' : 'bg-charcoal';
  const categoryLabel = project.tag === 'UX' ? 'UX Design' : 'Development';
  const images = project.images?.length ? project.images : [];
  const youtubeEmbedUrl = getYouTubeEmbedUrl(project.youtubeLink?.url);

  return (
    <>
      <div className="min-h-screen bg-off-white">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-off-white/80 backdrop-blur-md border-b border-gray-light/50">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
            <button
              onClick={() => navigate('/#projects')}
              className="flex items-center gap-2 text-sm font-medium text-gray-warm hover:text-charcoal transition-colors group"
            >
              <svg
                className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </button>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium bg-charcoal text-cream px-5 py-2 rounded-full hover:bg-amber hover:text-charcoal transition-colors"
              >
                View Live
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            )}
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-12 lg:py-20">
          {/* Hero section */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  project.tag === 'UX' ? 'bg-amber/20 text-amber' : 'bg-charcoal/10 text-charcoal'
                }`}
              >
                {categoryLabel}
              </span>
              <span className="text-xs text-gray-warm">{project.year}</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-charcoal leading-tight mb-6">
              {project.title}
            </h1>
            {project.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-medium text-charcoal/70 border border-gray-light px-3 py-1.5 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Image gallery */}
          {images.length > 0 && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-16"
            >
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden mb-4 bg-charcoal/5">
                <div
                  ref={scrollRef}
                  onScroll={handleScroll}
                  className="max-h-[450px] sm:max-h-[500px] lg:max-h-[600px] overflow-y-auto overscroll-contain"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,0,0,0.15) transparent' }}
                >
                  <img
                    src={resolveImg(images[activeImg])}
                    alt={`${project.title} — image ${activeImg + 1}`}
                    className="w-full cursor-zoom-in"
                    onClick={() => setLightbox(true)}
                    onLoad={handleImageLoad}
                  />
                </div>
                {canScroll && !atBottom && (
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-charcoal/50 to-transparent pointer-events-none flex items-end justify-center pb-3 rounded-b-2xl">
                    <div className="flex flex-col items-center gap-0.5 text-cream/90">
                      <span className="text-xs font-medium tracking-wide">Scroll to explore</span>
                      <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all duration-200 ${
                        i === activeImg
                          ? 'border-amber scale-105'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={resolveImg(img)} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Content */}
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="lg:col-span-2"
            >
              <h2 className="text-2xl font-bold text-charcoal mb-4">About this project</h2>
              <p className="text-gray-warm leading-relaxed whitespace-pre-line text-base">
                {project.description}
              </p>

              {project.rationale && (
                <>
                  <h2 className="text-2xl font-bold text-charcoal mt-12 mb-4">
                    Rationale &amp; Process
                  </h2>
                  <p className="text-gray-warm leading-relaxed whitespace-pre-line text-base">
                    {project.rationale}
                  </p>
                </>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6"
            >
              <div className="bg-cream rounded-2xl p-6 border border-gray-light">
                <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-4">
                  Details
                </h3>
                <dl className="flex flex-col gap-3 text-sm">
                  <div>
                    <dt className="text-gray-warm">Category</dt>
                    <dd className="font-medium text-charcoal">{categoryLabel}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-warm">Year</dt>
                    <dd className="font-medium text-charcoal">{project.year}</dd>
                  </div>
                  {project.link && (
                    <div>
                      <dt className="text-gray-warm">Link</dt>
                      <dd>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-amber hover:underline break-all"
                        >
                          {project.link}
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {project.tags?.length > 0 && (
                <div className="bg-cream rounded-2xl p-6 border border-gray-light">
                  <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-4">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-medium text-charcoal/70 bg-off-white px-3 py-1.5 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* PDF Downloads */}
              {project.pdfs?.length > 0 && (
                <div className="bg-cream rounded-2xl p-6 border border-gray-light">
                  <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-4">
                    Documents
                  </h3>
                  <div className="flex flex-col gap-2">
                    {project.pdfs.map((pdf, i) => (
                      <a
                        key={i}
                        href={pdf.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-off-white rounded-xl px-4 py-3 border border-gray-light hover:border-amber hover:bg-amber/5 transition-colors group"
                      >
                        <svg
                          className="w-6 h-6 text-red-500 shrink-0"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                        </svg>
                        <span className="text-sm font-medium text-charcoal truncate flex-1">
                          {pdf.originalName}
                        </span>
                        <svg
                          className="w-4 h-4 text-gray-warm group-hover:text-amber transition-colors shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </motion.aside>
          </div>

          {/* ──── YouTube Video ──── */}
          {youtubeEmbedUrl && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-16"
            >
              {project.youtubeLink?.title && (
                <h2 className="text-2xl font-bold text-charcoal mb-6">
                  {project.youtubeLink.title}
                </h2>
              )}
              <div
                className="relative w-full rounded-2xl overflow-hidden border border-gray-light bg-charcoal/5"
                style={{ paddingBottom: '56.25%' }}
              >
                <iframe
                  src={youtubeEmbedUrl}
                  title={project.youtubeLink?.title || 'YouTube video'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </motion.div>
          )}

          {/* ──── Prototype Embed ──── */}
          {project.prototypeEmbed && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-16"
            >
              <h2 className="text-2xl font-bold text-charcoal mb-6">Interactive Prototype</h2>
              <div
                className="w-full rounded-2xl overflow-hidden border border-gray-light bg-charcoal/5"
                dangerouslySetInnerHTML={{ __html: project.prototypeEmbed }}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(false)}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(false)}
              className="absolute top-6 right-6 w-10 h-10 bg-cream/10 hover:bg-cream/20 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Prev / Next */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                  }}
                  className="absolute left-4 sm:left-8 w-10 h-10 bg-cream/10 hover:bg-cream/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 text-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-4 sm:right-8 w-10 h-10 bg-cream/10 hover:bg-cream/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 text-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            <motion.div
              key={activeImg}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-xl mx-4 overscroll-contain"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.2) transparent' }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={resolveImg(images[activeImg])}
                alt={`${project.title} — image ${activeImg + 1}`}
                className="w-full rounded-xl"
              />
            </motion.div>

            {/* Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-6 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImg(i);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      i === activeImg ? 'bg-cream' : 'bg-cream/30'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
