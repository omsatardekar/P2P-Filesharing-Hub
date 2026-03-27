import PublicLayout from "../../layouts/PublicLayout";

export default function Features() {
  const features = [
    {
      title: "Real-Time P2P Transfer",
      desc: "True browser-to-browser file transfer powered by WebRTC with ultra-low latency.",
      icon: "bolt"
    },
    {
      title: "Admin Broadcast",
      desc: "Instantly distribute files to all connected systems with a single secure action.",
      icon: "campaign"
    },
    {
      title: "Secure Authentication",
      desc: "Enterprise-grade role-based authentication with strict access control.",
      icon: "lock"
    },
    {
      title: "Live User Presence",
      desc: "View real-time student availability across the lab infrastructure.",
      icon: "group"
    },
    {
      title: "Transfer History",
      desc: "Complete audit trail of all file exchanges with precise timestamps.",
      icon: "history"
    },
    {
      title: "LAN Optimized",
      desc: "Engineered for lightning-fast performance within institutional LAN networks.",
      icon: "lan"
    }
  ];

  return (
    <PublicLayout>
      {/* ================= DARK PREMIUM FEATURES ================= */}
      <section className="relative py-32 overflow-hidden bg-[#0b0a0c] text-white">

        {/* Atmospheric Background Layers */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(120,30,30,0.25),_transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(90,40,20,0.25),_transparent_60%)]"></div>

        {/* Accent Blobs */}
        <div className="absolute -top-48 -left-40 w-[520px] h-[520px] bg-[#7a1f1f] rounded-full blur-[180px] opacity-25"></div>
        <div className="absolute top-1/4 -right-48 w-[520px] h-[520px] bg-[#5b2a18] rounded-full blur-[180px] opacity-25"></div>
        <div className="absolute bottom-0 left-1/3 w-[420px] h-[420px] bg-[#3b1d4a] rounded-full blur-[160px] opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-8">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="inline-flex items-center gap-2 mb-6 px-6 py-2 rounded-full 
              bg-white/5 border border-white/10 backdrop-blur-md text-sm tracking-wide">
              <span className="material-symbols-outlined text-base text-[#e08a6e]">
                auto_awesome
              </span>
              Platform Capabilities
            </span>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold mb-6 leading-tight">
              Built for
              <span className="bg-gradient-to-r from-[#d24c4c] via-[#e08a6e] to-[#b85cff] bg-clip-text text-transparent">
                {" "}Next-Gen Smart Labs
              </span>
            </h1>

            <p className="text-white/65 text-lg md:text-xl">
              A high-performance, secure file distribution system crafted for
              modern academic infrastructure.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
            {features.map((f, i) => (
              <div
                key={i}
                className="group relative rounded-[30px] p-[1px] 
                  bg-gradient-to-br from-[#7a1f1f]/60 via-[#2a0f0f]/40 to-[#3b1d4a]/60
                  hover:from-[#d24c4c] hover:to-[#b85cff] transition-all duration-500"
              >
                <div className="relative h-full rounded-[29px] bg-[#0f0e11]/90 backdrop-blur-xl 
                  border border-white/10 p-10 shadow-[0_30px_80px_rgba(0,0,0,0.7)]
                  transition-all duration-500 group-hover:-translate-y-3">

                  {/* Icon */}
                  <div className="w-16 h-16 mb-8 rounded-2xl 
                    bg-gradient-to-br from-[#d24c4c] via-[#e08a6e] to-[#5b2a18]
                    flex items-center justify-center shadow-xl
                    group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-3xl text-white">
                      {f.icon}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-semibold mb-4 tracking-tight 
                    group-hover:text-[#e08a6e] transition-colors">
                    {f.title}
                  </h3>

                  <p className="text-white/65 leading-relaxed">
                    {f.desc}
                  </p>

                  {/* Soft Hover Glow */}
                  <div className="pointer-events-none absolute inset-0 rounded-[29px] 
                    bg-gradient-to-br from-[#d24c4c]/10 to-[#b85cff]/10 
                    opacity-0 group-hover:opacity-100 transition duration-500"></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </PublicLayout>
  );
}
