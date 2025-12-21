import React from "react";
import SiteNav from "../components/SiteNav";

export default function Blog() {
  const posts = [
    {
      title: "Hackathon UI/UX Winners",
      subtitle: "Virginia Tech • Fall 2024",
      body: `The Tridium interns took on VT Hacks 12! Each of us brought our unique skills to the table:
Rayan with his Java and backend expertise, Prinston leading the way with cloud technologies and AI,
and I focused on JavaScript/React and frontend development. Together, we built a project I’d been
dreaming of for years—one that channels my love of fish with our technical skills.
It was a whirlwind 36 hours of coding, problem-solving, and collaboration, and I couldn’t have asked
for a better team or a more exciting challenge.`,
      image: `${process.env.PUBLIC_URL}/assets/images/hackathon.png`,
      ctaText: "See the Project",
      ctaHref: "https://www.linkedin.com/posts/rayanbouhal_excited-to-share-that-my-team-and-i-won-best-ugcPost-7248461751086678016-w7aq?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEGPNY0BAL7ZFoQMb5Pf1QucfBZb5lSzhIA",
    },
    {
      title: "Intern Layla",
      subtitle: "Richmond, Virginia • Summer 2024",
      body: `This summer, I had the privilege of interning with Tridium and the Bandits. It was incredibly
rewarding to see my work pushed to main, allowing it to be used by real customers. I’m also grateful
for the chance to pitch ideas to the team—shout out to the Bandits for their support—and I’m humbled
that these ideas are being seriously considered for production. This experience taught me valuable
skills like TDD and Agile development and helped shape my career focus toward industry.`,
      image: `${process.env.PUBLIC_URL}/assets/images/bandits.png`,
      ctaText: "Connect with Me",
      ctaHref: "https://www.linkedin.com/in/laylascott/",
      external: true,
    },
    {
      title: "Just an East Coast Girl out West",
      subtitle: "4C’s in Spokane, Washington • Spring 2024",
      body: `The 4 C’s (Conference on College Composition and Communication) was quite the adventure for a STEM major like me—
who often won’t crack open the textbook until the night before the exam (don’t tell my professors 😅).
It was fascinating to dive into a world I rarely explore, and I’m already eyeing a return in 2025.`,
      image: `${process.env.PUBLIC_URL}/assets/images/baniya.jpg`,
      ctaText: "See My Poster",
      ctaHref: `${process.env.PUBLIC_URL}/assets/images/LaylaScott_Poster_Towards-Digital-Justice.jpg`,
      external: true,
    },
  ];

  return (
    <>
      <SiteNav />

      <main>
        {/* Hero header (Home-like) */}
        <section className="py-5">
          <div className="container">
            <div className="bg-white bg-opacity-75 rounded-4 shadow-sm p-4 p-lg-5">
              <div className="row align-items-center g-4">
                <div className="col-12 col-lg-7">
                  <p className="text-uppercase text-muted fw-semibold mb-2">Blog</p>
                  <h1 className="display-5 fw-bold mb-2">Tech Blog</h1>
                  <p className="lead mb-4">
                    Stay updated on my most recent adventures as I explore the world of tech.
                  </p>

                  
                </div>

                {/* Instead of lottie script/custom element, use an image (or add lottie later) */}
                <div className="col-12 col-lg-5 text-center">
                  <div className="position-relative d-inline-block">
                    <div
                      className="position-absolute top-50 start-50 translate-middle rounded-circle"
                      style={{
                        width: 360,
                        height: 360,
                        background:
                          "linear-gradient(135deg, rgb(203, 211, 164) 0%, rgb(173, 172, 184) 100%)",
                        filter: "blur(38px)",
                        opacity: 0.55,
                        zIndex: 0,
                        pointerEvents: "none",
                      }}
                    />
                   
                  </div>
                </div>
              </div>
            </div>

            {/* Posts */}
            <div id="posts" className="mt-4 mt-lg-5">
              <div className="d-flex flex-column gap-3">
                {posts.map((p) => (
                  <article key={p.title} className="bg-white bg-opacity-75 rounded-4 shadow-sm p-4 p-lg-5">
                    <div className="row align-items-center g-4">
                      <div className="col-12 col-lg-7">
                        <h2 className="h4 fw-bold mb-1">{p.title}</h2>
                        <p className="text-muted mb-3">{p.subtitle}</p>
                        <p className="mb-4" style={{ whiteSpace: "pre-line" }}>
                          {p.body}
                        </p>

                        {p.ctaHref ? (
                          <a
                            className="btn btn-outline-dark btn-sm btn-md rounded-pill px-3 px-md-4"
                            href={p.ctaHref}
                            target={p.external ? "_blank" : undefined}
                            rel={p.external ? "noreferrer" : undefined}
                          >
                            {p.ctaText}
                            <i className="bi bi-arrow-right ms-2" />
                          </a>
                        ) : null}
                      </div>

                      <div className="col-12 col-lg-5 text-center">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="img-fluid rounded-4 shadow"
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
