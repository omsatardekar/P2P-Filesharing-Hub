import PublicLayout from "../../layouts/PublicLayout";

export default function Contact() {
  return (
    <PublicLayout>
      <section className="relative min-h-screen overflow-hidden 
        bg-[#0b0608] flex items-center">

        {/* Ambient Background Glows */}
        <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] 
          bg-pink-500/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -right-40 w-[32rem] h-[32rem] 
          bg-purple-600/15 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-8 py-28 
          grid md:grid-cols-2 gap-20 items-center">

          {/* LEFT CONTENT */}
          <div className="text-white">
            <span className="inline-flex items-center gap-2 mb-6 px-6 py-2 
              rounded-full bg-white/5 border border-white/10 
              text-sm tracking-wide text-white/70">
              <span className="material-symbols-outlined text-base">
                support_agent
              </span>
              Support & Queries
            </span>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-8">
              Let’s Start a
              <br />
              <span className="bg-gradient-to-r from-[#f29ca3] to-[#b77cff] 
                bg-clip-text text-transparent">
                Conversation
              </span>
            </h1>

            <p className="text-white/70 text-lg max-w-md mb-10">
              Have questions about the platform, need technical support,
              or interested in collaboration? We’re happy to help.
            </p>

            <ul className="space-y-5 text-white/70">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#f29ca3]">
                  verified
                </span>
                Fast response from our team
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#b77cff]">
                  lock
                </span>
                Your data remains private & secure
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#f29ca3]">
                  school
                </span>
                Designed for academic institutions
              </li>
            </ul>
          </div>

          {/* RIGHT FORM */}
          <div className="group rounded-[32px] p-[1px] 
            bg-gradient-to-br from-[#f29ca3]/40 to-[#b77cff]/40">

            <div className="rounded-[31px] bg-[#0f0a0d]/95 
              border border-white/10 p-12 shadow-2xl">

              <h2 className="text-2xl font-bold text-white mb-10">
                Contact Form
              </h2>

              {/* Name */}
              <div className="relative mb-6">
                <span className="material-symbols-outlined absolute left-4 top-1/2 
                  -translate-y-1/2 text-white/40">
                  person
                </span>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full pl-12 pr-4 py-4 rounded-xl 
                    bg-black/40 border border-white/10 text-white 
                    placeholder-white/40 focus:outline-none 
                    focus:ring-2 focus:ring-[#f29ca3]"
                />
              </div>

              {/* Email */}
              <div className="relative mb-6">
                <span className="material-symbols-outlined absolute left-4 top-1/2 
                  -translate-y-1/2 text-white/40">
                  mail
                </span>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-4 rounded-xl 
                    bg-black/40 border border-white/10 text-white 
                    placeholder-white/40 focus:outline-none 
                    focus:ring-2 focus:ring-[#b77cff]"
                />
              </div>

              {/* Message */}
              <div className="relative mb-10">
                <span className="material-symbols-outlined absolute left-4 top-4 
                  text-white/40">
                  chat
                </span>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl 
                    bg-black/40 border border-white/10 text-white 
                    placeholder-white/40 resize-none 
                    focus:outline-none focus:ring-2 
                    focus:ring-[#f29ca3]"
                />
              </div>

              {/* Button */}
              <button className="w-full py-4 rounded-xl font-semibold text-lg 
                bg-gradient-to-r from-[#f29ca3] to-[#b77cff] 
                text-black hover:opacity-90 transition 
                shadow-lg hover:shadow-xl">
                Send Message
              </button>
            </div>
          </div>

        </div>
      </section>
    </PublicLayout>
  );
}
