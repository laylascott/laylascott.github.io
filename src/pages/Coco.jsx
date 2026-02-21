import React, { useMemo, useState } from "react";
import { HashLink } from "react-router-hash-link";

/**
 * Adoptable Dog Profile Page (single-file component)
 * - Replace the `dog` object with your real data.
 * - Optional: wire Apply/Contact buttons to your forms or mailto links.
 */

const dog = {
    name: "Coco",
    pronouns: "he/him",
    statusBadge: "Adopt Me!",
    location: "Richmond, VA",
    canTransport: false,

    // Media
    heroImage:
        `${process.env.PUBLIC_URL}/assets/images/hero-coco.jpg`,
    gallery: [
        `${process.env.PUBLIC_URL}/assets/images/car-coco.jpg`,
        `${process.env.PUBLIC_URL}/assets/images/coco-and-friends.jpg`,
        `${process.env.PUBLIC_URL}/assets/images/chillman.jpg`,
        `${process.env.PUBLIC_URL}/assets/images/on-the-move-coco.jpg`
    ],

    // Basics
    tagline: "This bundle of fluff is always ready to make you smile.",
    birthday: "2013-07-07",
    breed: "Throwback Pomeranian",
    size: "Small",
    weight: "22 lbs",
    sex: "Male",
    coat: "Long",
    color: "Black",
    microchipped: false,

    // Personality + needs
    personalityTags: ["Cuddly", "Happy-go-lucky", "Food-motivated", "People-lover"],
    energyLevel: 3, // 1–5
    exercise: "Loves to play tug and fetch with his stuffies and enjoys daily walks",
    grooming: "Brushing 1-2 times a week, sanitary grooming every 6 weeks, monthly baths",
    homeIdeal: [
        "Adults or kids who enjoy interactive play, as he’s sturdy and doesn’t mind a little roughhousing",
        "Apartment-friendly, though like many Pomeranians he may alert bark at unfamiliar sounds",
        "A family comfortable managing daily medications and a special allergy-friendly diet",
        "In multi-dog homes, separate feeding may be needed to keep him on his food plan",
        "He bonds closely with his person and may occasionally grumble if someone approaches unexpectedly, so clear boundaries and gentle management are helpful",
    ],

    // Training
    training: {
        pottyTrained: "Yes",
        crateTrained: "Mostly (will intially bark at being crated, but eventually settles)",
        leash: "Good, sometimes pulls when excited—improving with training",
        commands: ["Sit", "Touch (working on it)"],
        notes:
            "Responds best to treats + praise. Keep sessions short for full attention span.",
    },

    // Compatibility
    compatibility: {
        dogs: "Yes",
        cats: "Yes",
        kids: "Yes",
        strangers: "Yes",
        notes:
            "As with any pet it is important to monitor introductions and respect his space, but does well with just about everything.",
    },

    // Health
    health: {
        spayNeuter: "Neutered",
        vaccines: "Up to date",
        heartworm: "Negative; on prevention",
        fleaTick: "On prevention",
        conditions: "Arthritis, Heart Murmur",
        allergies: "Chicken and Beef",
        meds: "5mg Enalapril, 100 mg Gabapentin, 2.5 mg Vetmedin",
        vetNotes: "",
    },

    // Adoption logistics
    adoptionFee: "$350",
    includes: ["Neuter", "Vaccines", "Heartworm test", "Prevention"],
    meetAndGreet: "Meet-and-greets available weekends + some weekday evenings.",
    applyUrl: "#", // link to your application page
    contact: {
        name: "Ashley",
        email: "dancersbridgedogrescue@gmail.com",
        orgName: "Dancers Bridge Dog Rescue",
    },

    // Senior spotlight
    isSenior: true,
    seniorNote:
        "Coco is a happy senior who needs daily meds and a special diet for allergies. He’s doing great on his routine — just needs someone consistent.",

    // Special diet + meds (structured so we can render + cost them)
    care: {
        specialDiet: {
            title: "Allergy-friendly diet",
            notes: "Allergic to chicken and beef. Does best on limited-ingredient / novel protein foods.",
            foods: [
                {
                    name: "Royal Canin Veterinary Diet Adult Hydrolyzed Protein HP Dry Dog Food",
                    amountPerMonth: "1 bag/month",
                    link: "https://www.chewy.com/royal-canin-veterinary-diet/dp/33948", // optional Chewy link
                    monthlyCost: 57.94, // put a number when you know it, e.g. 68.99
                },
                {
                    name: "Allergy-friendly treats (freeze dried salmon)",
                    amountPerMonth: "0.5 bag/month",
                    link: "https://www.chewy.com/purebites-salmon-freeze-dried-raw-dog/dp/177294",
                    monthlyCost: 5.94,
                },
            ],
        },
        medications: [
            {
                name: "Enalapril",
                dose: "5 mg",
                frequency: "every 12 hours",
                monthlyCost: 4.84,
            },
            {
                name: "Gabapentin",
                dose: "100 mg",
                frequency: "every 12 hours",
                monthlyCost: 7.43,
            },
            {
                name: "Vetmedin",
                dose: "2.5 mg",
                frequency: "every 12 hours",
                monthlyCost: 49.65,
            },
        ],
        otherMonthly: [
            { name: "Heartworm prevention", link: "https://www.chewy.com/iverhart-max-chew-dogs-121-25-lbs/dp/181625", monthlyCost: 7.71 },
            { name: "Flea/tick prevention", link: "https://www.chewy.com/frontline-plus-flea-tick-spot/dp/32670", monthlyCost: 12.50 },
        ],
        disclaimer:
            "Costs vary by brand, dosage, and pharmacy. Costs are calculated based on monthly prices and may not reflect checkout prices, especially for items that are bought in bulk. This is just an estimate of typical monthly spend at his foster's.",
    },

    // Shareable blurb (for copy/paste)
    shareBlurb:
        "Meet Coco! A 12-year-old throwback Pom who loves walks, stuffed toys, and lots of cuddles. Neutered, vaccinated, and looking for a cozy forever home. He’s on daily meds and a special allergy-friendly diet (chicken + beef allergies). Located in Richmond, VA. Apply to adopt!",
};

