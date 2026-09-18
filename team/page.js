export default function TeamPage() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-24 max-w-6xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Leadership Team</h1>
      <p className="text-gray-400 mb-12 text-lg">Driving sustainable infrastructure and global energy transition.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div className="border border-zinc-800 p-6 rounded-xl bg-zinc-950">
          <div className="w-20 h-20 bg-zinc-800 rounded-full mb-4"></div>
          <h2 className="text-xl font-bold">Executive Director</h2>
          <p className="text-sm text-gray-400 mt-1">Convalt Energy Management</p>
        </div>
        <div className="border border-zinc-800 p-6 rounded-xl bg-zinc-950">
          <div className="w-20 h-20 bg-zinc-800 rounded-full mb-4"></div>
          <h2 className="text-xl font-bold">Chief Operations Officer</h2>
          <p className="text-sm text-gray-400 mt-1">Infrastructure Development</p>
        </div>
      </div>
    </main>
  );
}