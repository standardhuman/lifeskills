import './App.css'

const skills = [
  {
    domain: 'Business',
    name: 'weekly-review',
    description: 'GTD-based weekly planning and reflection',
    framework: 'Getting Things Done',
    color: 'bg-blue-500',
  },
  {
    domain: 'Business',
    name: 'decision-making',
    description: 'Strategic decisions with pre-mortem analysis',
    framework: 'First Principles + OODA Loop',
    color: 'bg-blue-500',
  },
  {
    domain: 'Productivity',
    name: 'daily-shutdown',
    description: 'End-of-day ritual for work-life boundaries',
    framework: 'Deep Work',
    color: 'bg-green-500',
  },
  {
    domain: 'Inner',
    name: 'self-connection',
    description: 'Emotional processing and self-awareness',
    framework: 'NVC + Focusing',
    color: 'bg-purple-500',
  },
  {
    domain: 'Communication',
    name: 'nvc-conversation',
    description: 'Nonviolent Communication for difficult conversations',
    framework: 'NVC',
    color: 'bg-orange-500',
  },
  {
    domain: 'Creative',
    name: 'brainstorming',
    description: 'Structured creative ideation process',
    framework: 'SCAMPER + Design Thinking',
    color: 'bg-pink-500',
  },
]

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Hero */}
      <header className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Life Skills
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-8">
          Workflow-based practices for all domains of life and work.
          Structured processes grounded in proven frameworks.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="https://github.com/standardhuman/life-skills"
            className="bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition"
          >
            View on GitHub
          </a>
          <a
            href="#skills"
            className="border border-slate-500 px-6 py-3 rounded-lg font-semibold hover:border-white transition"
          >
            Explore Skills
          </a>
        </div>
      </header>

      {/* What It Is */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">What is Life Skills?</h2>
          <p className="text-lg text-slate-300 mb-8">
            A collection of actionable, step-by-step workflows that help you navigate
            common situations across different life domains. Each skill provides a
            structured process to follow, preventing common failure modes and codifying
            best practices from established frameworks like GTD, NVC, and Design Thinking.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-slate-800/50 p-6 rounded-xl">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold mb-2">Actionable Steps</h3>
              <p className="text-slate-400 text-sm">
                Not vague principles, but concrete phases with specific actions and time estimates.
              </p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-xl">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="font-semibold mb-2">Research-Backed</h3>
              <p className="text-slate-400 text-sm">
                Every skill is grounded in established frameworks with proper citations.
              </p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-xl">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="font-semibold mb-2">AI-Friendly</h3>
              <p className="text-slate-400 text-sm">
                Designed for AI assistants like Claude Code to invoke and guide you through.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Available Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-slate-500 transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`${skill.color} text-xs px-2 py-1 rounded font-medium`}>
                  {skill.domain}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
              <p className="text-slate-400 text-sm mb-3">{skill.description}</p>
              <p className="text-xs text-slate-500">
                Framework: {skill.framework}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How to Use */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">How to Use</h2>

          <div className="space-y-8">
            <div className="bg-slate-800/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                <span className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                For Claude Code Users
              </h3>
              <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <p className="text-slate-400"># Clone to your Claude config directory</p>
                <p className="text-green-400">git clone https://github.com/standardhuman/life-skills.git ~/.claude/life-skills</p>
              </div>
              <p className="text-slate-400 mt-4 text-sm">
                Skills will be auto-discovered by Claude Code's skill system. The meta-skill
                will suggest relevant skills based on your conversation context.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                <span className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                Standalone Use
              </h3>
              <p className="text-slate-400 text-sm">
                Read skill files directly from <code className="bg-slate-900 px-2 py-1 rounded">skills/[domain]/[skill-name]/SKILL.md</code> and
                follow the workflows manually. Each skill includes step-by-step instructions,
                time estimates, and real-world examples.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                <span className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                Invoke a Skill
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                In Claude Code, skills are invoked automatically when relevant. You can also request them directly:
              </p>
              <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                <p className="text-slate-400">"I need to make a strategic decision about..."</p>
                <p className="text-blue-400 mt-2">→ Claude uses business:decision-making skill</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-slate-700">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400">
            Life Skills Framework • Open Source
          </p>
          <div className="flex gap-6">
            <a
              href="https://github.com/standardhuman/life-skills"
              className="text-slate-400 hover:text-white transition"
            >
              GitHub
            </a>
            <a
              href="https://github.com/standardhuman/life-skills/blob/main/CONTRIBUTING.md"
              className="text-slate-400 hover:text-white transition"
            >
              Contributing
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
