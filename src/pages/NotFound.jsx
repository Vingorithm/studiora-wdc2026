import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'

/* ─── Star field ─────────────────────────────────────────────────────── */
function StarField() {
  const ref = useRef(null)
  useEffect(() => {
    const container = ref.current
    if (!container) return
    container.innerHTML = ''
    for (let i = 0; i < 80; i++) {
      const star = document.createElement('div')
      const size  = Math.random() * 2.5 + 0.5
      const dur   = 2 + Math.random() * 4
      const op    = 0.3 + Math.random() * 0.7
      const delay = Math.random() * 5
      star.style.cssText = `
        position:absolute;
        width:${size}px; height:${size}px;
        border-radius:50%; background:#fff;
        top:${Math.random() * 100}%; left:${Math.random() * 100}%;
        opacity:0;
        animation:nfTwinkle ${dur}s ease-in-out ${delay}s infinite;
        --op:${op};
      `
      container.appendChild(star)
    }
  }, [])
  return <div ref={ref} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />
}

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <>
      <style>{`
        @keyframes nfTwinkle {
          0%,100%{opacity:0;transform:scale(.8)}
          50%{opacity:var(--op,.6);transform:scale(1.2)}
        }
        @keyframes nfBlob {
          0%,100%{transform:translateY(0) scale(1)}
          50%{transform:translateY(-20px) scale(1.04)}
        }
        @keyframes nfAstro {
          0%,100%{transform:translateY(0) rotate(-3deg)}
          50%{transform:translateY(-12px) rotate(3deg)}
        }
        @keyframes nfGlow {
          0%,100%{filter:drop-shadow(0 0 20px rgba(93,139,244,.3))}
          50%{filter:drop-shadow(0 0 40px rgba(196,181,253,.5))}
        }
        @keyframes nfOrbit {
          from{transform:translate(-50%,-50%) rotate(0deg)}
          to{transform:translate(-50%,-50%) rotate(360deg)}
        }
        .nf-404-num{
          font-family:'Poppins',sans-serif; font-weight:800;
          font-size:clamp(80px,18vw,140px); line-height:1; letter-spacing:-4px;
          background:linear-gradient(135deg,#5D8BF4 0%,#C4B5FD 50%,#A78BFA 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          background-clip:text; animation:nfGlow 3s ease-in-out infinite;
        }
        .nf-astro{animation:nfAstro 4s ease-in-out infinite}
        .nf-orbit{
          position:absolute; border-radius:50%; top:50%; left:50%;
          pointer-events:none;
        }
        .nf-pill{
          display:inline-flex; align-items:center; gap:6px;
          padding:7px 16px; border-radius:50px;
          background:rgba(255,255,255,.05);
          border:1px solid rgba(255,255,255,.1);
          font-size:13px; color:rgba(255,255,255,.5);
          cursor:pointer; transition:all .2s ease;
          font-family:'Inter',sans-serif;
        }
        .nf-pill:hover{background:rgba(93,139,244,.15);border-color:rgba(93,139,244,.4);color:#A5C0FF}
      `}</style>

      {/* ── Full-screen cosmic wrapper ── */}
      <div
        className="relative flex flex-col min-h-screen"
        style={{
          background: 'linear-gradient(135deg, #0f0c29, #1a1040, #0d1b3e)',
          overflow: 'hidden',
        }}
      >
        {/* Stars */}
        <StarField />

        {/* Ambient blobs */}
        <div className="absolute rounded-full pointer-events-none" style={{
          top: 0, left: 0, width: 420, height: 420,
          background: 'radial-gradient(circle,rgba(93,139,244,.18),transparent 70%)',
          animation: 'nfBlob 6s ease-in-out infinite', zIndex: 1,
        }} />
        <div className="absolute rounded-full pointer-events-none" style={{
          bottom: 0, right: 0, width: 360, height: 360,
          background: 'radial-gradient(circle,rgba(196,181,253,.16),transparent 70%)',
          animation: 'nfBlob 6s ease-in-out 3s infinite', zIndex: 1,
        }} />

        {/* Orbit rings */}
        <div className="nf-orbit" style={{ width: 600, height: 600, border: '1px solid rgba(93,139,244,.08)', animation: 'nfOrbit 35s linear infinite', zIndex: 1 }}>
          <div style={{ position:'absolute', top:-4, left:'50%', width:8, height:8, borderRadius:'50%', background:'#5D8BF4', marginLeft:-4, boxShadow:'0 0 12px rgba(93,139,244,.8)' }} />
        </div>
        <div className="nf-orbit" style={{ width: 850, height: 850, border: '1px solid rgba(196,181,253,.05)', animation: 'nfOrbit 55s linear reverse infinite', zIndex: 1 }} />

        {/* ── Main content ── */}
        <div
          className="relative flex-1 flex flex-col items-center justify-center px-4 text-center"
          style={{ zIndex: 10, paddingTop: '3rem', paddingBottom: '4rem' }}
        >
          {/* 404 */}
          <div className="nf-404-num">404</div>

          {/* Astronaut */}
          <div className="nf-astro" style={{ width: 120, height: 120, marginTop: -10 }}>
            <svg viewBox="0 0 120 120" fill="none" width="120" height="120">
              <ellipse cx="60" cy="72" rx="26" ry="28" fill="url(#nfs)" stroke="rgba(255,255,255,.2)" strokeWidth="1.5"/>
              <circle cx="60" cy="44" r="22" fill="url(#nfh)" stroke="rgba(255,255,255,.25)" strokeWidth="1.5"/>
              <ellipse cx="60" cy="44" rx="13" ry="12" fill="url(#nfv)" opacity=".9"/>
              <ellipse cx="55" cy="39" rx="4" ry="5" fill="rgba(255,255,255,.2)" transform="rotate(-15 55 39)"/>
              <ellipse cx="33" cy="72" rx="8" ry="18" fill="url(#nfs)" stroke="rgba(255,255,255,.15)" strokeWidth="1.5" transform="rotate(-15 33 72)"/>
              <ellipse cx="87" cy="72" rx="8" ry="18" fill="url(#nfs)" stroke="rgba(255,255,255,.15)" strokeWidth="1.5" transform="rotate(15 87 72)"/>
              <circle cx="30" cy="87" r="7" fill="#5D8BF4" opacity=".85"/>
              <circle cx="90" cy="87" r="7" fill="#5D8BF4" opacity=".85"/>
              <rect x="46" y="95" width="12" height="18" rx="6" fill="url(#nfs)" stroke="rgba(255,255,255,.15)" strokeWidth="1"/>
              <rect x="62" y="95" width="12" height="18" rx="6" fill="url(#nfs)" stroke="rgba(255,255,255,.15)" strokeWidth="1"/>
              <ellipse cx="52" cy="113" rx="8" ry="4" fill="#4A6FA8"/>
              <ellipse cx="68" cy="113" rx="8" ry="4" fill="#4A6FA8"/>
              <rect x="72" y="62" width="12" height="18" rx="4" fill="#3A5FA0" stroke="rgba(255,255,255,.2)" strokeWidth="1"/>
              <circle cx="57" cy="44" r="1" fill="rgba(255,255,255,.4)"/>
              <circle cx="63" cy="41" r=".7" fill="rgba(255,255,255,.4)"/>
              <rect x="51" y="68" width="18" height="10" rx="3" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.25)" strokeWidth=".8"/>
              <defs>
                <linearGradient id="nfs" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#C4D8F8"/><stop offset="100%" stopColor="#8EB4F0"/>
                </linearGradient>
                <linearGradient id="nfh" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#D4E6FF"/><stop offset="100%" stopColor="#98BAE8"/>
                </linearGradient>
                <linearGradient id="nfv" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1E3A8A" stopOpacity=".9"/>
                  <stop offset="100%" stopColor="#0D1B3E" stopOpacity=".8"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          <h1 className="font-bold text-white mt-6 mb-3"
            style={{ fontFamily: 'Poppins,sans-serif', fontSize: 'clamp(20px,4vw,28px)' }}>
            Oops! Page Not Found
          </h1>
          <p style={{ color: 'rgba(255,255,255,.5)', maxWidth: 360, lineHeight: 1.6, fontSize: 15, marginBottom: '2.5rem', fontFamily: 'Inter,sans-serif' }}>
            Looks like this page drifted off into deep space. The route you're looking for doesn't exist.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <button
              onClick={() => navigate(-1)}
              className="font-bold text-white py-3 px-7 rounded-full border-0 cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
              style={{
                fontFamily: 'Poppins,sans-serif', fontSize: 14,
                background: 'linear-gradient(135deg,#5D8BF4,#C4B5FD)',
                boxShadow: '0 8px 32px rgba(93,139,244,.4)',
              }}
            >
              ← Go Back
            </button>
            <button
              onClick={() => navigate('/')}
              className="font-semibold py-3 px-7 rounded-full cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
              style={{
                fontFamily: 'Inter,sans-serif', fontSize: 14,
                color: 'rgba(255,255,255,.7)',
                background: 'rgba(255,255,255,.06)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,.15)',
              }}
            >
              Go to Home
            </button>
          </div>

          {/* Quick nav pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: 'Dashboard', to: '/dashboard' },
              { label: 'Tasks',     to: '/tasks'     },
              { label: 'Notes',     to: '/notes'     },
              { label: 'Focus',     to: '/focus'     },
            ].map(item => (
              <button key={item.label} onClick={() => navigate(item.to)} className="nf-pill">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', opacity: .6, display: 'inline-block', flexShrink: 0 }} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}