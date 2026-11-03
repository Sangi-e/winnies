import React, { useState, useId, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Share2, 
  Printer, 
  Sparkles, 
  HelpCircle, 
  User, 
  Maximize2 
} from 'lucide-react';
import { HEALTH_ARTICLES, HealthArticle } from '../data/healthArticles';

interface HealthInsightsSectionProps {
  onOpenBooking: (departmentId?: string) => void;
  onOpenPhotoModal?: (imageSrc: string, title: string, caption: string) => void;
}

export const HealthInsightsSection: React.FC<HealthInsightsSectionProps> = ({
  onOpenBooking,
  onOpenPhotoModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<HealthArticle | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const searchInputId = useId();

  const categories = [
    'All',
    'Preventative Care',
    'Checkups & Diagnostics',
    'Cardiovascular Health',
    'Maternal & Child Health',
  ];

  // Filter articles based on category and search query
  const filteredArticles = HEALTH_ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.seoKeywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Featured article is the first matching or primary preventative article
  const featuredArticle = filteredArticles[0] || HEALTH_ARTICLES[0];
  const secondaryArticles = filteredArticles.slice(1);

  // Close reader on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeArticle) {
        setActiveArticle(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeArticle]);

  // Lock body scroll when full article reader is open
  useEffect(() => {
    if (activeArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeArticle]);

  const handleCopyArticleLink = (slug: string) => {
    const url = `${window.location.origin}/#insight-${slug}`;
    navigator.clipboard?.writeText?.(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section 
      id="health-insights" 
      className="py-20 lg:py-28 bg-slate-50/60 border-b border-slate-200 scroll-mt-20"
      aria-labelledby="insights-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Health Insights & Patient Education</span>
            </div>

            <h2 
              id="insights-heading"
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight text-balance"
            >
              Empowering Your Health with Clear Clinical Knowledge
            </h2>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Doctor-authored articles, preventative wellness tips, and practical checkup guides designed to inform, educate, and protect your family.
            </p>
          </div>

          {/* Search Input for SEO & Rapid Discovery */}
          <div className="w-full md:w-72 relative">
            <label htmlFor={searchInputId} className="sr-only">Search Health Insights Articles</label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id={searchInputId}
                type="text"
                placeholder="Search health topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Filter Tabs (Zero-pill discipline, functional buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar text-xs font-medium">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white font-semibold shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Article Grid Layout: Asymmetrical Marquee + Supporting Articles */}
        {filteredArticles.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-sm font-semibold text-slate-900">No articles match your search query</p>
            <p className="text-xs text-slate-500 mt-1">Try searching for "preventative", "checkup", or "hypertension".</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* FEATURED MARQUEE ARTICLE (Spans 7 cols on lg) */}
            <article 
              className="lg:col-span-7 bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between group hover:shadow-md transition-shadow"
              itemScope
              itemType="https://schema.org/MedicalWebPage"
            >
              <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-900">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  itemProp="image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
                
                {/* Clean Unboxed Metadata on Photo */}
                <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-300 font-medium">
                    <span itemProp="articleSection">{featuredArticle.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{featuredArticle.readTime}</span>
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-300 hidden sm:inline">{featuredArticle.publishDate}</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h3 
                    itemProp="headline"
                    className="font-display text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-emerald-900 transition-colors leading-snug"
                  >
                    {featuredArticle.title}
                  </h3>

                  <p 
                    itemProp="description"
                    className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal"
                  >
                    {featuredArticle.summary}
                  </p>

                  {/* Bullet Preview from Key Takeaways */}
                  <div className="pt-2 space-y-2 border-t border-slate-100">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                      Core Clinical Guidance:
                    </span>
                    {featuredArticle.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{takeaway}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    <span>By </span>
                    <span className="font-semibold text-slate-800" itemProp="author">
                      {featuredArticle.author}
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveArticle(featuredArticle)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>

            {/* SECONDARY ARTICLES STACK (Spans 5 cols on lg) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {secondaryArticles.length > 0 ? (
                secondaryArticles.map((article) => (
                  <article
                    key={article.id}
                    className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between group"
                    itemScope
                    itemType="https://schema.org/MedicalWebPage"
                  >
                    <div className="space-y-2.5">
                      {/* Clean Unboxed Metadata */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <span className="text-emerald-800 font-semibold" itemProp="articleSection">
                          {article.category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{article.readTime}</span>
                        </span>
                      </div>

                      <h3 
                        itemProp="headline"
                        className="font-display text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-900 transition-colors leading-snug"
                      >
                        {article.title}
                      </h3>

                      <p 
                        itemProp="description"
                        className="text-xs text-slate-600 line-clamp-2 leading-relaxed"
                      >
                        {article.summary}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">
                        {article.publishDate}
                      </span>

                      <button
                        onClick={() => setActiveArticle(article)}
                        className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center text-xs text-slate-500">
                  Select "All" to browse additional articles on checkups and maternal health.
                </div>
              )}
            </div>

          </div>
        )}

      </div>

      {/* -------------------------------------------------------------
          FULL BLOG-STYLE ARTICLE READER MODAL
          - Comprehensive educational reading experience
          - Clear headings, clinical takeaways, FAQs, author credentials
          - Direct CTA to schedule a checkup or consultation
          - Schema.org JSON-LD structured data embed
      -------------------------------------------------------------- */}
      {activeArticle && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="reader-article-title"
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
        >
          {/* Article Container */}
          <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden relative max-h-[92vh] flex flex-col">
            
            {/* Top Navigation Bar inside Reader */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 shrink-0">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-emerald-800">{activeArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>{activeArticle.readTime}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyArticleLink(activeArticle.slug)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Share or copy article link"
                >
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  title="Print this guide"
                >
                  <Printer className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer ml-1"
                  aria-label="Close article"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Article Body */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-8 flex-1">
              
              {/* Article Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="text-emerald-800 font-semibold">{activeArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>Published {activeArticle.publishDate}</span>
                </div>

                <h1 
                  id="reader-article-title"
                  className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-snug"
                >
                  {activeArticle.title}
                </h1>

                {/* Author Credentials */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    WC
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">{activeArticle.author}</span>
                    <span className="text-slate-500">{activeArticle.authorRole} · Winnie's Clinic, Okigwe</span>
                  </div>
                </div>

                {/* Lead Summary */}
                <p className="text-base text-slate-700 font-normal leading-relaxed pt-2 border-t border-slate-100">
                  {activeArticle.summary}
                </p>
              </div>

              {/* Key Clinical Takeaways Callout Card */}
              <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-slate-900 space-y-3">
                <div className="flex items-center gap-2 text-emerald-950 font-display font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>Key Clinical Takeaways at a Glance</span>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {activeArticle.keyTakeaways.map((takeaway, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Structured Article Content Sections */}
              <div className="space-y-6 pt-2">
                {activeArticle.contentSections.map((sec, idx) => (
                  <div key={idx} className="space-y-3">
                    <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                      {sec.heading}
                    </h2>
                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                        {p}
                      </p>
                    ))}
                    {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                      <ul className="space-y-2 pl-2 pt-1">
                        {sec.bulletPoints.map((bp, bpIdx) => (
                          <li key={bpIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" aria-hidden="true" />
                            <span className="leading-relaxed">{bp}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* Patient FAQs Accordion / List */}
              {activeArticle.faqItems && activeArticle.faqItems.length > 0 && (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center gap-2 text-slate-900 font-display font-bold text-base">
                    <HelpCircle className="w-4 h-4 text-emerald-700" />
                    <span>Frequently Asked Questions</span>
                  </div>

                  <div className="space-y-3">
                    {activeArticle.faqItems.map((faq, fIdx) => (
                      <div key={fIdx} className="p-4 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm">
                        <span className="font-semibold text-slate-900 block mb-1">
                          Q: {faq.question}
                        </span>
                        <p className="text-slate-600 text-xs leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Strip: Book Consultation for this Topic */}
              <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 block">
                    Take Action on Your Health
                  </span>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white">
                    Ready to schedule your checkup or consultation?
                  </h3>
                  <p className="text-xs text-slate-300">
                    Consult with Winnie’s Clinic outpatient physicians in Umuchima, Okigwe, Imo State.
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-3">
                  <button
                    onClick={() => {
                      const dept = activeArticle.suggestedDepartmentId;
                      setActiveArticle(null);
                      onOpenBooking(dept);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-white hover:bg-emerald-50 rounded-lg shadow-sm transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Calendar className="w-4 h-4 text-emerald-800" />
                    <span>Schedule Appointment</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Footer inside Reader */}
            <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500 shrink-0">
              <span>Winnie's Clinic · Holy Ghost Bomb Junction, Umuchima, Okigwe, Imo State</span>
              <button
                onClick={() => setActiveArticle(null)}
                className="font-medium text-slate-700 hover:text-slate-950 cursor-pointer"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