function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
}

function energyLabel(level) {
    const l = clamp(level, 1, 5);
    return ["Low", "Low–Medium", "Medium", "Medium–High", "High"][l - 1];
}

function copyToClipboard(text) {
    if (!navigator?.clipboard?.writeText) return false;
    navigator.clipboard.writeText(text);
    return true;
}

const Stat = ({ label, value }) => (
    <div className="stat">
        <div className="statLabel">{label}</div>
        <div className="statValue">{value}</div>
    </div>
);

const Section = ({ title, children, id }) => (
    <section className="section" id={id}>
        <h2 className="sectionTitle">{title}</h2>
        {children}
    </section>
);




function MonthlyTotal() {
    const meds = dog.care?.medications ?? [];
    const foods = dog.care?.specialDiet?.foods ?? [];
    const other = dog.care?.otherMonthly ?? [];

    const total =
        meds.reduce((s, x) => s + (Number(x.monthlyCost) || 0), 0) +
        foods.reduce((s, x) => s + (Number(x.monthlyCost) || 0), 0) +
        other.reduce((s, x) => s + (Number(x.monthlyCost) || 0), 0);

    const hasAny = total > 0;

    return (
        <div className="totalRow">
            <div>
                <div className="cardTitle">Estimated monthly total</div>
                <div className="smallMuted">
                    {hasAny ? "Based on the items above" : "Add monthlyCost values to show a total"}
                </div>
            </div>
            <div className="totalValue">{hasAny ? `$${total.toFixed(2)}/mo` : "—"}</div>
        </div>
    );
}

function calculateAge(birthday) {
    const birthDate = new Date(birthday);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

    if (today.getDate() < birthDate.getDate()) {
        months--;
        if (months < 0) {
            years--;
            months += 12;
        }
    }

    return `${years} year${years !== 1 ? "s" : ""} ${months} month${months !== 1 ? "s" : ""}`;
}

function formatBirthday(isoDate) {
    const [year, month, day] = isoDate.split("-").map(Number);
    const date = new Date(year, month - 1, day); // local date, no UTC shift

    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(date);
}

function ReceiptRow({ title, meta, price, link }) {
    return (
        <div className="receiptRow">
            <div className="receiptLeft">
                <div className="receiptTitle">{title}</div>
                {meta ? <div className="receiptMeta">{meta}</div> : null}
            </div>

            <div className="receiptRight">
                {price ? <div className="receiptPrice">{price}</div> : null}
                {link ? (
                    <a className="receiptLink" href={link} target="_blank" rel="noreferrer">
                        View
                    </a>
                ) : null}
            </div>
        </div>
    );
}

