import PublicLayout from "../../layouts/PublicLayout";

export default function About() {
  return (
    <PublicLayout>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#0b0a0c] text-white">
        {/* Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(140,40,40,0.35),_transparent_60%)]"></div>
        <div className="absolute -top-48 -right-48 w-[520px] h-[520px] bg-[#7a1f1f] rounded-full blur-[180px] opacity-30"></div>
        <div className="absolute bottom-0 left-1/3 w-[420px] h-[420px] bg-[#3b1d4a] rounded-full blur-[160px] opacity-25"></div>

        <div className="relative max-w-7xl mx-auto px-8 py-32 text-center">
          <span className="inline-flex items-center gap-2 mb-8 px-6 py-2 rounded-full 
            bg-white/5 border border-white/10 backdrop-blur-md text-sm tracking-wide">
            <span className="material-symbols-outlined text-[#e08a6e]">
              info
            </span>
            About the Platform
          </span>

          <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold mb-8 leading-tight">
            Built for
            <span className="bg-gradient-to-r from-[#d24c4c] via-[#e08a6e] to-[#b85cff] bg-clip-text text-transparent">
              {" "}Next-Gen Smart Labs
            </span>
          </h1>

          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
            A secure, high-performance peer-to-peer file sharing platform designed
            for seamless collaboration inside modern academic laboratories —
            without internet dependency.
          </p>
        </div>
      </section>

      {/* ================= WHY IT EXISTS ================= */}
      <section className="relative py-32 bg-[#0f0e11] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_rgba(120,60,30,0.25),_transparent_60%)]"></div>

        <div className="relative max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-20 items-center">
          {/* TEXT */}
          <div>
            <span className="inline-flex items-center gap-2 mb-5 px-5 py-2 rounded-full 
              bg-white/5 border border-white/10 backdrop-blur text-sm">
              <span className="material-symbols-outlined text-[#e08a6e]">
                psychology
              </span>
              Problem & Solution
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
              Why This Platform
              <br />
              <span className="text-[#e08a6e]">Had to Exist</span>
            </h2>

            <p className="text-white/70 text-lg mb-6">
              Traditional lab file sharing relies on USB drives, emails,
              or cloud platforms that are slow, insecure, and dependent
              on stable internet access.
            </p>

            <p className="text-white/70 text-lg">
              Our platform eliminates these limitations through
              <strong className="text-white">
                {" "}direct browser-based peer-to-peer transfers
              </strong>{" "}
              powered by WebRTC — ensuring speed, privacy, and reliability.
            </p>
          </div>

          {/* DIFFERENTIATORS */}
          <div className="relative rounded-[32px] p-[1px] 
            bg-gradient-to-br from-[#7a1f1f]/60 via-[#2a0f0f]/40 to-[#3b1d4a]/60">
            <div className="rounded-[31px] bg-[#0b0a0c]/90 backdrop-blur-xl 
              border border-white/10 p-12 shadow-2xl">

              <h3 className="text-2xl font-bold mb-10 flex items-center gap-3">
                <span className="material-symbols-outlined text-[#e08a6e]">
                  stars
                </span>
                What Makes It Different
              </h3>

              <ul className="space-y-6 text-white/75 text-lg">
                {[
                  { icon: "sync_alt", text: "True peer-to-peer file transfers" },
                  { icon: "cloud_off", text: "Zero server file storage" },
                  { icon: "lan", text: "Optimized for LAN environments" },
                  { icon: "campaign", text: "Admin-controlled broadcasting" },
                  { icon: "lock", text: "Secure role-based authentication" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-[#d24c4c]">
                      {item.icon}
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
{/* ================= MISSION & VISION ================= */}
<section className="py-32 bg-[#0b0a0c] text-white">
  <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16">

    {/* Mission — Reddish Brown */}
    <div className="group rounded-[30px] p-[1px]
      bg-gradient-to-br from-[#8f2e2e]/60 via-[#5a1f1f]/50 to-[#3a1414]/60">
      <div className="rounded-[29px] bg-[#0f0e11]/90 p-12 border border-white/10
        shadow-xl transition group-hover:-translate-y-2">

        <div className="w-14 h-14 mb-6 rounded-2xl
          bg-gradient-to-br from-[#d24c4c] via-[#b4533c] to-[#6b2a1a]
          flex items-center justify-center shadow-lg">
          <span className="material-symbols-outlined text-white text-3xl">
            flag
          </span>
        </div>

        <h3 className="text-2xl font-bold mb-4 tracking-tight">
          Our Mission
        </h3>

        <p className="text-white/70 text-lg leading-relaxed">
          To deliver a fast, secure, and reliable file-sharing solution
          purpose-built for academic lab environments — without dependency
          on external cloud services.
        </p>
      </div>
    </div>

    {/* Vision — Wine / Plum */}
    <div className="group rounded-[30px] p-[1px]
      bg-gradient-to-br from-[#4b1f5a]/60 via-[#2e1438]/50 to-[#1c0b24]/60">
      <div className="rounded-[29px] bg-[#0f0e11]/90 p-12 border border-white/10
        shadow-xl transition group-hover:-translate-y-2">

        <div className="w-14 h-14 mb-6 rounded-2xl
          bg-gradient-to-br from-[#b85cff] via-[#8b5cf6] to-[#5b2a18]
          flex items-center justify-center shadow-lg">
          <span className="material-symbols-outlined text-white text-3xl">
            visibility
          </span>
        </div>

        <h3 className="text-2xl font-bold mb-4 tracking-tight">
          Our Vision
        </h3>

        <p className="text-white/70 text-lg leading-relaxed">
          To become the global standard for secure peer-to-peer collaboration
          across educational institutions and research environments.
        </p>
      </div>
    </div>

  </div>
</section>


      {/* ================= TECH STACK ================= */}
      <section className="relative py-36 bg-[#070608] text-white overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#7a1f1f] blur-[200px] opacity-30"></div>
        <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-[#3b1d4a] blur-[200px] opacity-30"></div>

        <div className="relative max-w-7xl mx-auto px-8">
          <div className="text-center mb-24">
            <span className="inline-flex items-center gap-2 mb-6 px-6 py-2 rounded-full 
              bg-white/5 border border-white/10 backdrop-blur text-sm">
              <span className="material-symbols-outlined text-[#e08a6e]">
                layers
              </span>
              Platform Foundation
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Technology
              <span className="text-[#e08a6e]"> Stack</span>
            </h2>

            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Built using modern, production-grade technologies for performance,
              security, and scalability.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-7 max-w-5xl mx-auto">
            {[
              "React.js", "Node.js", "WebRTC", "Socket.io",
              "MongoDB", "JWT Auth", "Tailwind CSS", "Express.js"
            ].map((tech, i) => (
              <div key={i}
                className="px-8 py-4 rounded-full bg-white/5 border border-white/10 
                backdrop-blur hover:scale-110 transition shadow-lg">
                <span className="font-semibold tracking-wide text-white/80">
                  {tech}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center text-white/40 text-sm">
            Engineered for reliability • Designed for scale • Optimized for education
          </div>
        </div>
      </section>

    </PublicLayout>
  );
}
