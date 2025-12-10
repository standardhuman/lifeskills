import React, { useState, useMemo } from 'react';
import {
  Download,
  Github,
  Clock,
  BookOpen,
  ChevronRight,
  BrainCircuit,
  Layout,
  ArrowRight,
  Package,
  List,
  Grid
} from 'lucide-react';
import './App.css';

/**
 * DATA CONFIGURATION
 */
const DOMAINS = {
  PRODUCTIVITY: { id: 'productivity', label: 'Productivity', color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20', hover: 'hover:bg-green-400/20' },
  BUSINESS: { id: 'business', label: 'Business', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', hover: 'hover:bg-blue-400/20' },
  FINANCE: { id: 'finance', label: 'Finance', color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20', hover: 'hover:bg-emerald-400/20' },
  HEALTH: { id: 'health', label: 'Health', color: 'text-teal-400', bg: 'bg-teal-400/10', border: 'border-teal-400/20', hover: 'hover:bg-teal-400/20' },
  INNER: { id: 'inner', label: 'Inner', color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20', hover: 'hover:bg-purple-400/20' },
  COMMUNICATION: { id: 'communication', label: 'Communication', color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20', hover: 'hover:bg-orange-400/20' },
  CREATIVE: { id: 'creative', label: 'Creative', color: 'text-pink-400', bg: 'bg-pink-400/10', border: 'border-pink-400/20', hover: 'hover:bg-pink-400/20' },
};

// Configuration to control how sections are rendered in "All" view
const SECTIONS = [
  { id: 'productivity', title: 'Productivity', domains: ['PRODUCTIVITY'], color: 'text-green-400' },
  { id: 'business', title: 'Business', domains: ['BUSINESS'], color: 'text-blue-400' },
  { id: 'finance', title: 'Finance', domains: ['FINANCE'], color: 'text-emerald-400' },
  { id: 'health', title: 'Health', domains: ['HEALTH'], color: 'text-teal-400' },
  // Grouping sparse domains into one section to fix the "orphan card" visual issue
  { id: 'personal', title: 'Personal Growth', domains: ['INNER', 'COMMUNICATION', 'CREATIVE'], color: 'text-purple-400' },
];

const SKILLS_DATA = [
  // Productivity
  { id: 'scheduling', name: 'Scheduling', icon: '📅', duration: '5-15 min', framework: 'Multi-Source Integration', domain: 'PRODUCTIVITY', description: 'Intelligent daily/weekly planning with calendar, tasks, weather, fitness, and travel time integration.', phases: ['Gather Data', 'Analyze', 'Present', 'Execute'] },
  { id: 'weekly-review', name: 'Weekly Review', icon: '📋', duration: '60-90 min', framework: 'Getting Things Done', domain: 'PRODUCTIVITY', description: 'Clear your head, process inputs, and plan for the week ahead.', phases: ['Clear Inbox', 'Review Calendar', 'Update Lists', 'Plan Week'] },
  { id: 'daily-shutdown', name: 'Daily Shutdown', icon: '🌅', duration: '10-15 min', framework: 'Deep Work', domain: 'PRODUCTIVITY', description: 'Ritual to disconnect from work and transition to personal time.', phases: ['Review Tasks', 'Update Plan', 'Close Loops', 'Disconnect'] },
  { id: 'daily-startup', name: 'Daily Startup', icon: '🌄', duration: '15-20 min', framework: 'Deep Work + Atomic Habits', domain: 'PRODUCTIVITY', description: 'Prime your mind and environment for a focused day.', phases: ['Hydrate', 'Review Goals', 'Prioritize', 'Start'] },
  { id: 'decision-making', name: 'Decision Making', icon: '🎯', duration: '30-60 min', framework: 'First Principles + OODA', domain: 'PRODUCTIVITY', description: 'Systematic approach to solving complex problems.', phases: ['Observe', 'Orient', 'Decide', 'Act'] },

  // Business
  { id: 'business-planning', name: 'Business Planning', icon: '📈', duration: '2-3 hrs quarterly', framework: 'EOS + OKRs', domain: 'BUSINESS', description: 'Align team vision and set measurable quarterly objectives.', phases: ['Review V/T/O', 'Set Rocks', 'Identify Issues', 'Solve'] },
  { id: 'pricing-strategy', name: 'Pricing Strategy', icon: '💰', duration: '60-75 min', framework: 'Value-Based Pricing', domain: 'BUSINESS', description: 'Determine optimal pricing based on customer value.', phases: ['Analyze Value', 'Segment', 'Structure', 'Price'] },
  { id: 'client-management', name: 'Client Management', icon: '🤝', duration: 'Ongoing', framework: 'Customer Success', domain: 'BUSINESS', description: 'Framework for maintaining healthy client relationships.', phases: ['Onboard', 'Deliver', 'Review', 'Renew'] },
  { id: 'sales-proposals', name: 'Sales Proposals', icon: '📝', duration: '30-60 min', framework: 'SPIN Selling + MEDDIC', domain: 'BUSINESS', description: 'Create compelling proposals that address client pain points.', phases: ['Situation', 'Problem', 'Implication', 'Need-Payoff'] },
  { id: 'revenue-growth', name: 'Revenue Growth', icon: '🚀', duration: '1-2 hrs planning', framework: 'Growth Levers', domain: 'BUSINESS', description: 'Identify and activate key levers for business expansion.', phases: ['Acquisition', 'Activation', 'Retention', 'Referral'] },

  // Finance
  { id: 'budgeting', name: 'Budgeting', icon: '💵', duration: '30-45 min', framework: 'Zero-Based + YNAB', domain: 'FINANCE', description: 'Give every dollar a job and gain control of your cash flow.', phases: ['Income', 'Expenses', 'Allocate', 'Review'] },
  { id: 'financial-review', name: 'Financial Review', icon: '📊', duration: '30-60 min', framework: 'Personal CFO', domain: 'FINANCE', description: 'Monthly check-in on net worth and spending trends.', phases: ['Update Acts', 'Review Spend', 'Check Goals', 'Adjust'] },
  { id: 'big-purchases', name: 'Big Purchases', icon: '🛒', duration: '30-45 min', framework: 'Value-Based Spending', domain: 'FINANCE', description: 'Evaluate significant expenses against your values.', phases: ['Need Analysis', 'Research', 'Wait Rule', 'Buy'] },
  { id: 'debt-payoff', name: 'Debt Payoff', icon: '🎯', duration: '45-60 min', framework: 'Snowball/Avalanche', domain: 'FINANCE', description: 'Strategic plan to eliminate debt systematically.', phases: ['List Debts', 'Choose Strategy', 'Automate', 'Track'] },
  { id: 'retirement-planning', name: 'Retirement Plan', icon: '🏖️', duration: '45-60 min', framework: '4% Rule + Tax Opt', domain: 'FINANCE', description: 'Calculate numbers for financial independence.', phases: ['Calculate FI', 'Asset Alloc', 'Contribution', 'Project'] },
  { id: 'tax-mitigation', name: 'Tax Mitigation', icon: '📋', duration: '30-60 min', framework: 'Tax-Advantaged Strat', domain: 'FINANCE', description: 'Legally optimize your tax burden through planning.', phases: ['Deductions', 'Credits', 'Deferral', 'Harvesting'] },
  { id: 'portfolio-assessment', name: 'Portfolio Check', icon: '⚖️', duration: '45-60 min', framework: 'Modern Portfolio Theory', domain: 'FINANCE', description: 'Rebalance and assess asset allocation risk.', phases: ['Review', 'Compare', 'Rebalance', 'Execute'] },

  // Health
  { id: 'sleep-routine', name: 'Sleep Routine', icon: '😴', duration: '90 min wind-down', framework: 'Walker + Huberman', domain: 'HEALTH', description: 'Optimize sleep hygiene for recovery and performance.', phases: ['Darkness', 'Cooling', 'Relaxation', 'Sleep'] },
  { id: 'strength-program', name: 'Strength Program', icon: '🏋️', duration: '45-75 min', framework: '5/3/1 + Starting Strength', domain: 'HEALTH', description: 'Progressive overload training for physical resilience.', phases: ['Warmup', 'Compound', 'Accessory', 'Cooldown'] },
  { id: 'nutrition-planning', name: 'Nutrition Plan', icon: '🥗', duration: '2 hrs/week', framework: 'ISSN + Precision Nutri', domain: 'HEALTH', description: 'Fuel your body based on activity and goals.', phases: ['Macros', 'Meal Prep', 'Hydration', 'Track'] },

  // Personal Growth (Inner, Communication, Creative)
  { id: 'self-connection', name: 'Self Connection', icon: '💜', duration: '15-30 min', framework: 'NVC + Focusing', domain: 'INNER', description: 'Check in with your internal state and feelings.', phases: ['Pause', 'Notice', 'Feel', 'Need'] },
  { id: 'nvc-conversation', name: 'NVC Chat', icon: '💬', duration: '20-45 min', framework: 'Nonviolent Comm', domain: 'COMMUNICATION', description: 'Navigate difficult conversations with empathy.', phases: ['Observation', 'Feeling', 'Need', 'Request'] },
  { id: 'brainstorming', name: 'Brainstorming', icon: '💡', duration: '30-60 min', framework: 'SCAMPER + Design Thinking', domain: 'CREATIVE', description: 'Generate novel solutions to open-ended problems.', phases: ['Empathize', 'Define', 'Ideate', 'Prototype'] },
];

/**
 * COMPONENTS
 */

const Navbar = () => (
  <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-lg sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">L</span>
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          LifeSkills
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <a href="#skills" className="text-slate-400 hover:text-white transition-colors hidden sm:block">Explore</a>
        <a href="#howto" className="text-slate-400 hover:text-white transition-colors hidden sm:block">How to Use</a>
        <a
          href="https://github.com/standardhuman/lifeskills"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all"
        >
          <Github size={20} />
        </a>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <div className="relative overflow-hidden pt-16 pb-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm mb-8 animate-fade-in-up">
        <span className="flex h-2 w-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
        v2.0 Now Available for Claude
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
        Master your life with <br className="hidden md:block" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
          structured workflows.
        </span>
      </h1>

      <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400 mb-10">
        A library for life. Structured protocols for business, health, and <span className="text-purple-400">relationships</span>.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <a
          href="https://github.com/standardhuman/lifeskills"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-200 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Github size={20} />
          View on GitHub
        </a>
        <button
          onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
          className="px-8 py-4 rounded-xl bg-slate-800 text-white font-medium border border-slate-700 hover:bg-slate-700 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          Explore Skills
          <ArrowRight size={18} />
        </button>
      </div>
    </div>

    {/* Abstract Background Elements */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-all group">
    <div className="w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

const SkillCard = ({ skill, viewMode }) => {
  const domainConfig = DOMAINS[skill.domain];

  if (viewMode === 'list') {
    return (
      <div className="group flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700 hover:bg-slate-800/60 rounded-lg transition-all">
        <div className="flex items-center gap-4">
          <span className="text-2xl">{skill.icon}</span>
          <div>
            <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">{skill.name}</h3>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span className={`${domainConfig.color}`}>{domainConfig.label}</span>
              <span>•</span>
              <span>{skill.duration}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end text-xs text-slate-500">
            <span>{skill.framework}</span>
          </div>
          <a
            href={`/skills/${skill.id}.zip`}
            download
            className="p-2 text-slate-400 hover:text-white bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-all"
          >
            <Download size={16} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative flex flex-col bg-slate-800/40 border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 hover:shadow-2xl transition-all duration-300 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
    >
      <div className="p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl filter drop-shadow-lg">{skill.icon}</span>
            <div>
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-white transition-colors">
                {skill.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full border ${domainConfig.color} ${domainConfig.bg} ${domainConfig.border}`}>
                  {domainConfig.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
          {skill.description}
        </p>

        {/* Metadata */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock size={14} className="text-slate-400" />
            <span>{skill.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <BookOpen size={14} className="text-slate-400" />
            <span className="truncate">{skill.framework}</span>
          </div>
        </div>

        {/* Workflow Phases */}
        <div className="mb-6">
          <div className="flex items-center gap-1 text-xs text-slate-500 mb-2 uppercase tracking-wider font-semibold">
            Workflow Phases
          </div>
          <div className="flex items-center gap-1">
            {skill.phases.slice(0, 3).map((phase, idx) => (
              <React.Fragment key={idx}>
                <span className="text-[10px] bg-slate-900 border border-slate-700 px-2 py-1 rounded text-slate-300 whitespace-nowrap">
                  {phase}
                </span>
                {idx < 2 && <ChevronRight size={10} className="text-slate-600 flex-shrink-0" />}
              </React.Fragment>
            ))}
            {skill.phases.length > 3 && <span className="text-slate-600 text-xs">+</span>}
          </div>
        </div>

        {/* Action */}
        <a
          href={`/skills/${skill.id}.zip`}
          download
          className="w-full py-2.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-white text-sm font-medium border border-slate-600 hover:border-slate-500 flex items-center justify-center gap-2 transition-all"
        >
          <Download size={16} />
          Download .zip
        </a>
      </div>

      {/* Hover Gradient Effect */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${domainConfig.color.replace('text-', 'from-')} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
    </div>
  );
};

const App = () => {
  const [activeDomain, setActiveDomain] = useState('ALL');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const filteredSkills = useMemo(() => {
    if (activeDomain === 'ALL') return SKILLS_DATA;
    return SKILLS_DATA.filter(skill => skill.domain === activeDomain);
  }, [activeDomain]);

  const skillCounts = useMemo(() => {
    const counts = { ALL: SKILLS_DATA.length };
    Object.keys(DOMAINS).forEach(key => {
      counts[key] = SKILLS_DATA.filter(s => s.domain === key).length;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-blue-500/30">
      <Navbar />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Smart Discovery Section */}
        <section className="py-20 border-t border-slate-800/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Smart Skill Discovery</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Claude doesn't just store skills — it actively listens for context and suggests the right skill at the right time.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-5 rounded-xl bg-slate-800/40 border border-slate-700">
                <div className="text-purple-400 text-sm font-medium mb-2">You say:</div>
                <p className="text-slate-300 italic mb-4">"What's my day look like?"</p>
                <div className="text-emerald-400 text-sm font-medium mb-2">Claude suggests:</div>
                <p className="text-slate-400 text-sm">The <span className="text-white font-medium">Scheduling</span> skill, integrating calendar, tasks, weather, and fitness data.</p>
              </div>

              <div className="p-5 rounded-xl bg-slate-800/40 border border-slate-700">
                <div className="text-purple-400 text-sm font-medium mb-2">You say:</div>
                <p className="text-slate-300 italic mb-4">"I'm feeling really overwhelmed and frustrated..."</p>
                <div className="text-emerald-400 text-sm font-medium mb-2">Claude suggests:</div>
                <p className="text-slate-400 text-sm">The <span className="text-white font-medium">Self Connection</span> skill for processing emotions using NVC + Focusing techniques.</p>
              </div>

              <div className="p-5 rounded-xl bg-slate-800/40 border border-slate-700">
                <div className="text-purple-400 text-sm font-medium mb-2">You say:</div>
                <p className="text-slate-300 italic mb-4">"I need to figure out what to charge for this project..."</p>
                <div className="text-emerald-400 text-sm font-medium mb-2">Claude suggests:</div>
                <p className="text-slate-400 text-sm">The <span className="text-white font-medium">Pricing Strategy</span> skill for value-based pricing.</p>
              </div>

              <div className="p-5 rounded-xl bg-slate-800/40 border border-slate-700">
                <div className="text-purple-400 text-sm font-medium mb-2">You say:</div>
                <p className="text-slate-300 italic mb-4">"I can't decide whether to take this job offer..."</p>
                <div className="text-emerald-400 text-sm font-medium mb-2">Claude suggests:</div>
                <p className="text-slate-400 text-sm">The <span className="text-white font-medium">Decision Making</span> skill with pre-mortem analysis.</p>
              </div>
            </div>

            <p className="text-center text-slate-500 text-sm">
              Each skill includes trigger patterns so Claude knows exactly when to offer help — no manual invocation needed.
            </p>
          </div>
        </section>

        {/* Value Prop Section */}
        <section className="py-16 bg-slate-900/50 border-t border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={Layout}
                title="Actionable Steps"
                description="Not vague principles, but concrete phases with specific actions and time estimates you can follow immediately."
              />
              <FeatureCard
                icon={BookOpen}
                title="Research-Backed"
                description="Every skill is grounded in established frameworks like GTD, Deep Work, and NVC with proper citations."
              />
              <FeatureCard
                icon={BrainCircuit}
                title="AI-Native Design"
                description="Structured specifically for AI agents like Claude to ingest, understand, and guide you through the process."
              />
            </div>
          </div>
        </section>

        {/* Get Started Section */}
        <section className="py-20 border-b border-slate-800" id="howto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Get Started</h2>
              <p className="text-slate-400">Choose your preferred way to use LifeSkills.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Claude Code */}
              <div className="p-6 rounded-xl border border-indigo-400/30 bg-indigo-400/10 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <Package className="text-indigo-400" size={24} />
                  <h3 className="text-lg font-bold text-white">Claude Code</h3>
                </div>
                <span className="text-xs text-indigo-400 bg-indigo-400/20 px-2 py-1 rounded w-fit mb-3">Recommended</span>
                <p className="text-slate-400 text-sm mb-4 flex-grow">
                  Clone the repo and get all {SKILLS_DATA.length} skills at once. Skills auto-discover in Claude Code.
                </p>
                <div className="bg-slate-950 rounded-lg p-3 font-mono text-xs text-slate-300 border border-slate-800 mb-4 overflow-x-auto">
                  <code>git clone https://github.com/standardhuman/lifeskills.git ~/.claude/lifeskills</code>
                </div>
                <a
                  href="https://github.com/standardhuman/lifeskills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                >
                  <Github size={16} />
                  View on GitHub
                </a>
              </div>

              {/* Claude Desktop */}
              <div className="p-6 rounded-xl border border-purple-400/30 bg-purple-400/10 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <Download className="text-purple-400" size={24} />
                  <h3 className="text-lg font-bold text-white">Claude Desktop</h3>
                </div>
                <p className="text-slate-400 text-sm mb-4 flex-grow">
                  Download individual .zip files and upload via Settings → Capabilities → Skills. One skill per upload.
                </p>
                <button
                  onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium mt-auto"
                >
                  <ArrowRight size={16} />
                  Browse Skills Below
                </button>
              </div>

              {/* Standalone */}
              <div className="p-6 rounded-xl border border-slate-700 bg-slate-800/30 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <BookOpen className="text-slate-400" size={24} />
                  <h3 className="text-lg font-bold text-white">Standalone</h3>
                </div>
                <p className="text-slate-400 text-sm mb-4 flex-grow">
                  No AI needed. Each skill is a readable SKILL.md file you can follow step-by-step on your own.
                </p>
                <a
                  href="https://github.com/standardhuman/lifeskills/tree/main/skills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-300 text-sm font-medium mt-auto"
                >
                  <Github size={16} />
                  Browse on GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="skills">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Individual Skills</h2>
              <p className="text-slate-400">Library of {SKILLS_DATA.length} workflows across {Object.keys(DOMAINS).length} domains</p>
            </div>

            {/* View Toggle */}
            <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-slate-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                title="Grid View"
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-slate-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                title="List View"
              >
                <List size={18} />
              </button>
            </div>

            {/* Mobile Domain Select */}
            <div className="md:hidden w-full">
              <select
                value={activeDomain}
                onChange={(e) => setActiveDomain(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">All Skills ({skillCounts.ALL})</option>
                {Object.entries(DOMAINS).map(([key, config]) => (
                  <option key={key} value={key}>{config.label} ({skillCounts[key]})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop Filter Tabs */}
          <div className="hidden md:flex flex-wrap gap-2 mb-10 sticky top-20 z-40 bg-slate-900/90 py-4 backdrop-blur-md -mx-4 px-4 border-b border-transparent transition-all">
            <button
              onClick={() => setActiveDomain('ALL')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeDomain === 'ALL'
                  ? 'bg-white text-slate-900 shadow-lg scale-105'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              All <span className="ml-1 opacity-60 text-xs">{skillCounts.ALL}</span>
            </button>
            {Object.entries(DOMAINS).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setActiveDomain(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  activeDomain === key
                    ? `${config.bg} ${config.color} ${config.border} shadow-[0_0_15px_rgba(0,0,0,0.3)] scale-105`
                    : 'bg-slate-800 border-transparent text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {config.label} <span className="ml-1 opacity-60 text-xs">{skillCounts[key]}</span>
              </button>
            ))}
          </div>

          {/* Grid Content */}
          <div className={`space-y-6 ${viewMode === 'list' ? 'max-w-4xl mx-auto' : ''}`}>
            {activeDomain === 'ALL' ? (
              SECTIONS.map((section) => {
                // Find all skills that belong to domains in this section
                const sectionSkills = SKILLS_DATA.filter(skill => section.domains.includes(skill.domain));

                if (sectionSkills.length === 0) return null;

                return (
                  <div key={section.id} className="animate-fade-in">
                    {viewMode === 'grid' && (
                      <div className="flex items-center gap-4 mb-8 mt-12">
                        <h3 className={`text-2xl font-bold ${section.color}`}>{section.title}</h3>
                        <div className="h-px bg-slate-800 flex-grow"></div>
                      </div>
                    )}
                    <div className={viewMode === 'grid' ? "flex flex-wrap justify-center gap-6" : "space-y-3"}>
                      {sectionSkills.map(skill => (
                        <SkillCard key={skill.id} skill={skill} viewMode={viewMode} />
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={viewMode === 'grid' ? "flex flex-wrap justify-center gap-6" : "space-y-3"}>
                {filteredSkills.map(skill => (
                  <SkillCard key={skill.id} skill={skill} viewMode={viewMode} />
                ))}
              </div>
            )}

            {filteredSkills.length === 0 && (
              <div className="text-center py-20">
                <p className="text-slate-500 text-lg">No skills found for this category yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* Contribute Section */}
        <section className="py-24 bg-slate-800/20 border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Create Your Own Skills</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              LifeSkills is open source. Have a proven workflow you use repeatedly? Turn it into a skill others can use too.
            </p>

            <div className="inline-flex flex-col sm:flex-row gap-4">
              <a
                href="https://github.com/standardhuman/lifeskills/blob/main/skills/creating-lifeskills/SKILL.md"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-purple-500/20 text-purple-400 font-medium border border-purple-500/30 hover:bg-purple-500/30 transition-all flex items-center justify-center gap-2"
              >
                <BookOpen size={18} />
                Read the Creation Guide
              </a>
              <a
                href="https://github.com/standardhuman/lifeskills/pulls"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-slate-800 text-white font-medium border border-slate-700 hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <Github size={18} />
                Submit a Pull Request
              </a>
            </div>

            <p className="text-slate-500 text-sm mt-8">
              Skills should be grounded in established frameworks (GTD, NVC, etc.) and tested in real use.
            </p>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-800 bg-slate-950 text-center">
        <p className="text-slate-500 mb-4">
          Inspired by <a href="https://github.com/obra/superpowers" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">Superpowers</a> and built for the future of work.
        </p>
        <div className="flex justify-center gap-6">
          <a href="https://github.com/standardhuman/lifeskills" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-white transition-colors">GitHub</a>
          <a href="https://github.com/standardhuman/lifeskills/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-white transition-colors">Contributing</a>
          <a href="https://github.com/standardhuman/lifeskills/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-white transition-colors">License</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
