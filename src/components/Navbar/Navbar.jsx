import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";

const API_KEY = "dc3817e72717f4092e25408ea63709ec"; // TMDB key

const SearchOverlay = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // close on ESC
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  // fetch TMDB when query changes
  useEffect(() => {
    const fetchData = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            query
          )}`
        );
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchData, 500); // debounce
    return () => clearTimeout(delay);
  }, [query]);

  return createPortal(
    
    <div className="search-overlay" onClick={onClose}>
      
      <div className="search-box" onClick={(e) => e.stopPropagation()}>
      <h1 className="search-title">Discover exclusive movies and shows on <span className="search-title-netflix">Netflix </span> </h1>
        <input
          type="text"
          placeholder="Search movies, shows..."
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="search-actions">
          <button type="button" className="search-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* results grid */}
       
        <div className="search-results">
         
          {query.trim().length < 2 ? (
            <p className="search-hint">Type 2+ characters to search</p>
          ) : loading ? (
            <p className="search-hint">Searching…</p>
          ) : results.length === 0 ? (
            <p className="search-hint">No results found</p>
          ) : (
            <div className="search-grid">
              {results.slice(0, 15).map((m) => (
                <div
                  key={m.id}
                  className="search-grid-item"
                  onClick={() => {
                    console.log("clicked result", m.id, m.title);
                    onClose(); // you could navigate to a details page here
                  }}
                >
                  <img
                    src={
                      m.poster_path
                        ? `https://image.tmdb.org/t/p/w185${m.poster_path}`
                        : "https://via.placeholder.com/185x278?text=No+Image"
                    }
                    alt={m.title}
                  />
                  <div className="title">{m.title}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);


  // prevent body scroll when overlay open
  useEffect(() => {
    document.body.style.overflow = showSearch ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSearch]);

  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          {/* Burger button */}
          <div
            className={`burger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            &#9776;
          </div>

          <img src={logo} alt="logo" />

          {/* Nav links */}
          <ul className={menuOpen ? "nav-links show" : "nav-links"}>
            <li>Home</li>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>New and popular</li>
            <li>My list</li>
            <li>Browse by languages</li>
          </ul>
        </div>

        <div className="navbar-right">
          {/* Search icon wrapped in button */}
          <button
            type="button"
            className="icon-btn"
            onClick={() => setShowSearch(true)}
            aria-label="Open search"
          >
            <img src={search_icon} alt="search" className="icons" />
          </button>

          <button
            type="button"
            className="icon-btn"
            onClick={() => setShowNotifications(!showNotifications) }
            aria-label="Notifications"
          >
            <img src={bell_icon} alt="bell" className="icons" />
          </button>

          {showNotifications && (
            <div className="notifications-popup "> 
            You have no notifications</div>
          )}

          <div className="navbar-profile">
            <img src={profile_img} alt="profile" className="profile" />
            <img src={caret_icon} alt="caret" />
            <div className="dropdown">
              <p>Sign Out of Netflix</p>
            </div>
          </div>
        </div>
      </div>

      {/* portal-based overlay */}
      {showSearch && <SearchOverlay onClose={() => setShowSearch(false)} />}
    </>
  );
};

export default Navbar;