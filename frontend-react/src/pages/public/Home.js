import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

export default function Home() {
  return (
    <PublicLayout>
     {/* ================= HERO ================= */}
<section className="relative overflow-hidden bg-[#070608] text-white">

  {/* Cinematic Background Layers */}
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(140,40,40,0.35),_transparent_60%)]"></div>
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(60,20,20,0.35),_transparent_60%)]"></div>

  {/* Ambient Blobs */}
  <div className="absolute -top-56 -left-56 w-[620px] h-[620px] bg-[#7a1f1f] rounded-full blur-[220px] opacity-35"></div>
  <div className="absolute top-1/3 -right-56 w-[620px] h-[620px] bg-[#3b1d4a] rounded-full blur-[220px] opacity-30"></div>

  <div className="relative max-w-7xl mx-auto px-8 py-36 grid md:grid-cols-2 gap-20 items-center">

    {/* ================= LEFT ================= */}
    <div>
      <span className="inline-flex items-center gap-2 mb-6 px-6 py-2 rounded-full 
        bg-white/5 border border-white/10 backdrop-blur-md text-sm tracking-wide">
        <span className="material-symbols-outlined text-[#e08a6e]">
          science
        </span>
        College Lab Optimized
      </span>

      <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight mb-8">
        Secure
        <span className="bg-gradient-to-r from-[#d24c4c] via-[#e08a6e] to-[#b85cff] bg-clip-text text-transparent">
          {" "}P2P File Sharing
        </span>
        <br />
        for Smart Campuses
      </h1>

      <p className="text-white/70 text-lg md:text-xl mb-12 max-w-xl leading-relaxed">
        A high-performance, real-time peer-to-peer file sharing platform
        engineered for modern college laboratories — no servers,
        no cloud dependency, no compromise.
      </p>

      <div className="flex flex-wrap gap-5">
        <Link
          to="/register"
          className="relative px-9 py-4 rounded-xl text-lg font-semibold
          bg-gradient-to-r from-[#d24c4c] to-[#e08a6e]
          text-white shadow-xl hover:scale-105 transition"
        >
          Get Started
        </Link>

        <Link
          to="/features"
          className="px-9 py-4 rounded-xl text-lg font-semibold
          border border-white/20 text-white/90
          backdrop-blur hover:bg-white/10 transition"
        >
          Explore Features
        </Link>
      </div>
    </div>

    {/* ================= RIGHT ================= */}
    <div className="relative">

      {/* Floating Glass Card */}
      <div className="relative rounded-[28px] p-[1px]
        bg-gradient-to-br from-[#7a1f1f]/60 via-[#2a0f0f]/40 to-[#3b1d4a]/60">
        <div className="rounded-[27px] bg-[#0f0e11]/90 backdrop-blur-xl 
          border border-white/10 p-12 shadow-2xl">

          <h3 className="text-2xl font-bold mb-8 tracking-tight">
            Why Institutions Choose This
          </h3>

          <ul className="space-y-5 text-white/75 text-lg">
            {[
              { icon: "bolt", text: "Ultra-fast WebRTC transfers", color: "text-[#e08a6e]" },
              { icon: "storage", text: "Zero server-side file storage", color: "text-[#d24c4c]" },
              { icon: "campaign", text: "Admin broadcast to all systems", color: "text-[#b85cff]" },
              { icon: "wifi", text: "Live online user presence", color: "text-[#e08a6e]" },
              { icon: "analytics", text: "Complete audit & transfer logs", color: "text-[#d24c4c]" }
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4">
                <span className={`material-symbols-outlined ${item.color}`}>
                  {item.icon}
                </span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Depth Glows */}
      <div className="absolute -top-16 -right-16 w-80 h-80 bg-[#d24c4c] rounded-full blur-[160px] opacity-25 -z-10"></div>
      <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-[#3b1d4a] rounded-full blur-[160px] opacity-25 -z-10"></div>

    </div>
  </div>
</section>
{/* ================= CAPABILITY MATRIX ================= */}
<section className="relative py-32 overflow-hidden bg-[#0b0608] text-white">

  {/* ambient glow – very subtle */}
  <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-pink-500/10 rounded-full blur-3xl"></div>
  <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] bg-purple-600/10 rounded-full blur-3xl"></div>

  <div className="relative max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-20 items-center">

    {/* LEFT */}
    <div>
      <span className="inline-block mb-5 px-5 py-2 rounded-full 
        bg-white/5 border border-white/10 text-sm tracking-wide text-white/70">
        System Capabilities
      </span>

      <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
        Engineered for
        <br />
        <span className="bg-gradient-to-r from-[#f29ca3] to-[#b77cff] 
          bg-clip-text text-transparent">
          High-Performance Labs
        </span>
      </h2>

      <p className="text-white/70 text-lg mb-10 max-w-xl">
        Built without centralized servers, the platform uses direct peer-to-peer
        connections to guarantee speed, privacy, and reliability inside
        academic lab environments.
      </p>

      <ul className="space-y-4 text-white/80">
        <li>• No server bottlenecks</li>
        <li>• Instant peer-to-peer delivery</li>
        <li>• Optimized for LAN & classrooms</li>
        <li>• Admin-controlled distribution</li>
      </ul>
    </div>

    {/* RIGHT */}
    <div className="rounded-3xl p-[1px] 
      bg-gradient-to-br from-[#f29ca3]/40 to-[#b77cff]/40">

      <div className="rounded-[22px] bg-[#0f0a0d] p-10 space-y-8 
        border border-white/10 shadow-2xl">

        {[
          { label: "Transfer Speed", value: "Ultra Fast", width: "w-[95%]" },
          { label: "Server Dependency", value: "None", width: "w-[10%]" },
          { label: "Network Optimization", value: "LAN Optimized", width: "w-[90%]" },
          { label: "System Availability", value: "Always On", width: "w-[100%]" }
        ].map((item, i) => (
          <div key={i}>
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-white/80">{item.label}</span>
              <span className="text-white/50">{item.value}</span>
            </div>

            <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full ${item.width} rounded-full 
                bg-gradient-to-r from-[#f29ca3] to-[#b77cff]`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>

  </div>
</section>
{/* ================= FEATURES ================= */}
<section className="relative py-32 overflow-hidden bg-[#0b0608] text-white">

  {/* ambient background glow */}
  <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-pink-500/10 rounded-full blur-3xl"></div>
  <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] bg-purple-600/10 rounded-full blur-3xl"></div>

  <div className="relative max-w-7xl mx-auto px-8">

    {/* HEADER */}
    <div className="text-center max-w-3xl mx-auto mb-24">
      <span className="inline-block mb-5 px-6 py-2 rounded-full 
        bg-white/5 border border-white/10 text-sm tracking-wide text-white/70">
        Built for Performance
      </span>

      <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
        Features that Power
        <br />
        <span className="bg-gradient-to-r from-[#f29ca3] to-[#b77cff] 
          bg-clip-text text-transparent">
          Smart Laboratory Networks
        </span>
      </h2>

      <p className="text-white/70 text-lg">
        Each feature is purpose-built for speed, security, and real-time
        collaboration inside modern academic environments.
      </p>
    </div>

    {/* FEATURE GRID */}
    <div className="grid md:grid-cols-3 gap-14">
      {[
        {
          icon: "bolt",
          title: "Real-Time P2P Transfer",
          desc: "Instant browser-to-browser file transfer using WebRTC with zero server latency."
        },
        {
          icon: "campaign",
          title: "Admin Broadcast",
          desc: "Distribute files to all connected students simultaneously with a single action."
        },
        {
          icon: "lock",
          title: "Secure Authentication",
          desc: "Role-based access control for administrators and students."
        },
        {
          icon: "group",
          title: "Live User Presence",
          desc: "View online users in real time across the lab network."
        },
        {
          icon: "history",
          title: "Transfer History",
          desc: "Comprehensive logs of sent and received files with timestamps."
        },
        {
          icon: "rocket_launch",
          title: "LAN Optimized",
          desc: "Engineered specifically for ultra-fast local network environments."
        }
      ].map((f, i) => (
        <div
          key={i}
          className="group relative rounded-[28px] p-[1px]
          bg-gradient-to-br from-[#f29ca3]/40 to-[#b77cff]/40
          transition hover:-translate-y-3"
        >
          <div className="h-full rounded-[27px] bg-[#0f0a0d]/95 
            p-10 border border-white/10 shadow-xl">

            {/* ICON */}
            <div className="w-14 h-14 mb-6 rounded-2xl 
              bg-gradient-to-br from-[#f29ca3] to-[#b77cff]
              flex items-center justify-center shadow-lg 
              group-hover:scale-110 transition">
              <span className="material-symbols-outlined text-white text-3xl">
                {f.icon}
              </span>
            </div>

            {/* TEXT */}
            <h3 className="text-xl font-semibold mb-4 
              group-hover:text-transparent group-hover:bg-clip-text
              group-hover:bg-gradient-to-r from-[#f29ca3] to-[#b77cff] transition">
              {f.title}
            </h3>

            <p className="text-white/70 leading-relaxed">
              {f.desc}
            </p>
          </div>
        </div>
      ))}
    </div>

  </div>
</section>


     {/* ================= HOW IT WORKS (STUDENT vs ADMIN) ================= */}
<section className="relative py-28 bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
  {/* Background Glow */}
  <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600 rounded-full blur-3xl opacity-20"></div>

  <div className="relative max-w-7xl mx-auto px-8">
    {/* Header */}
    <div className="text-center mb-24">
      <span className="inline-block mb-4 px-6 py-2 rounded-full bg-white/10 text-blue-400 text-sm font-semibold">
        Role-Based Workflow
      </span>
      <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
        How It <span className="text-blue-500">Works</span>
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto text-lg">
        Designed with separate workflows for students and admins —
        simple, fast, and secure for everyone.
      </p>
    </div>

    {/* Two Columns */}
    <div className="grid md:grid-cols-2 gap-16">
      {/* ================= STUDENT FLOW ================= */}
      <div className="relative bg-gradient-to-br from-blue-600/10 to-green-500/10 border border-white/10 rounded-3xl p-10 backdrop-blur-xl">
        <h3 className="text-3xl font-extrabold mb-10 text-blue-400 text-center flex items-center justify-center gap-3">
          <span className="material-symbols-outlined text-4xl">
            school
          </span>
          Student Workflow
        </h3>

        <div className="space-y-8">
          {[
            {
              step: "01",
              title: "Login Securely",
              desc: "Sign in using your student credentials to access the lab network.",
              icon: "lock"
            },
            {
              step: "02",
              title: "Accept or Receive Files",
              desc: "Receive files directly from peers or admins in real time.",
              icon: "download"
            },
            {
              step: "03",
              title: "Instant Download",
              desc: "Files are downloaded instantly via secure P2P connection.",
              icon: "bolt"
            }
          ].map((s, i) => (
            <div
              key={i}
              className="flex gap-6 items-start bg-white/5 p-6 rounded-2xl hover:bg-white/10 transition"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-2xl">
                  {s.icon}
                </span>
              </div>

              <div>
                <span className="text-sm text-blue-400 font-semibold">
                  Step {s.step}
                </span>
                <h4 className="text-xl font-bold mb-1">{s.title}</h4>
                <p className="text-gray-400">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= ADMIN FLOW ================= */}
      <div className="relative bg-gradient-to-br from-purple-600/10 to-orange-500/10 border border-white/10 rounded-3xl p-10 backdrop-blur-xl">
        <h3 className="text-3xl font-extrabold mb-10 text-purple-400 text-center flex items-center justify-center gap-3">
          <span className="material-symbols-outlined text-4xl">
            admin_panel_settings
          </span>
          Admin Workflow
        </h3>

        <div className="space-y-8">
          {[
            {
              step: "01",
              title: "Admin Login",
              desc: "Access the admin panel with elevated privileges.",
              icon: "verified_user"
            },
            {
              step: "02",
              title: "Broadcast or Send",
              desc: "Send files to individuals or broadcast to all students.",
              icon: "campaign"
            },
            {
              step: "03",
              title: "Monitor Activity",
              desc: "Track online users, transfers, and delivery status.",
              icon: "analytics"
            }
          ].map((s, i) => (
            <div
              key={i}
              className="flex gap-6 items-start bg-white/5 p-6 rounded-2xl hover:bg-white/10 transition"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-2xl">
                  {s.icon}
                </span>
              </div>

              <div>
                <span className="text-sm text-purple-400 font-semibold">
                  Step {s.step}
                </span>
                <h4 className="text-xl font-bold mb-1">{s.title}</h4>
                <p className="text-gray-400">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>



      {/* ================= ROLE EXPERIENCE SPLIT ================= */}
<section className="relative py-32 bg-neutral-950 text-white overflow-hidden">
  {/* Ambient Lines */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(34,197,94,0.15),transparent_40%)]"></div>

  <div className="relative max-w-7xl mx-auto px-8">
    {/* Header */}
    <div className="text-center mb-28">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
        Two Roles. One
        <span className="text-blue-500"> Seamless System</span>
      </h2>
      <p className="text-gray-400 text-lg max-w-2xl mx-auto">
        The platform adapts to how you work — whether you are a student or an
        administrator.
      </p>
    </div>

    {/* Split Experience */}
    <div className="grid md:grid-cols-2 gap-16 items-start">
      
      {/* STUDENT SIDE */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition"></div>

        <div className="relative border border-white/10 rounded-3xl p-10 bg-white/5 backdrop-blur-xl">
          <span className="text-blue-400 text-sm font-semibold tracking-wide">
            STUDENT EXPERIENCE
          </span>

          <h3 className="text-3xl font-extrabold mt-4 mb-6">
            Simple. Fast. Focused.
          </h3>

          <ul className="space-y-4 text-gray-300 text-lg">
            <li>→ Join the lab instantly</li>
            <li>→ Receive files from peers or admin</li>
            <li>→ Accept & download in real time</li>
            <li>→ No setup, no storage limits</li>
          </ul>

          <div className="mt-10 text-sm text-gray-400">
            Optimized for classroom productivity
          </div>
        </div>
      </div>

      {/* ADMIN SIDE */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition"></div>

        <div className="relative border border-white/10 rounded-3xl p-10 bg-white/5 backdrop-blur-xl">
          <span className="text-purple-400 text-sm font-semibold tracking-wide">
            ADMIN EXPERIENCE
          </span>

          <h3 className="text-3xl font-extrabold mt-4 mb-6">
            Control. Visibility. Scale.
          </h3>

          <ul className="space-y-4 text-gray-300 text-lg">
            <li>→ Monitor online students live</li>
            <li>→ Send or broadcast files instantly</li>
            <li>→ Track delivery & activity</li>
            <li>→ Zero server file handling</li>
          </ul>

          <div className="mt-10 text-sm text-gray-400">
            Designed for instructors & labs
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </PublicLayout>
  );
}
