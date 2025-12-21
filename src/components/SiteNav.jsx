import React from "react";
import { NavLink } from "react-router-dom";

export default function SiteNav() {
    return (
        <nav
            className="navbar navbar-expand-lg navbar-light px-4 py-3"
            style={{
                "--nav-h": "72px",
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(8px)"
            }}
        >
            <div className="container">




                {/* Brand */}
                <NavLink className="navbar-brand fw-bold" to="/">
                    <span className="fw-bold">Layla</span> Scott
                </NavLink>

                {/* Mobile toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#siteNav"
                    aria-controls="siteNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                {/* Links */}
                <div className="collapse navbar-collapse" id="siteNav">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink end className="nav-link" to="/">
                                About Me
                            </NavLink>
                        </li>
                
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/blog">
                                Blog
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
