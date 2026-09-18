export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-24 max-w-6xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Projects</h1>
      <p className="text-gray-400 mb-12 text-lg">
        Integrated solar manufacturing, power generation, and data center infrastructure.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-zinc-800 p-8 rounded-xl bg-zinc-950 hover:border-zinc-700 transition">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">Manufacturing</span>
          <h2 className="text-2xl font-bold mt-2 mb-3">Solar PV Manufacturing</h2>
          <p className="text-gray-400">Utility-scale solar panel manufacturing integrated directly into clean energy value chains.</p>
        </div>

        <div className="border border-zinc-800 p-8 rounded-xl bg-zinc-950 hover:border-zinc-700 transition">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">Power Plant</span>
          <h2 className="text-2xl font-bold mt-2 mb-3">Utility Generation</h2>
          <p className="text-gray-400">Large-scale renewable power generation feeding clean power directly to grid infrastructure.</p>
        </div>
      </div>
    </main>
  );
}