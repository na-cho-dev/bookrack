import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Check,
  ChevronRight,
  Library,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ImageAssets } from "../assets/assets";

const Home = () => (
  <main className="landing">
    <section className="landing-hero">
      <div className="landing-orb landing-orb-one" />
      <div className="landing-orb landing-orb-two" />
      <div className="landing-wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <Sparkles size={15} /> Library life, in order
          </p>
          <h1>
            The calm, clear way to run <em>every shelf.</em>
          </h1>
          <p className="hero-lede">
            BookRack gives your organization one welcoming place to catalogue
            books, find what is available, and keep every borrow on track.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/register">
              Create your library <ArrowRight size={18} />
            </Link>
            <Link className="button button-quiet" to="/login">
              Sign in <ChevronRight size={17} />
            </Link>
          </div>
          <div className="trust-row">
            <span>
              <Check size={15} /> Searchable collection
            </span>
            <span>
              <Check size={15} /> Simple borrowing
            </span>
            <span>
              <Check size={15} /> Live status
            </span>
          </div>
        </div>
        <div
          className="shelf-stage"
          aria-label="A preview of a BookRack library"
        >
          <div className="stage-note">
            YOUR LIBRARY <span>● Online</span>
          </div>
          <div className="book-stack">
            <div className="book book-a">
              <span>NORTH</span>
              <small>STORIES</small>
            </div>
            <div className="book book-b">
              THE
              <br />
              ATLAS
            </div>
            <div className="book book-c">
              LITTLE
              <br />
              WORLDS
            </div>
            <div className="book book-d">
              FORM &amp;
              <br />
              FEELING
            </div>
          </div>
          <div className="shelf-line" />
          <div className="preview-card">
            <div className="preview-icon">
              <Search size={18} />
            </div>
            <div>
              <strong>Find the right book</strong>
              <p>Search by title, author or genre</p>
            </div>
          </div>
          <div className="availability">
            <span className="availability-dot" /> Books available
          </div>
        </div>
      </div>
    </section>
    <section className="landing-section landing-wrap experience">
      <div>
        <p className="eyebrow">BUILT FOR REAL COLLECTIONS</p>
        <h2>From the first scan to the return shelf.</h2>
      </div>
      <p className="section-copy">
        BookRack brings the everyday moments of a shared library into one
        dependable workspace—for the people who manage it and the readers who
        rely on it.
      </p>
    </section>
    <section className="landing-wrap workflow">
      <article>
        <span className="step-no">01</span>
        <Building2 />
        <h3>Set up your space</h3>
        <p>
          Register an organization and keep its collection and members together.
        </p>
      </article>
      <article>
        <span className="step-no">02</span>
        <BookOpen />
        <h3>Make books discoverable</h3>
        <p>Organize titles with the details readers use to make a choice.</p>
      </article>
      <article>
        <span className="step-no">03</span>
        <Library />
        <h3>Keep circulation moving</h3>
        <p>
          Request, approve, borrow, and return with a clear status at every
          step.
        </p>
      </article>
    </section>
    <section className="landing-section feature-band">
      <div className="landing-wrap feature-layout">
        <div className="feature-visual">
          <img
            src={ImageAssets.featuredHighlightBgImg1}
            alt="Books arranged on shelves"
          />
          <div className="visual-label">
            <ShieldCheck /> A place for every record
          </div>
        </div>
        <div>
          <p className="eyebrow">ONE SHARED READING SPACE</p>
          <h2>Useful at a glance. Thoughtful in the details.</h2>
          <p className="section-copy">
            Members can browse what is ready to borrow. Library admins can
            manage titles, members, requests, and returns without losing the
            thread.
          </p>
          <Link className="text-link" to="/register">
            Start organizing your collection <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
    <section className="landing-wrap closing">
      <p className="eyebrow">MAKE ROOM FOR READING</p>
      <h2>Your next chapter starts with a better rack.</h2>
      <p>
        Bring your organization’s books, readers, and circulation into focus.
      </p>
      <Link className="button button-primary" to="/register">
        Get started with BookRack <ArrowRight size={18} />
      </Link>
    </section>
    <footer className="landing-footer">
      <div className="landing-wrap footer-inner">
        <Link to="/" className="brand-mark">
          <img src={ImageAssets.logo} alt="" />
          <span>BookRack</span>
        </Link>
        <p>Organized libraries, easier reading.</p>
        <div>
          <Link to="/login">Sign in</Link>
          <Link to="/register">Create account</Link>
        </div>
      </div>
    </footer>
  </main>
);
export default Home;
