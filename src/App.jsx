import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, ExternalLink, ChevronRight, Share2, Clock, ArrowLeft, Search, X } from 'lucide-react';

// Today's featured paper: PMC10004674 - Expanded to ~900-1000 words
const TODAY_ARTICLE = {
  id: "PMC10004674",
  title: "The Magnesium Revolution: Engineering the Future of High-Performance Structural Materials",
  author: "Qiang Yang, Xiaohan Wu, & Xin Qiu",
  institution: "State Key Laboratory of Rare Earth Resource Utilization",
  date: "February 27, 2023",
  readTime: "8 min read",
  category: "Engineering",
  abstract: "As the global community moves toward a zero-carbon future, the demand for lightweight structural materials has never been higher. This review examines the breakthroughs in High-Pressure Die Casting (HPDC) Magnesium alloys, focusing on how microstructural engineering allows us to finally bridge the gap between material strength and ductility.",
  content: [
    { 
      type: "heading", 
      text: "I. The Why: The Quest for the Lightweight Grail" 
    },
    { 
      type: "paragraph", 
      text: "The modern industrial landscape is currently defined by a singular, high-stakes race: the reduction of carbon emissions. In the sectors of automotive engineering and aerospace, the most effective lever we have is 'lightweighting.' Every kilogram removed from a vehicle's chassis directly correlates to reduced fuel consumption or extended battery range for electric vehicles. For decades, steel and aluminum have been the workhorses of these industries, but we are reaching the theoretical limits of their efficiency." 
    },
    { 
      type: "paragraph", 
      text: "Enter Magnesium (Mg). It is the lightest of all common engineering metals—only one-quarter the density of steel and two-thirds that of aluminum. On paper, it is the perfect candidate for a sustainable future. However, magnesium has historically suffered from a 'glass jaw': it was either strong and brittle, or soft and ductile. Finding a way to achieve 'strength-ductility synergy' is the metallurgical equivalent of the Holy Grail, and this paper explores how High-Pressure Die Casting (HPDC) is making that possible." 
    },
    { 
      type: "paragraph", 
      text: "The efficiency of the HPDC process cannot be overstated. By injecting molten metal into steel dies under extreme pressure, manufacturers can create complex, near-net-shape parts in seconds. This eliminates the need for expensive secondary machining and makes magnesium a commercially viable alternative to heavier alloys on a massive scale." 
    },
    { 
      type: "heading", 
      text: "II. The What: Engineering the Intermetallic Skeleton" 
    },
    { 
      type: "paragraph", 
      text: "The primary focus of this research is the 'microstructural characteristics' of magnesium alloys. When magnesium is cast, it doesn't just form a solid block of metal; it creates a complex landscape of grains and 'intermetallic phases' at the boundaries of those grains. Think of these phases as the mortar between bricks. If the mortar is too weak, the wall crumbles; if it is too rigid, the wall cracks under pressure." 
    },
    { 
      type: "paragraph", 
      text: "The researchers analyzed various alloying systems, most notably the Mg-Al (Magnesium-Aluminum) and AE (Magnesium-Aluminum-Rare Earth) series. The traditional Mg-Al alloys like AZ91 have been the industry standard, but they lose their structural integrity at temperatures above 120°C. To solve this, the researchers looked at the introduction of Rare Earth (RE) elements and Zinc (Zn)." 
    },
    { 
      type: "paragraph", 
      text: "The breakthrough finding lies in the formation of what the paper calls a 'stable intermetallic skeleton.' In AE-based alloys, the Rare Earth elements react with Aluminum to form a high-melting-point phase that weaves through the grain boundaries. This skeleton acts as a reinforcement bar, inhibiting the movement of dislocations (the microscopic slips that cause metal to deform) while simultaneously preventing cracks from propagating through the material. This specific crystal structure allows the alloy to maintain high yield strength without sacrificing the 'ductility' needed to absorb energy during an impact, such as a car crash." 
    },
    { 
      type: "heading", 
      text: "III. What it Means: A New Standard for Safety and Sustainability" 
    },
    { 
      type: "paragraph", 
      text: "The implications of mastering these intermetallic phases extend far beyond the lab. For the general public, this represents a fundamental shift in how our vehicles are built. By using AE44 (a representative commercial alloy mentioned in the study), engineers can design engine cradles and chassis components that are significantly lighter than their aluminum predecessors but just as safe." 
    },
    { 
      type: "paragraph", 
      text: "Furthermore, the research provides a roadmap for 'alloy design by demand.' By understanding exactly how different elements like Calcium (Ca), Strontium (Sr), and Zinc (Zn) alter the intermetallic morphology, we can now create specialized materials for specific use cases. For example, aerospace components might prioritize high-temperature resistance, while consumer electronics might prioritize ultra-thin-wall castability and impact resistance." 
    },
    { 
      type: "paragraph", 
      text: "Ultimately, the study proves that the perceived limitations of magnesium were not inherent to the metal itself, but rather a hurdle in our understanding of its microscopic behavior. As we refine our control over these intermetallic skeletons, the 'Magnesium Revolution' will likely transition from a laboratory prospect to the backbone of modern transportation, offering a rarer combination of high performance and low environmental impact." 
    }
  ],
  sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10004674/"
};

