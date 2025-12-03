import React, { useState, useMemo } from 'react';
import {
  Download,
  Github,
  Clock,
  BookOpen,
  ChevronRight,
  Layout,
  BrainCircuit,
  ArrowRight,
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

const SKILLS_DATA = [
  // Productivity
  { id: 'weekly-review', name: 'Weekly Review', icon: '📋', duration: '60-90 min', framework: 'Getting Things Done', domain: 'PRODUCTIVITY', description: 'Clear mental clutter, review all open loops, and plan the week ahead with intention.', phases: ['Collect', 'Process', 'Organize', 'Review', 'Plan'] },
  { id: 'daily-shutdown', name: 'Daily Shutdown', icon: '🌅', duration: '10-15 min', framework: 'Deep Work', domain: 'PRODUCTIVITY', description: 'Achieve psychological closure so work thoughts don\'t intrude on personal time.', phases: ['Capture', 'Review', 'Plan', 'Tidy', 'Close'] },
  { id: 'daily-startup', name: 'Daily Startup', icon: '🌄', duration: '15-20 min', framework: 'Deep Work + Atomic Habits', domain: 'PRODUCTIVITY', description: 'Start work with intention and clarity instead of reactive scrambling.', phases: ['Prepare', 'Launch', 'Review', 'Prime', 'Focus', 'Execute'] },
  { id: 'decision-making', name: 'Decision Making', icon: '🎯', duration: '30-60 min', framework: 'First Principles + OODA Loop', domain: 'PRODUCTIVITY', description: 'Navigate complex decisions by framing the real question, gathering options, and stress-testing your choice.', phases: ['Frame', 'Gather', 'Options', 'Evaluate', 'Decide', 'Act'] },

  // Business
  { id: 'business-planning', name: 'Business Planning', icon: '📈', duration: '2-3 hrs quarterly', framework: 'EOS + OKRs', domain: 'BUSINESS', description: 'Set business direction with clear goals and 90-day execution sprints.', phases: ['Vision', 'Annual Goals', 'Quarterly Rocks', 'Weekly Execution'] },
  { id: 'pricing-strategy', name: 'Pricing Strategy', icon: '💰', duration: '60-75 min', framework: 'Value-Based Pricing', domain: 'BUSINESS', description: 'Price products and services based on value delivered, not just costs.', phases: ['Value', 'Cost', 'Market', 'Position', 'Structure'] },
  { id: 'client-management', name: 'Client Management', icon: '🤝', duration: 'Ongoing', framework: 'Customer Success', domain: 'BUSINESS', description: 'Build lasting client relationships through systematic communication and value delivery.', phases: ['Onboarding', 'Active', 'Retention', 'Offboarding'] },
  { id: 'sales-proposals', name: 'Sales Proposals', icon: '📝', duration: '30-60 min/proposal', framework: 'SPIN Selling + MEDDIC', domain: 'BUSINESS', description: 'Win more deals through discovery-based selling and compelling proposals.', phases: ['Qualify', 'Discover', 'Present', 'Close', 'Follow-up'] },
  { id: 'revenue-growth', name: 'Revenue Growth', icon: '🚀', duration: '1-2 hrs planning', framework: 'Growth Levers', domain: 'BUSINESS', description: 'Systematically grow revenue through leads, conversion, value, frequency, and retention.', phases: ['Leads', 'Conversion', 'Value', 'Frequency', 'Retention'] },

  // Finance
  { id: 'budgeting', name: 'Budgeting', icon: '💵', duration: '30-45 min initial', framework: 'Zero-Based Budgeting + YNAB', domain: 'FINANCE', description: 'Allocate every dollar to a purpose before the month begins.', phases: ['Income', 'Fixed', 'Variable', 'Goals', 'Balance'] },
  { id: 'financial-review', name: 'Financial Review', icon: '📊', duration: '30-60 min monthly', framework: 'Personal CFO', domain: 'FINANCE', description: 'Track net worth, review cash flow, and assess progress toward financial goals.', phases: ['Gather', 'Net Worth', 'Cash Flow', 'Goals', 'Actions'] },
  { id: 'big-purchases', name: 'Big Purchases', icon: '🛒', duration: '30-45 min', framework: 'Value-Based Spending', domain: 'FINANCE', description: 'Evaluate major purchases against values, affordability, and alternatives.', phases: ['Pause', 'Afford', 'Align', 'Optimize', 'Decide'] },
  { id: 'debt-payoff', name: 'Debt Payoff', icon: '🎯', duration: '45-60 min planning', framework: 'Debt Snowball/Avalanche', domain: 'FINANCE', description: 'Pay off debt using avalanche or snowball method with momentum-building milestones.', phases: ['Inventory', 'Strategy', 'Plan', 'Accelerate', 'Execute'] },
  { id: 'retirement-planning', name: 'Retirement Planning', icon: '🏖️', duration: '45-60 min', framework: '4% Rule + Tax Optimization', domain: 'FINANCE', description: 'Calculate your retirement number and optimize account contributions.', phases: ['Envision', 'Calculate', 'Assess', 'Plan', 'Execute'] },
  { id: 'tax-mitigation', name: 'Tax Mitigation', icon: '📋', duration: '30-60 min', framework: 'Tax-Advantaged Strategies', domain: 'FINANCE', description: 'Reduce tax burden through retirement accounts, timing, and smart planning.', phases: ['Retirement', 'HSA', 'Harvesting', 'Charitable', 'Timing'] },
  { id: 'portfolio-assessment', name: 'Portfolio Assessment', icon: '⚖️', duration: '45-60 min', framework: 'Modern Portfolio Theory', domain: 'FINANCE', description: 'Review investment portfolio for risk alignment, fees, and rebalancing needs.', phases: ['Inventory', 'Allocation', 'Target', 'Evaluate', 'Rebalance'] },

  // Health
  { id: 'sleep-routine', name: 'Sleep Routine', icon: '😴', duration: '90 min wind-down', framework: 'Matthew Walker + Huberman', domain: 'HEALTH', description: 'Create conditions for quality sleep through wind-down rituals and environment optimization.', phases: ['Wind-Down', 'Environment', 'Pre-Sleep', 'Wake Protocol', 'Consistency'] },
  { id: 'strength-program', name: 'Strength Program', icon: '🏋️', duration: '45-75 min/session', framework: '5/3/1 + Starting Strength', domain: 'HEALTH', description: 'Build strength systematically through compound movements, tracking, and planned progression.', phases: ['Program', 'Execute', 'Track', 'Progress', 'Deload'] },
  { id: 'nutrition-planning', name: 'Nutrition Planning', icon: '🥗', duration: '2 hrs/week prep', framework: 'ISSN + Precision Nutrition', domain: 'HEALTH', description: 'Fuel your body with a flexible, sustainable approach to meal planning and tracking.', phases: ['Calculate', 'Plan', 'Prep', 'Track', 'Adjust'] },

  // Other
  { id: 'self-connection', name: 'Self Connection', icon: '💜', duration: '15-30 min', framework: 'NVC + Focusing', domain: 'INNER', description: 'Process difficult emotions by connecting with body sensations and identifying underlying needs.', phases: ['Pause', 'Body', 'Feeling', 'Need', 'Respond'] },
  { id: 'nvc-conversation', name: 'NVC Conversation', icon: '💬', duration: '20-45 min', framework: 'Nonviolent Communication', domain: 'COMMUNICATION', description: 'Navigate conflict by expressing observations, feelings, needs, and requests without blame.', phases: ['Prepare', 'Observe', 'Feel', 'Need', 'Request', 'Listen'] },
  { id: 'brainstorming', name: 'Brainstorming', icon: '💡', duration: '30-60 min', framework: 'SCAMPER + Design Thinking', domain: 'CREATIVE', description: 'Generate innovative ideas using proven creativity frameworks and escape conventional thinking.', phases: ['Diverge', 'Challenge', 'Combine', 'Converge', 'Refine'] },
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
      <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm mb-8">
        <span className="flex h-2 w-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
        Now Available for Claude Desktop
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
        Master your life with <br className="hidden md:block" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
          structured workflows.
        </span>
      </h1>

      <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400 mb-10">
        A collection of {SKILLS_DATA.length} proven frameworks for productivity, business, finance, and health.
        Designed for AI assistants, but perfect for humans.
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
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
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

const SkillCard = ({ skill }) => {
  const domainConfig = DOMAINS[skill.domain];

  return (
    <div className="group relative flex flex-col bg-slate-800/40 border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 hover:shadow-2xl transition-all duration-300">
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
          <div className="flex items-center gap-1 flex-wrap">
            {skill.phases.slice(0, 3).map((phase, idx) => (
              <React.Fragment key={idx}>
                <span className="text-[10px] bg-slate-900 border border-slate-700 px-2 py-1 rounded text-slate-300 whitespace-nowrap">
                  {phase}
                </span>
                {idx < 2 && <ChevronRight size={10} className="text-slate-600 flex-shrink-0" />}
              </React.Fragment>
            ))}
            {skill.phases.length > 3 && <span className="text-slate-500 text-xs ml-1">+{skill.phases.length - 3}</span>}
          </div>
        </div>

        {/* Action */}
        <a
          href={`/skills/${skill.id}.zip`}
          download
          className="w-full py-2.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-white text-sm font-medium border border-slate-600 hover:border-slate-500 flex items-center justify-center gap-2 transition-all"
        >
          <Download size={16} />
          Download for Claude
        </a>
      </div>

      {/* Hover Gradient Effect */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${domainConfig.color.replace('text-', 'from-')} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
    </div>
  );
};

const HowToUseStep = ({ number, title, description, code }) => (
  <div className="flex gap-4 sm:gap-6">
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-bold shadow-lg">
      {number}
    </div>
    <div className="flex-grow">
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 mb-4">{description}</p>
      {code && (
        <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm text-slate-300 border border-slate-800 overflow-x-auto">
          <code>{code}</code>
        </div>
      )}
    </div>
  </div>
);

const App = () => {
  const [activeDomain, setActiveDomain] = useState('ALL');

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

        {/* Value Prop Section */}
        <section className="py-16 bg-slate-900/50 border-y border-slate-800">
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

        {/* Skills Section */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="skills">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Available Skills</h2>
              <p className="text-slate-400">Library of {SKILLS_DATA.length} workflows across {Object.keys(DOMAINS).length} domains</p>
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
                    ? `${config.bg} ${config.color} ${config.border} shadow-lg scale-105`
                    : 'bg-slate-800 border-transparent text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {config.label} <span className="ml-1 opacity-60 text-xs">{skillCounts[key]}</span>
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSkills.map(skill => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>

          {filteredSkills.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">No skills found for this category yet.</p>
            </div>
          )}
        </section>

        {/* How to Use */}
        <section className="py-24 bg-slate-800/20 border-t border-slate-800" id="howto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">How to use LifeSkills</h2>
              <p className="text-slate-400">Get started in less than 5 minutes.</p>
            </div>

            <div className="space-y-12">
              <HowToUseStep
                number="1"
                title="For Claude Code Users"
                description="Clone the repository to your Claude config directory. Skills will be auto-discovered."
                code="git clone https://github.com/standardhuman/lifeskills.git ~/.claude/lifeskills"
              />
              <HowToUseStep
                number="2"
                title="For Claude Desktop"
                description="Download any skill's .zip file above and upload it to Claude Desktop via Settings → Skills → Upload."
              />
              <HowToUseStep
                number="3"
                title="Standalone Use"
                description="Each skill is a readable markdown file. Download, open SKILL.md, and follow the workflow step-by-step. No AI required."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-800 bg-slate-950 text-center">
        <p className="text-slate-500 mb-4">
          Inspired by <a href="https://github.com/obra/superpowers" className="text-slate-300 hover:text-white transition-colors">Superpowers</a> and built for the future of work.
        </p>
        <div className="flex justify-center gap-6">
          <a href="https://github.com/standardhuman/lifeskills" className="text-slate-600 hover:text-white transition-colors">GitHub</a>
          <a href="https://github.com/standardhuman/lifeskills/blob/main/CONTRIBUTING.md" className="text-slate-600 hover:text-white transition-colors">Contributing</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
