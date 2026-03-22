import { useState, useRef, useEffect } from "react";

const ACCENTS = [
  "bg-purple-600",
  "bg-pink-500",
  "bg-cyan-400",
  "bg-green-500",
  "bg-yellow-500",
];

function getInitialTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// ── Custom Dropdown ──────────────────────────────────────────────
function Dropdown({ label, value, setter, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const displayLabel =
    typeof options[0] === "string"
      ? value
      : options.find((o) => o.v === value)?.l || value;

  return (
    <div ref={ref} className="relative">
      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
        {label}
      </label>

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-left flex items-center justify-between gap-2 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/50 transition text-gray-800 dark:text-gray-200 cursor-pointer hover:border-purple-400 dark:hover:border-purple-500"
      >
        <span>{displayLabel}</span>
        {/* Sharp SVG chevron */}
        <svg
          className={`w-3.5 h-3.5 text-gray-500 dark:text-gray-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L6 7L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute z-50 mt-1.5 w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden">
          {options.map((o) => {
            const val = typeof o === "string" ? o : o.v;
            const lbl = typeof o === "string" ? o : o.l;
            const isActive = val === value;
            return (
              <button
                key={val}
                type="button"
                onClick={() => { setter(val); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between gap-2
                  ${isActive
                    ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/60"
                  }`}
              >
                {lbl}
                {isActive && (
                  <svg className="w-3.5 h-3.5 shrink-0 text-purple-600 dark:text-purple-400" viewBox="0 0 12 10" fill="none">
                    <path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── IdeaCard ─────────────────────────────────────────────────────
function IdeaCard({ idea, index }) {
  const [scriptOpen, setScriptOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const safeHashtags = Array.isArray(idea.hashtags) ? idea.hashtags : [];
  const safeScript = idea.script || { hook: "", content: "", cta: "" };
  const accentCol = ACCENTS[index % ACCENTS.length];

  const fullText = `Title: ${idea.title}\nThumbnail: ${idea.thumbnail_text}\nHashtags: ${safeHashtags.join(" ")}\nHook: ${idea.hook}\nScript - Hook: ${safeScript.hook}\nScript - Content: ${safeScript.content}\nScript - CTA: ${safeScript.cta}\nFormat: ${idea.format}\nPlatform: ${idea.platform}\nWhy Viral: ${idea.viral_reason}\nTip: ${idea.tip}`;

  function copyIdea() {
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group relative overflow-hidden">
      <div className={`absolute top-0 left-0 w-1 h-full ${accentCol}`}></div>

      <div className="flex items-start justify-between mb-4 pl-2">
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">IDEA #{index + 1}</span>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight pr-4 group-hover:text-purple-600 transition-colors">{idea.title}</h3>
        </div>
        <button onClick={copyIdea} className="shrink-0 text-gray-500 hover:text-purple-600 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 p-2 rounded-lg transition" title="Copy Idea">
          {copied ? "✅" : "📋"}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-5 pl-2">
        <span className="text-[11px] font-medium flex items-center gap-1.5 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2.5 py-1 rounded-md border border-purple-100 dark:border-purple-800/50">📱 {idea.platform}</span>
        <span className="text-[11px] font-medium flex items-center gap-1.5 bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-2.5 py-1 rounded-md border border-pink-100 dark:border-pink-800/50">🎬 {idea.format}</span>
      </div>

      <div className="space-y-4 flex-grow text-sm pl-2">
        <div className="bg-gray-50 dark:bg-slate-900 p-3.5 rounded-xl border-l-2 border-purple-600 shadow-inner">
          <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold mb-1.5 uppercase tracking-wider">🎯 Opening Hook</p>
          <p className="font-medium italic text-gray-800 dark:text-gray-200">"{idea.hook}"</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold mb-1.5 uppercase tracking-wider">🔥 Why It Goes Viral</p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{idea.viral_reason}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold mb-1.5 uppercase tracking-wider">💡 Pro Tip</p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{idea.tip}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold mb-2.5 uppercase tracking-wider"># Trending Hashtags</p>
          <div className="flex flex-wrap gap-2">
            {safeHashtags.map((h, i) => (
              <span key={i} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-3 py-1 rounded-full font-medium border border-gray-200 dark:border-gray-700 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-default">{h}</span>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-600/5 to-pink-500/5 dark:from-purple-600/10 dark:to-pink-500/10 border border-purple-600/20 p-4 rounded-xl text-center mt-4">
          <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold mb-1.5 uppercase tracking-wider">🖼 Thumbnail Idea</p>
          <p className="font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 text-lg leading-tight uppercase">{idea.thumbnail_text || "ENGAGING THUMBNAIL"}</p>
        </div>
      </div>

      <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-800 pl-2">
        <button onClick={() => setScriptOpen(!scriptOpen)} className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-semibold rounded-xl transition text-sm flex items-center justify-center gap-2">
          {scriptOpen ? "Hide Script ▲" : "Show Script ▼"}
        </button>
        {scriptOpen && (
          <div className="mt-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-sm space-y-4 shadow-inner">
            <h4 className="font-bold text-cyan-400 text-xs uppercase tracking-widest mb-3 text-center border-b border-gray-200 dark:border-gray-700 pb-2">30 Second Video Script</h4>
            <div>
              <span className="block text-[10px] font-bold text-purple-600 mb-1 uppercase tracking-wider">Hook</span>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{safeScript.hook}</p>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-pink-500 mb-1 uppercase tracking-wider">Content</span>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{safeScript.content}</p>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-cyan-400 mb-1 uppercase tracking-wider">Call to Action</span>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{safeScript.cta}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Home ─────────────────────────────────────────────────────────
export default function Home() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [keyModalOpen, setKeyModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("groq_api_key") || "");
  const [apiKeyInput, setApiKeyInput] = useState(() => localStorage.getItem("groq_api_key") || "");
  const [keyStatus, setKeyStatus] = useState(
    localStorage.getItem("groq_api_key") ? { msg: "API key loaded. Ready to generate!", cls: "text-green-600" } : null
  );

  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("All Platforms");
  const [audience, setAudience] = useState("General Audience");
  const [style, setStyle] = useState("Any Style");
  const [count, setCount] = useState("5");

  const [trends, setTrends] = useState([]);
  const [trendsLoading, setTrendsLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
    setTheme(next);
  }

  function saveKey() {
    const val = apiKeyInput.trim();
    if (!val) { setKeyStatus({ msg: "Please paste your API key.", cls: "text-red-500" }); return; }
    if (!val.startsWith("gsk_")) { setKeyStatus({ msg: "Key should start with gsk_", cls: "text-red-500" }); return; }
    setApiKey(val);
    localStorage.setItem("groq_api_key", val);
    setKeyStatus({ msg: "Key saved successfully! 🎉", cls: "text-green-600" });
    setTimeout(() => setKeyModalOpen(false), 1500);
  }

  async function fetchTrends() {
    if (!apiKey) { setError("Please set your Groq API key first in settings."); setKeyModalOpen(true); return; }
    if (!topic) { setError("Enter a Topic/Niche first to detect trends."); return; }
    setError("");
    setTrendsLoading(true);
    const prompt = `List 5 trending high-viral video topics right now for the niche: "${topic}".\nReply ONLY with a JSON array of strings, no markdown, no other text.\nExample: ["Budget Travel Hacks", "Hidden Places in India", "Solo Travel Fails", "AI Planning My Trip", "Street Food Challenges"]`;
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + apiKey },
        body: JSON.stringify({ model: "llama-3.3-70b-versatile", messages: [{ role: "system", content: "You are a viral trend analyst. Always return valid JSON only." }, { role: "user", content: prompt }], temperature: 0.8, max_tokens: 500 }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      let raw = data.choices[0].message.content.trim().replace(/```json|```/g, "").trim();
      setTrends(JSON.parse(raw));
    } catch (err) {
      setError("Trend Error: " + err.message);
    } finally {
      setTrendsLoading(false);
    }
  }

  async function generateIdeas() {
    if (!apiKey) { setError("Please set your Groq API key first in settings."); setKeyModalOpen(true); return; }
    if (!topic) { setError("Please enter a Topic/Niche."); return; }
    setError("");
    setShowResults(false);
    setGenerating(true);
    const prompt = `You are a viral content strategist. Generate exactly ${count} unique viral video ideas for the topic: "${topic}".\nPlatform: ${platform} | Audience: ${audience} | Style: ${style}\n\nRequirements:\n- Include 5-10 relevant viral hashtags.\n- A 3-6 word catchy thumbnail text.\n- A 30-second short script structured with hook, content, and cta.\n\nReply ONLY with a JSON array, no markdown, no extra text:\n[{"title":"...","thumbnail_text":"...","hook":"...","script":{"hook":"...","content":"...","cta":"..."},"hashtags":["#...","#..."],"format":"...","platform":"...","viral_reason":"...","tip":"..."}]`;
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + apiKey },
        body: JSON.stringify({ model: "llama-3.3-70b-versatile", messages: [{ role: "system", content: "You are a viral social media content expert. Always respond with valid JSON only, no explanations." }, { role: "user", content: prompt }], temperature: 0.9, max_tokens: 3500 }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      let raw = data.choices[0].message.content.trim().replace(/```json|```/g, "").trim();
      setIdeas(JSON.parse(raw));
      setShowResults(true);
      setTimeout(() => document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (err) {
      setError("Generation Error: " + err.message + ". Please check your API key & try again.");
    } finally {
      setGenerating(false);
    }
  }

  const dropdowns = [
    { label: "Platform", value: platform, setter: setPlatform, options: ["All Platforms", "YouTube", "Instagram Reels", "TikTok", "YouTube Shorts", "Facebook Reels"] },
    { label: "Audience", value: audience, setter: setAudience, options: ["General Audience", "Teenagers (13-18)", "Young Adults (18-25)", "Adults (25-40)", "Parents", "Students", "Professionals"] },
    { label: "Video Style", value: style, setter: setStyle, options: ["Any Style", "Funny and Entertaining", "Educational and Informative", "Emotional and Inspiring", "Shocking and Surprising", "Challenge and Trend", "Story-based"] },
    { label: "Number of Ideas", value: count, setter: setCount, options: [{ v: "3", l: "3 Ideas" }, { v: "5", l: "5 Ideas" }] },
  ];

  return (
    <div className="bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white font-sans min-h-screen flex flex-col transition-colors duration-300">

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎬</span>
              <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">Viral Video Idea Generator</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setKeyModalOpen(true)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition" title="API Key Settings">⚙️</button>
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition" title="Toggle Theme">🌓</button>
            </div>
          </div>
        </div>
      </nav>

      {/* KEY MODAL */}
      {keyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl w-full max-w-md shadow-2xl relative">
            <button onClick={() => setKeyModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white transition">✕</button>
            <h3 className="text-xl font-bold mb-2">API Key Settings</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">You need a free Groq API key to generate ideas.</p>
            <input type="password" value={apiKeyInput} onChange={(e) => setApiKeyInput(e.target.value)} placeholder="gsk_..."
              className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 mb-3 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 text-sm transition" />
            <button onClick={saveKey} className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white font-semibold py-2.5 rounded-lg transition shadow-md hover:shadow-lg">Save Key</button>
            {keyStatus && <div className={`mt-3 text-sm text-center font-medium ${keyStatus.cls}`}>{keyStatus.msg}</div>}
          </div>
        </div>
      )}

      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-8">

        {/* TRENDING */}
        <section className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <h2 className="text-lg font-semibold flex items-center gap-2">🔥 Trending Topics</h2>
            <button onClick={fetchTrends} disabled={trendsLoading}
              className="text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-cyan-400 font-medium px-4 py-2 rounded-full transition border border-gray-200 dark:border-gray-700 shadow-sm w-fit disabled:opacity-60">
              {trendsLoading ? <span className="animate-pulse">Detecting...</span> : "Detect Trends"}
            </button>
          </div>
          <div className="flex overflow-x-auto gap-3 pb-2 py-1" style={{ scrollbarWidth: "none" }}>
            {trends.length === 0 ? (
              <div className="px-4 py-2 rounded-full border border-dashed border-gray-300 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap hidden sm:block">
                Click "Detect Trends" to discover hot niches
              </div>
            ) : (
              trends.map((t, i) => (
                <button key={i} onClick={() => setTopic(t)}
                  className="whitespace-nowrap bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 hover:border-purple-600 hover:text-purple-600 dark:hover:text-purple-400 px-4 py-2 rounded-full text-sm font-medium transition shadow-sm text-gray-700 dark:text-gray-300">
                  {t}
                </button>
              ))
            )}
          </div>
        </section>

        {/* HERO INPUT */}
        <section className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-10 shadow-xl mb-12 relative overflow-hidden transition-colors duration-300">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              🚀 Generate{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Scroll-Stopping</span>{" "}
              Video Ideas
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">AI-powered concepts tailored for maximum virality.</p>
          </div>

          <div className="relative z-100 grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Topic *</label>
              <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} onKeyDown={(e) => e.key === "Enter" && generateIdeas()}
                placeholder="e.g. AI tools, fitness routines, budget travel..."
                className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 md:py-4 text-base md:text-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/50 transition placeholder-gray-400 dark:placeholder-gray-600 shadow-inner" />
            </div>

            {dropdowns.map((d) => (
              <Dropdown key={d.label} label={d.label} value={d.value} setter={d.setter} options={d.options} />
            ))}
          </div>

          <div className="relative z-10 text-center mt-6">
            <button onClick={generateIdeas} disabled={generating}
              className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-lg rounded-full shadow-[0_4px_14px_0_rgba(124,58,237,0.39)] hover:shadow-[0_6px_20px_rgba(236,72,153,0.23)] hover:-translate-y-1 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0">
              🔥 Generate Viral Ideas
            </button>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm rounded-xl text-center font-medium">{error}</div>
          )}
        </section>

        {/* LOADER */}
        {generating && (
          <div className="py-12 text-center">
            <div className="inline-flex gap-2.5 items-center justify-center mb-4">
              <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wide">Crafting your viral concepts...</p>
          </div>
        )}

        {/* RESULTS */}
        {showResults && (
          <section id="results-section">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">✨ Generated Ideas</h2>
              <button onClick={() => { setShowResults(false); setIdeas([]); }}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                ✕ Clear
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ideas.map((idea, i) => <IdeaCard key={i} idea={idea} index={i} />)}
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400 text-sm mt-auto bg-white dark:bg-slate-900 transition-colors duration-300">
        <p className="mt-1">© 2026 Viral Video Idea Generator</p>
      </footer>
    </div>
  );
}