// Expanded archive data for testing
const ARCHIVE_DATA = [
  { date: "May 19, 2024", title: "Quantum Decoherence in Biological Systems", category: "Mathematics", link: "#" },
  { date: "May 18, 2024", title: "Urban Density and the Evolution of Social Reciprocity", category: "Social Science", link: "#" },
  { date: "May 17, 2024", title: "Structural Integrity of Carbon-Nanotube Lattices", category: "Engineering", link: "#" },
  { date: "May 16, 2024", title: "The Linguistics of Temporal Perception", category: "Psychology", link: "#" },
  { date: "May 15, 2024", title: "Topological Data Analysis in Neural Mapping", category: "Mathematics", link: "#" },
];

const CATEGORIES = ["All", "Engineering", "Mathematics", "Psychology", "Neuroscience", "Social Science"];

export default function App() {
  const [view, setView] = useState('daily');
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Format date as M/D/YY
    const now = new Date();
    const formatted = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear().toString().slice(-2)}`;
    setCurrentDate(formatted);

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (newView) => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const filteredArchive = useMemo(() => {
    return ARCHIVE_DATA.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const NavItem = ({ label, target }) => (
    <button 
      onClick={() => navigateTo(target)}
      className={`hover:text-black transition-colors ${view === target ? 'text-black font-semibold' : 'text-gray-400'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#1a1a1a] selection:bg-black selection:text-white">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
          .font-serif-unique { font-family: 'Libre Baskerville', serif; }
          .font-sans-clean { font-family: 'Inter', sans-serif; }
          .article-body p { margin-bottom: 2rem; line-height: 1.8; font-size: 1.125rem; }
          .article-body h2 { font-size: 1.5rem; font-weight: 700; margin-top: 3.5rem; margin-bottom: 1.5rem; letter-spacing: -0.01em; color: #000; }
        `}
      </style>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-500 font-sans-clean ${isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-100 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-screen-md mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => navigateTo('daily')} className="font-medium tracking-tighter text-xl cursor-pointer">onearticle</button>
            <span className="hidden sm:block w-px h-4 bg-gray-200"></span>
            <span className="text-gray-400 font-medium tracking-tighter text-lg">{currentDate}</span>
          </div>
          <div className="flex items-center gap-6 text-xs uppercase tracking-widest">
            <NavItem label="Archive" target="archive" />
            <NavItem label="About" target="about" />
            <a href="mailto:lukephillips@berkeley.edu" className="text-gray-400 hover:text-black transition-colors">Submit</a>
          </div>
        </div>
      </nav>

      <main className="max-w-screen-md mx-auto px-6 pt-32 pb-32">
        {view === 'daily' && (
          <>
            <header className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-2 py-1 bg-gray-100 text-[10px] uppercase tracking-widest font-sans-clean font-bold rounded">{TODAY_ARTICLE.category}</span>
                <div className="flex items-center gap-1 text-gray-400 text-xs font-sans-clean">
                  <Clock size={12} />
                  <span>{TODAY_ARTICLE.readTime}</span>
                </div>
              </div>
              <h1 className="font-serif-unique text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8 tracking-tight">{TODAY_ARTICLE.title}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-6 border-y border-gray-100">
                <div className="flex-1 font-sans-clean">
                  <p className="text-sm font-medium">{TODAY_ARTICLE.author}</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mt-0.5">{TODAY_ARTICLE.institution}</p>
                </div>
                <a 
                  href={TODAY_ARTICLE.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-sm font-sans-clean hover:bg-gray-800 transition-all"
                >
                  Original Paper <ExternalLink size={14} />
                </a>
              </div>
            </header>
            <section className="mb-12 p-8 bg-gray-50 rounded-2xl border border-gray-100 font-serif-unique italic text-lg text-gray-700 leading-relaxed">
              "{TODAY_ARTICLE.abstract}"
            </section>
            <article className="article-body font-serif-unique text-[#333]">
              {TODAY_ARTICLE.content.map((block, idx) => block.type === 'heading' ? <h2 key={idx}>{block.text}</h2> : <p key={idx}>{block.text}</p>)}
            </article>
          </>
        )}

        {view === 'archive' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="font-serif-unique text-4xl mb-8">Archive</h2>
            <div className="mb-12 space-y-6 font-sans-clean">
              <div className="relative group">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search by article title..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-black transition-all"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
                    <X size={16} />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold border transition-all ${
                      selectedCategory === cat 
                      ? 'bg-black border-black text-white' 
                      : 'bg-white border-gray-100 text-gray-400 hover:border-gray-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-10">
              {filteredArchive.length > 0 ? (
                filteredArchive.map((item, idx) => (
                  <div key={idx} className="group border-b border-gray-100 pb-10 last:border-0">
                    <div className="flex items-center gap-3 mb-3">
                      <p className="font-sans-clean text-[10px] uppercase tracking-[0.2em] text-gray-400">{item.date}</p>
                      <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                      <p className="font-sans-clean text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-500">{item.category}</p>
                    </div>
                    <a href={item.link} className="font-serif-unique text-2xl hover:text-gray-500 transition-colors block leading-tight">
                      {item.title}
                    </a>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center font-sans-clean text-gray-400 italic">
                  No articles found matching your criteria.
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'about' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-xl font-serif-unique text-lg leading-relaxed text-[#333]">
            <h2 className="text-4xl mb-8">About</h2>
            <p className="mb-6">
              OneArticle was founded on the principle of depth over breadth. In an era of infinite scrolls and fragmented attention, we offer exactly one piece of rigorous thinking every twenty-four hours.
            </p>
            <p className="mb-6">
              Our selection process focuses on papers that bridge the gap between technical complexity and cultural relevance—research that doesn't just inform, but transforms how we perceive the world.
            </p>
            <p className="mb-12 text-sm text-gray-500 border-l-2 border-gray-100 pl-6 italic font-sans-clean leading-relaxed">
              Note: OneArticle does not own any of the sources or data shared here. This platform exists solely for the purpose of fostering conversation and disseminating knowledge. All intellectual property remains with the original authors and publishers.
            </p>
            <div className="pt-8 border-t border-gray-100">
              <p className="font-sans-clean text-xs uppercase tracking-widest text-gray-400 mb-4">Curated by</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-sans-clean text-sm font-bold">LP</div>
                <div>
                  <p className="font-sans-clean text-sm font-semibold">Luke Phillips</p>
                  <p className="font-sans-clean text-xs text-gray-400">University of California, Berkeley</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Unified Footer with reduced whitespace */}
        <footer className="mt-12 pt-8 border-t border-gray-100 text-center font-sans-clean">
          <div className="inline-block p-4 rounded-full bg-gray-50 mb-6">
            <BookOpen size={24} className="text-gray-300" />
          </div>
          {view === 'daily' ? (
            <>
              <h4 className="font-medium text-lg mb-2">That's it for today.</h4>
              <p className="text-gray-400 text-sm max-w-xs mx-auto mb-8">Check back in 24 hours for the next piece of curated research.</p>
            </>
          ) : (
            <button 
              onClick={() => navigateTo('daily')}
              className="flex items-center gap-2 mx-auto text-sm font-medium hover:gap-3 transition-all mb-8"
            >
              <ArrowLeft size={16} /> Return to today's article
            </button>
          )}
          <div className="flex justify-center gap-8 text-[10px] text-gray-300 uppercase tracking-widest">
            <button onClick={() => navigateTo('archive')} className="hover:text-black transition-colors text-xs">Archive</button>
            <button onClick={() => navigateTo('about')} className="hover:text-black transition-colors text-xs">About</button>
            <a href="mailto:lukephillips@berkeley.edu" className="hover:text-black transition-colors text-xs">Submit</a>
          </div>
        </footer>
      </main>

      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 p-3 bg-white border border-gray-100 shadow-sm rounded-full transition-all duration-300 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        <ChevronRight size={20} className="-rotate-90" />
      </button>
    </div>
  );
}
