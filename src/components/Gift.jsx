import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


/* -----------------------------
   Constants
------------------------------ */
const HOOPLA_APPSTORE = "https://apps.apple.com/us/app/hoopla/id580643740";
const HOOPLA_PLAYSTORE =
  "https://play.google.com/store/apps/details?id=com.hoopladigital.android";
const HOOPLA_WEB = "https://www.hoopladigital.com/";

/* -----------------------------
   Helpers
------------------------------ */
function detectPlatform() {
  const ua = navigator.userAgent || "";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "web";
}

async function copyToClipboard(text) {
  if (!text) return false;

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  }
}

function useToast(timeoutMs = 1800) {
  const [toast, setToast] = useState({ show: false, message: "" });

  const show = (message) => {
    setToast({ show: true, message });
    window.clearTimeout(window.__toastTimer);
    window.__toastTimer = window.setTimeout(
      () => setToast({ show: false, message: "" }),
      timeoutMs
    );
  };

  return { toast, show };
}

/* -----------------------------
   Page
------------------------------ */
export default function GiftCardPage() {
  const { slug } = useParams();

  const { toast, show } = useToast();

  const [platform, setPlatform] = useState("web");


  const [gift, setGift] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ok | notfound | error


  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);


  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setStatus("loading");

        const res = await fetch(`${process.env.PUBLIC_URL}/gifts.json`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const found = data?.[slug];

        if (cancelled) return;

        if (!found) {
          setGift(null);
          setStatus("notfound");
          return;
        }

        setGift(found);
        setStatus("ok");
      } catch (e) {
        if (cancelled) return;
        setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const hooplaLink =
    platform === "ios"
      ? HOOPLA_APPSTORE
      : platform === "android"
      ? HOOPLA_PLAYSTORE
      : HOOPLA_WEB;

  const onCopy = async (label, value) => {
    const ok = await copyToClipboard(value);
    show(ok ? `${label} copied ✅` : `Couldn’t copy ${label.toLowerCase()}.`);
  };

  if (status === "loading") return <div style={{ padding: 24 }}>Loading…</div>;
  if (status === "notfound") return <div style={{ padding: 24 }}>Not Found.</div>;
  if (status === "error") return <div style={{ padding: 24 }}>Couldn’t load gift data.</div>;

  // ...your return JSX continues here

  return (
    <div className="holiday-bg min-vh-100 d-flex align-items-center py-5">
      <div className="container" style={{ maxWidth: 980 }}>
        <div className="card border-0 shadow-lg holiday-card overflow-hidden">
          <div className="row g-0">
            {/* LEFT */}
            <div className="col-lg-5 p-4 p-md-5 holiday-left">
              <div className="d-flex align-items-start gap-3">
                <div style={{ fontSize: 64, lineHeight: 1 }}>🎁</div>
                <h1 className="display-7 fw-bold mb-2">
                  Merry Christmas, {gift.name}!
                </h1>
              </div>

              <p className="mb-4 mt-4" style={{ lineHeight: 1.6 }}>
                Here is free access to all your favorite audiobooks, ebooks,
                movies, and more!
              </p>

              <div className="d-grid">
                <a
                  className="btn btn-light btn-lg fw-semibold py-3 app-icon-link"
                  href={hooplaLink}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open Hoopla"
                >
                  <div className="app-icon-wrap">
                    <img
                      src="/hoopla-logo-square.png"
                      alt="Hoopla"
                      className="app-icon"
                      draggable="false"
                    />
                  </div>
                </a>
              </div>

              <p className="mt-3">
                Download the app, then come back here when you’re ready to sign up.
              </p>
            </div>

            {/* RIGHT */}
            <div className="col-lg-7 p-4 p-md-5 bg-body-tertiary">
              <div className="d-flex align-items-center justify-content-between">
                <h2 className="h4 fw-bold mb-0">Library Information</h2>
                <span className="badge text-bg-secondary">Copy + Paste</span>
              </div>
              <p className="fw-light fs-s mt-3">Hoopla will neeed these details to create your account.</p>

              <div className="row g-3">
                {/* Library */}
                <div className="col-12">
                  <div className="p-3 p-md-4 rounded-4 bg-white border shadow-sm">
                    <div className="text-secondary small mb-1">Library name</div>
                    <div className="fw-semibold fs-5">{gift.library}</div>
                  </div>
                </div>

                {/* Card */}
                <div className="col-12">
                  <div className="p-3 p-md-4 rounded-4 bg-white border shadow-sm">
                    <div className="text-secondary small mb-1">
                      Library card number
                    </div>

                    <div className="d-flex align-items-center gap-3">
                      <div className="font-monospace fw-semibold fs-4 flex-grow-1">
                        {gift.card}
                      </div>

                      <button
                        className="icon-copy-btn"
                        type="button"
                        onClick={() => onCopy("Card number", gift.card)}
                        disabled={!gift.card}
                        aria-label="Copy card number"
                        title="Copy"
                      >
                        <i className="bi bi-copy fs-6 fs-md-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="p-3 p-md-4 rounded-4 bg-white border shadow-sm">
                    <div className="text-secondary small mb-1">
                      PIN number
                    </div>

                    <div className="d-flex align-items-center gap-3">
                      <div className="font-monospace fw-semibold fs-4 flex-grow-1">
                        {gift.pin}
                      </div>

                      <button
                        className="icon-copy-btn"
                        type="button"
                        onClick={() => onCopy("Card number", gift.card)}
                        disabled={!gift.card}
                        aria-label="Copy card number"
                        title="Copy"
                      >
                        <i className="bi bi-copy fs-6 fs-md-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Info */}
        <div className="d-flex align-items-center py-5">
          <div className="container" style={{ maxWidth: 980 }}>
            <div className="card border-0 shadow-lg holiday-card overflow-hidden">
              <div className="row g-0">
                {/* Left panel — matches first card */}
                <div className="col-lg-5 p-4 p-md-5 ">
                  <div className="info-card border-0">
                    <div className="d-flex gap-3 align-items-start">
                      <div style={{ fontSize: 34, lineHeight: 1 }}>📚</div>
                      <p className="info-body mb-0">
                        More books, fewer quiet drives, and{" "}
                        <strong>support for local libraries!</strong>
                      </p>
                    </div>

                    <div className="info-divider" />

                    <p className="info-lead mb-2">
                      <strong>Hoopla is free with a library card</strong>, but each card is
                      limited to <strong>6 borrows per month</strong>.
                    </p>

                    <p className="info-muted mb-3">
                      That’s why this card is <strong>outside your locality</strong>.
                    </p>

                    <div className="info-divider" />

                    <div className="info-title fw-bold">Want more borrows?</div>
                    <p className="info-body mb-0">
                      Add an account with cards from your{" "}
                      <strong>local library</strong>{" "}
                      <em>(or libraries you visit while traveling)</em>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toast */}
        {toast.show && (
          <div
            className="position-fixed bottom-0 start-50 translate-middle-x mb-4"
            style={{ zIndex: 1080 }}
          >
            <div className="toast show border-0 shadow-lg">
              <div className="toast-body fw-semibold">{toast.message}</div>
            </div>
          </div>
        )}

        {/* Styles */}
        <style>{`
          .holiday-bg{
            background:
              radial-gradient(1200px 600px at 20% 20%, rgba(255,255,255,0.12), transparent 60%),
              radial-gradient(900px 500px at 90% 10%, rgba(255,255,255,0.10), transparent 55%),
              linear-gradient(135deg, #0b3d2e, rgb(18, 58, 122));
            position: relative;
            overflow: hidden;
          }
          .holiday-bg::before{
            content:"";
            position:absolute; inset:-60px;
            background-image: radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px);
            background-size: 22px 22px;
            opacity: 0.30;
            transform: rotate(12deg);
            pointer-events:none;
          }
          .holiday-card{ border-radius: 24px; }
          .holiday-left{
            background:
              radial-gradient(700px 350px at 35% 10%, rgba(175, 32, 32, 0.24), transparent 60%),
              linear-gradient(180deg, rgba(34, 189, 166, 0.06), rgba(0,0,0,0.12));
          }
  
          /* App icon button */
          .app-icon-link {
            background: transparent;
            border: none;
            box-shadow: none;
            padding: 0;
          }
          .app-icon {
            width: 10em;
            height: 10em;
            border-radius: 22%;
            object-fit: cover;
          }

          /* Info card */
          .info-card {
            padding: 1.25rem 1.5rem;
            border-radius: 1rem;
            background: rgba(255, 255, 255, 0.35);
            border: 1px solid rgba(0,0,0,0.04);
          }
          .info-divider {
            height: 1px;
            background: rgba(18, 58, 122, 0.35);
            margin: 1rem 0;
          }
          .info-title {
            font-variant: all-small-caps;
            letter-spacing: 0.04em;
            color: rgba(0,0,0,0.75);
            font-size: 1.2em;
          }


          .icon-copy-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 10px;
            border: none;
            background: rgba(0, 0, 0, 0.06);
            color: #111;
            transition: background 0.15s ease, transform 0.12s ease;
          }
          .icon-copy-btn:hover { background: rgba(0, 0, 0, 0.10); }
          .icon-copy-btn:active { transform: scale(0.94); }
          .icon-copy-btn:disabled { opacity: 0.35; pointer-events: none; }
        `}</style>
      </div>
    </div>
  );
}
