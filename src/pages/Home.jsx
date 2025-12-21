import React from "react";
import SiteNav from "../components/SiteNav";

export default function Home() {
    return (
        <>
            <SiteNav />

            <main>
                <section
                    className="d-flex align-items-center py-5"
                    style={{
                        minHeight: "calc(100vh - var(--nav-h))",

                    }}
                >
                    <div className="container">
                        <div className="bg-white bg-opacity-75 rounded-4 shadow-sm p-4 p-lg-5">
                            <div className="row align-items-center g-4">
                                {/* Image */}
                                <div className="col-12 col-lg-5 text-center">
                                    <div className="position-relative d-inline-block">
                                        {/* Blurred halo */}
                                        <div
                                            className="position-absolute top-50 start-50 translate-middle rounded-circle"
                                            style={{
                                                width: 400,
                                                height: 400,
                                                background:
                                                    "linear-gradient(135deg, rgb(203, 211, 164) 0%, rgb(173, 172, 184) 100%)",
                                                filter: "blur(38px)",
                                                opacity: 0.55,
                                                zIndex: 0,
                                                pointerEvents: "none"
                                            }}
                                        />

                                        <div
                                            className="position-absolute top-50 start-50 translate-middle rounded-circle"
                                            style={{
                                                width: 330,
                                                height: 330,
                                                background: "rgba(255,255,255,0.35)",
                                                filter: "blur(10px)",
                                                opacity: 0.65,
                                                zIndex: 0,
                                                pointerEvents: "none"
                                            }}
                                        />

                                        {/* Actual image */}
                                        <img
                                            src={`${process.env.PUBLIC_URL}/assets/images/laylapfp.jpg`}
                                            alt="Professional headshot of Layla"
                                            className="img-fluid rounded-circle position-relative shadow"
                                            style={{
                                                maxWidth: 300,
                                                zIndex: 1
                                            }}
                                        />
                                    </div>
                                </div>



                                {/* Text */}
                                <div className="col-12 col-lg-7">
                                    <p className="text-uppercase text-muted fw-semibold mb-2">
                                        Hello, I&apos;m
                                    </p>

                                    <h1 className="display-4 fw-bold mb-2">Layla Scott</h1>

                                    <h2 className="h4 text-secondary mb-3">
                                        Software Engineer at <span className="fw-semibold">Tridium</span>
                                    </h2>
                                    <div className="d-flex flex-wrap gap-2 mb-4">
                                        <div className="d-flex flex-wrap gap-2">
                                            <span className="badge rounded-pill text-bg-light border px-2 py-1 d-inline-flex align-items-center gap-2">
                                                <span style={{ fontSize: "1.25rem", lineHeight: 1 }}>📚</span>
                                                Reading
                                            </span>

                                            <span className="badge rounded-pill text-bg-light border px-2 py-1 d-inline-flex align-items-center gap-2">
                                                <span style={{ fontSize: "1.25rem", lineHeight: 1 }}>🧵</span>
                                                Sewing
                                            </span>

                                            <span className="badge rounded-pill text-bg-light border px-2 py-1 d-inline-flex align-items-center gap-2">
                                                <span style={{ fontSize: "1.25rem", lineHeight: 1 }}>🐕 🐈‍⬛ 🐠</span>
                                                Pet Mom
                                            </span>
                                        </div>
                                        <span className="badge rounded-pill text-bg-light border px-2 py-1 d-inline-flex align-items-center gap-2"><span style={{ fontSize: "1.25rem" }}>👩🏻‍💻</span> Software Engineer</span>
                                        <span className="badge rounded-pill text-bg-light border px-2 py-1 d-inline-flex align-items-center gap-2"><span style={{ fontSize: "1.25rem" }}>🎓</span> Virginia Tech • B.S. + M.Eng</span>
                                    </div>
                                    <p className="lead mb-4">
                                        I am a Virginia Tech alum, earning both my B.S. and M.Eng in Computer Science
                                        (<em>a double Hokie</em>)!
                                    </p>
                                    <div className="d-flex flex-wrap gap-2 pt-2 mb-4">
                                        <a
                                            className="
                                        btn btn-dark
                                        btn-sm btn-md
                                        rounded-pill
                                        d-inline-flex align-items-center gap-2
                                        px-1 px-md-4
                                        py-1 py-md-2
                                        "
                                            href={`${process.env.PUBLIC_URL}/assets/files/ScottLayla_Resume2024.pdf`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <i className="bi bi-arrow-down-circle-fill fs-7 fs-md-4" />
                                            Download Resume
                                        </a>

                                        <a
                                            className="
                                        btn btn-outline-dark
                                        btn-sm btn-md
                                        rounded-pill
                                        d-inline-flex align-items-center gap-2
                                        px-1 px-md-4
                                        py-1 py-md-2
                                        "
                                            href="https://www.linkedin.com/in/laylascott/"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <i className="bi bi-linkedin fs-7 fs-md-4" />
                                            Connect with Me
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