function SectionHeader({ title, subtitle }) {
    return (
        <div className="receiptHeader">
            <div className="receiptHeaderTitle">{title}</div>
            {subtitle ? <div className="receiptHeaderSub">{subtitle}</div> : null}
        </div>
    );
}

export default function AdoptableDogPage() {
    const [activeImg, setActiveImg] = useState(dog.heroImage);
    const [copied, setCopied] = useState(false);

    const energy = useMemo(() => energyLabel(dog.energyLevel), []);

    const mailto = useMemo(() => {
        const subject = encodeURIComponent(`Request adoption application: ${dog.name}`);
        const body = encodeURIComponent(
            `Hi ${dog.contact.orgName} team,\n\nI’m interested in adopting ${dog.name}. Could you please email me the adoption application and next steps?\n\nName:\nPhone:\nCity/State:\nHousehold (kids/other pets):\nExperience with dogs:\nBest times for a meet-and-greet:\n\nThank you!\n`
        );
        return `mailto:${dog.contact.email}?subject=${subject}&body=${body}`;
    }, []);

    const handleEmail = (e) => {
        e.preventDefault();
        window.location.href = mailto;
    };

    const age = useMemo(() => calculateAge(dog.birthday), [dog.birthday]);
    const formattedBirthday = useMemo(() => formatBirthday(dog.birthday), [dog.birthday]);

    return (
        <div className="page">
            <StyleTag />

            {/* HERO */}
            <header className="hero">
                <div className="heroMedia">
                    <img className="heroImage" src={activeImg} alt={`${dog.name}`} />
                    <div className="thumbRow">
                        {[dog.heroImage, ...dog.gallery].map((src) => (
                            <button
                                key={src}
                                className={`thumbBtn ${src === activeImg ? "thumbActive" : ""}`}
                                onClick={() => setActiveImg(src)}
                                aria-label="Select photo"
                            >
                                <img className="thumbImg" src={src} alt="thumbnail" />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="heroContent">

                    <h1 className="title">
                        {dog.name} <span className="muted">({dog.pronouns})</span>
                    </h1>
                    <div className="badges">
                        <span className="badge badgeSoft">{dog.location}</span>
                    </div>
                    <p className="tagline">{dog.tagline}</p>


                    {dog.isSenior ? (
                        <div className="seniorBanner">
                            <b>Senior pup ❤️</b> Daily meds + allergy-friendly food (chicken & beef allergy)
                        </div>
                    ) : null}

                    {/* Top stats (single column) */}
                    <div className="statsSingle">
                        <Stat label="Age" value={age} />
                        <Stat label="Birthday" value={formattedBirthday} />
                        <Stat label="Breed" value={dog.breed} />
                    </div>

                    {/* Bottom stats (2x2 grid) */}
                    <div className="statsGrid2x2">
                        <Stat label="Size" value={dog.size} />
                        <Stat label="Weight" value={dog.weight} />
                        <Stat label="Sex" value={dog.sex} />
                        <Stat label="Energy" value={`${energy}`} />
                        <Stat label="Coat" value={dog.coat} />
                        <Stat label="Color" value={dog.color} />
                    </div>

                    {/* Personality first */}
                    <div className="chips">
                        {dog.personalityTags.map((t) => (
                            <span key={t} className="chip">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </header>

            <div className="heroContent mt-3">
                <div className="callout" style={{ marginTop: 12 }}>
                    <div className="calloutTitle">Ready to meet Coco?</div>
                    <p className="p" style={{ marginBottom: 10 }}>
                        Apply to adopt, or scroll for details on training, health, and monthly care.
                    </p>
                    <div className="ctaRow">
                        <a className="btn btnOutline" href="https://dancersbridgedogrescue.squarespace.com/volunteer">Apply to Adopt Coco</a>
                    </div>
                </div>


                <nav className="jumpLinks">
                    <HashLink smooth to="#story">Story</HashLink>
                    <HashLink smooth to="#training">Training</HashLink>
                    <HashLink smooth to="#compatibility">Compatibility</HashLink>
                    <HashLink smooth to="#health">Health</HashLink>
                    <HashLink smooth to="#adoption">Adoption Details</HashLink>
                </nav>
            </div>

            {/* BODY */}
            <main className="content">
                <div className="leftCol">

                    <Section title="Story" id="story">
                        <p className="p">
                            {dog.name} spent his whole life devoted to one person. When his owner passed away, his world changed overnight,
                            and with the family unable to take over his care, this sweet senior suddenly found himself starting over.
                        </p>

                        <p className="p">
                            But you’d never guess he’s been through loss. {dog.name} greets each day with a wagging tail and bright eyes.
                            He loves his walks, proudly carries his favorite stuffed toys, and happily curls up beside you once the excitement winds down.
                        </p>

                        <p className="p">
                            He bonds deeply, thrives on routine and gentle affection, and is ready to give someone the same lifelong loyalty
                            he’s always shown.
                        </p>


                        <div className="callout">
                            <div className="calloutTitle">Ideal home</div>
                            <ul className="list">
                                {dog.homeIdeal.map((x) => (
                                    <li key={x}>{x}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="callout">
                            <div className="calloutTitle">Exercise needs</div>
                            <p className="p">{dog.exercise}</p>
                        </div>

                        <div className="callout">
                            <div className="calloutTitle">Grooming needs</div>
                            <p className="p">{dog.grooming}</p>
                        </div>
                    </Section>

                    <Section title="Training" id="training">
                        <div className="grid2">
                            <div className="card">
                                <div className="cardTitle">Basics</div>
                                <ul className="list">
                                    <li><b>Potty Trained:</b> {dog.training.pottyTrained}</li>
                                    <li><b>Crate Trained:</b> {dog.training.crateTrained}</li>
                                    <li><b>Leash:</b> {dog.training.leash}</li>
                                </ul>
                            </div>
                            <div className="card">
                                <div className="cardTitle">Commands</div>
                                <ul className="list">
                                    {dog.training.commands.map((c) => (
                                        <li key={c}>{c}</li>
                                    ))}
                                </ul>
                                <p className="smallMuted">{dog.training.notes}</p>
                            </div>
                        </div>
                    </Section>


                    <Section title="Compatibility" id="compatibility">
                        <div className="grid2">
                            <div className="card">
                                <div className="cardTitle">With…</div>
                                <ul className="list">
                                    <li><b>Dogs:</b> {dog.compatibility.dogs}</li>
                                    <li><b>Cats:</b> {dog.compatibility.cats}</li>
                                    <li><b>Kids:</b> {dog.compatibility.kids}</li>
                                    <li><b>Strangers:</b> {dog.compatibility.strangers}</li>
                                </ul>
                            </div>
                            <div className="card">
                                <div className="cardTitle">Notes</div>
                                <p className="p">{dog.compatibility.notes}</p>
                            </div>
                        </div>
                    </Section>

                    <Section title="Health" id="health">
                        <div className="card">
                            <ul className="list">
                                <li><b>Spay/Neuter:</b> {dog.health.spayNeuter}</li>
                                <li><b>Vaccines:</b> {dog.health.vaccines}</li>
                                <li><b>Heartworm:</b> {dog.health.heartworm}</li>
                                <li><b>Flea/Tick:</b> {dog.health.fleaTick}</li>
                                <li><b>Conditions:</b> {dog.health.conditions}</li>
                                <li><b>Allergies:</b> {dog.health.allergies}</li>
                                <li><b>Meds:</b> {dog.health.meds}</li>
                                <li><b>Microchipped:</b> {dog.microchipped ? "Yes" : "No"}</li>
                            </ul>
                            <p className="smallMuted">{dog.health.vetNotes}</p>
                        </div>
                    </Section>
                </div>

                <aside className="rightCol">


                    {dog.isSenior ? (
                        <Section title="Senior care & monthly costs" id="costs">
                            <div className="card">
                                <div className="receiptHeader">
                                    <div className="receiptHeaderTitle">Senior spotlight</div>
                                    <div className="receiptHeaderSub">{dog.seniorNote}</div>
                                </div>
                                <div className="divider" />

                                <SectionHeader title="Medications" />
                                <div className="receiptList">
                                    {dog.care.medications.map((m) => (
                                        <ReceiptRow
                                            key={m.name}
                                            title={m.name}
                                            meta={`${m.dose}, ${m.frequency}`}
                                            price={
                                                typeof m.monthlyCost === "number" && m.monthlyCost > 0
                                                    ? `$${m.monthlyCost.toFixed(2)}/mo`
                                                    : null
                                            }
                                            link={m.link}
                                        />
                                    ))}
                                </div>

                                <div className="divider" />

                                <SectionHeader title={dog.care.specialDiet.title} subtitle={dog.care.specialDiet.notes} />
                                <div className="receiptList">
                                    {dog.care.specialDiet.foods.map((f) => (
                                        <ReceiptRow
                                            key={f.name}
                                            title={f.name}
                                            meta={f.amountPerMonth}
                                            price={
                                                typeof f.monthlyCost === "number" && f.monthlyCost > 0
                                                    ? `$${f.monthlyCost.toFixed(2)}/mo`
                                                    : null
                                            }
                                            link={f.link}
                                        />
                                    ))}
                                </div>

                                {dog.care.otherMonthly?.length ? (
                                    <>
                                        <div className="divider" />
                                        <SectionHeader title="Other monthly essentials" />
                                        <div className="receiptList">
                                            {dog.care.otherMonthly.map((x) => (
                                                <ReceiptRow
                                                    key={x.name}
                                                    title={x.name}
                                                    price={
                                                        typeof x.monthlyCost === "number" && x.monthlyCost > 0
                                                            ? `$${x.monthlyCost.toFixed(2)}/mo`
                                                            : null
                                                    }
                                                    link={x.link}
                                                />
                                            ))}
                                        </div>
                                    </>
                                ) : null}

                                <div className="divider" />

                                {/* Total (auto-calculated) */}
                                <MonthlyTotal />

                                <p className="smallMuted">{dog.care.disclaimer}</p>
                            </div>
                        </Section>
                    ) : null}

                    <Section title="Adoption details" id="adoption">
                        <div className="card">
                            <div className="priceRow">
                                <div>
                                    <div className="cardTitle">Adoption fee</div>
                                    <div className="price">{dog.adoptionFee}</div>
                                </div>
                                <div className="pill">
                                    Includes: {dog.includes.length} items
                                </div>
                            </div>
                            <ul className="list">
                                {dog.includes.map((x) => (
                                    <li key={x}>{x}</li>
                                ))}
                            </ul>
                            <div className="divider" />
                            <p className="p">
                                <b>Contact:</b> {dog.contact.name} ({dog.contact.orgName})
                                <br />
                                <a className="link" href={mailto}>{dog.contact.email}</a>
                            </p>

                            <div className="ctaCol">
                                <a className="btn btnPrimary" href="https://dancersbridgedogrescue.squarespace.com/volunteer">
                                    Apply to adopt
                                </a>
                            </div>
                        </div>
                    </Section>

                </aside>
            </main>
        </div>
    );
}

// mobilefirst
function StyleTag() {
    return (
        <style>{`
        :root{
          --pageBg:#f6f7fb;
          --surface:#ffffff;
          --surface2:#fbfbfd;
          --text:#0f172a;
          --muted:#64748b;
          --line:#e2e8f0;
  
          --blue:#2563eb;
          --blueSoft:rgba(37,99,235,.10);
  
          --green:#16a34a;
          --greenSoft:rgba(22,163,74,.10);
  
          --shadow:0 10px 25px rgba(2,6,23,.06);
        }
  
        *{ box-sizing:border-box; }
        html, body { width:100%; overflow-x:hidden; }
        img, iframe { max-width:100%; display:block; }
  
        body{
          margin:0;
          background:var(--pageBg);
          color:var(--text);
          font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;
        }
  
        /* Mobile-first layout */
        .page{ padding:12px; max-width:1200px; margin:0 auto; }
        .hero{ display:grid; grid-template-columns:1fr; gap:12px; align-items:start; }
  
        .heroMedia{
          background:var(--surface);
          border:1px solid var(--line);
          border-radius:16px;
          padding:10px;
          box-shadow:var(--shadow);
        }
  
        /* Mobile-first: show full photo (portrait + landscape) */
        .heroImage{
          width:100%;
          height:clamp(260px, 72vw, 420px);
          object-fit:contain;
          padding:6px;
          background:#f1f5f9;
          border-radius:14px;
          border:1px solid var(--line);
        }
  
        .thumbRow{ display:flex; gap:8px; margin-top:10px; overflow:auto; padding-bottom:4px; }
        .thumbBtn{ border:1px solid var(--line); padding:0; border-radius:12px; background:transparent; cursor:pointer; flex:0 0 auto; }
        .thumbActive{ outline:2px solid var(--blue); border-color:transparent; }
        .thumbImg{ width:64px; height:48px; object-fit:cover; border-radius:12px; }
  
        .heroContent{
          background:var(--surface);
          border:1px solid var(--line);
          border-radius:16px;
          padding:12px;
          box-shadow:var(--shadow);
        }
  
        .badges{ display:flex; gap:8px; flex-wrap:wrap; }
        .badge{
          font-size:12px;
          padding:6px 10px;
          border-radius:999px;
          border:1px solid var(--line);
          background:var(--surface2);
          color:var(--text);
        }
        .badgePrimary{ background:var(--blueSoft); border-color:rgba(37,99,235,.25); color:#1d4ed8; }
        .badgeSoft{ background:var(--surface2); color:var(--muted); }
  
        .title{ margin:8px 0 6px; font-size:26px; line-height:1.1; }
        .muted{ color:var(--muted); font-weight:500; font-size:14px; }
        .tagline{ color:var(--muted); margin:0 0 10px; }
  
        .seniorBanner{
          margin:10px 0 8px;
          padding:10px 12px;
          border-radius:14px;
          border:1px solid rgba(22,163,74,.25);
          background:rgba(22,163,74,.08);
          color:#166534;
          font-size:13px;
        }
  
        /* Mobile-first: stack stats */
        .statsGrid{ display:grid; grid-template-columns:1fr; gap:10px; margin:10px 0 12px; }
        .stat{ border:1px solid var(--line); border-radius:14px; padding:10px; background:var(--surface2); }
        .statLabel{ font-size:12px; color:var(--muted); }
        .statValue{ font-size:14px; margin-top:2px; color:var(--text); }
        /* Single column stack */
        .statsSingle {
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;
        margin: 10px 0;
        }

        /* 2x2 grid — works even on mobile */
        .statsGrid2x2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        }
  
        /* Mobile-first: full-width CTAs */
        .ctaRow{ display:grid; gap:10px; margin:6px 0 10px; }
        .btn{
          width:100%;
          border-radius:14px;
          padding:12px 12px;
          border:1px solid var(--line);
          background:var(--surface);
          color:var(--text);
          cursor:pointer;
          text-decoration:none;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          min-height:44px; /* finger-friendly */
        }
        .btnPrimary{ background:var(--greenSoft); border-color:rgba(22,163,74,.25); color:#166534; font-weight:700; }
        .btnOutline{ background:var(--blueSoft); border-color:rgba(37,99,235,.25); color:#1d4ed8; font-weight:700; }
        .btnGhost{ background:var(--surface2); color:var(--text); }
  
        .chips{ display:flex; flex-wrap:wrap; gap:8px; margin-top:10px; }
        .chip{ font-size:12px; padding:6px 10px; border-radius:999px; background:var(--surface2); border:1px solid var(--line); color:var(--muted); }
  
        .jumpLinks{ display:flex; gap:12px; margin-top:12px; flex-wrap:wrap; }
        .jumpLinks a{ color:var(--blue); text-decoration:none; font-size:13px; }
  
        .ctaIntro {
  margin: 12px 0 8px;
  font-size: 14px;
  color: var(--muted);
}

.jumpDivider {
  height: 1px;
  background: var(--line);
  margin: 16px 0;
}

        /* Mobile-first: single column body */
        .content{ display:grid; grid-template-columns:1fr; gap:12px; margin-top:12px; align-items:start; }
  
        .section{
          background:var(--surface);
          border:1px solid var(--line);
          border-radius:16px;
          padding:12px;
          margin-bottom:12px;
          box-shadow:var(--shadow);
        }
        .sectionTitle{ margin:0 0 10px; font-size:16px; }
  
        .p{ margin:0 0 10px; color:var(--text); opacity:.92; }
        .smallMuted{ margin:8px 0 0; color:var(--muted); font-size:13px; }
  
        /* Mobile-first: stack "grid2" */
        .grid2{ display:grid; grid-template-columns:1fr; gap:12px; }
  
        .card{ border:1px solid var(--line); border-radius:16px; padding:10px; background:var(--surface2); }
        .cardTitle{ font-weight:700; margin-bottom:8px; color:var(--text); }
  
        .list{ margin:0; padding-left:18px; color:var(--text); }
        .list li { word-break: break-word; }
  
        .callout{
          margin-top:12px;
          border:1px dashed rgba(37,99,235,.35);
          border-radius:16px;
          padding:12px;
          background:rgba(37,99,235,.06);
        }
        .calloutTitle{ font-weight:700; margin-bottom:6px; color:var(--text); }
  
        .priceRow{ display:flex; flex-direction:column; align-items:flex-start; gap:8px; }
        .price{ font-size:20px; font-weight:900; margin-top:2px; color:var(--text); }
        .pill{
          font-size:12px;
          padding:6px 10px;
          border-radius:999px;
          border:1px solid var(--line);
          background:var(--surface);
          color:var(--muted);
        }
  
        .divider{ height:1px; background:var(--line); margin:12px 0; }
        .link{ color:var(--blue); text-decoration:none; word-break:break-word; }
  
        .ctaCol{ display:grid; gap:10px; margin-top:10px; }
  
        .textarea{
          width:100%;
          min-height:110px;
          border-radius:14px;
          border:1px solid var(--line);
          background:var(--surface);
          color:var(--text);
          padding:10px;
          resize:vertical;
        }
  
        .videoWrap{ border-radius:16px; overflow:hidden; border:1px solid var(--line); }
        .video{ width:100%; aspect-ratio:16/9; border:0; display:block; }
  
        .money{ color:#166534; font-weight:800; }
        .totalRow{ display:flex; flex-direction:column; align-items:flex-start; gap:6px; }
        .totalValue{ font-size:18px; font-weight:900; color:#166534; white-space:nowrap; }
  
        /* ====== Tablet+ (min-width = mobile-first) ====== */
        @media (min-width: 600px) {
          .page{ padding:16px; }
          .title{ font-size:30px; }
          .muted{ font-size:16px; }
          .statsGrid{ grid-template-columns:repeat(2, 1fr); }
          .ctaRow{ grid-template-columns:1fr 1fr; }
          .thumbImg{ width:76px; height:56px; }
          .heroImage{ height:clamp(320px, 55vw, 520px); padding:6px; }
        }
  
        /* ====== Desktop+ ====== */
        @media (min-width: 980px) {
          .page{ padding:20px; }
          .hero{ grid-template-columns:1.1fr 0.9fr; gap:18px; }
          .heroContent, .heroMedia, .section{ border-radius:18px; }
          .heroContent{ padding:16px; }
          .title{ font-size:34px; }
          .muted{ font-size:18px; }
  
          /* Desktop: fill hero nicely */
          .heroImage{
            height:clamp(420px, 40vw, 620px);
            object-fit:cover;
            padding:0;
            background:transparent;
          }
  
          .content{ grid-template-columns:1fr 380px; gap:18px; margin-top:18px; }
          .statsGrid{ grid-template-columns:repeat(3, 1fr); }
          .grid2{ grid-template-columns:1fr 1fr; }
          .priceRow{ flex-direction:row; justify-content:space-between; align-items:flex-start; }
          .totalRow{ flex-direction:row; justify-content:space-between; align-items:flex-start; }
        }

        /* Receipt layout (replaces <ul> bullets for the costs area) */
.receiptHeader {
  margin: 0 0 8px;
}
.receiptHeaderTitle {
  font-weight: 800;
  color: var(--text);
}
.receiptHeaderSub {
  margin-top: 4px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.35;
}

.receiptList {
  display: grid;
  gap: 10px;
}

/* 2-column row: details left, price/link right */
.receiptRow {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: start;
  padding: 10px 0;
  border-bottom: 1px solid var(--line);
}
.receiptRow:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.receiptLeft {
  min-width: 0; /* allows text to wrap nicely */
}
.receiptTitle {
  font-weight: 750;
  line-height: 1.25;
  word-break: break-word;
}
.receiptMeta {
  margin-top: 4px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.35;
}

.receiptRight {
  display: grid;
  justify-items: end;
  gap: 6px;
  white-space: nowrap;
}
.receiptPrice {
  font-weight: 900;
  color: #166534;
}
.receiptLink {
  color: var(--blue);
  text-decoration: none;
  font-size: 13px;
}

/* Make the right column drop under on super tiny screens */
@media (max-width: 360px) {
  .receiptRow {
    grid-template-columns: 1fr;
  }
  .receiptRight {
    justify-items: start;
    white-space: normal;
  }
}
      `}</style>
    );
}