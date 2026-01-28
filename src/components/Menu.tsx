import { Link, NavLink } from "react-router-dom";
import "./Menu.css";

export default function Menu() {
  return (
    <nav className="menu">
      {/* LEFT: Logo + badge */}
      <div className="menu-left">
        <Link to="/" className="menu-title">
          Sports Team Manager
        </Link>
        <span className="menu-badge">Live</span>
      </div>

      {/* CENTER: Tabs */}
      <div className="menu-center">
        <ul className="menu-tabs">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                "menu-tab" + (isActive ? " menu-tab--active" : "")
              }
            >
              Teams
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/players"
              className={({ isActive }) =>
                "menu-tab" + (isActive ? " menu-tab--active" : "")
              }
            >
              Players
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/matches"
              className={({ isActive }) =>
                "menu-tab" + (isActive ? " menu-tab--active" : "")
              }
            >
              Matches
            </NavLink>
          </li>
        </ul>
      </div>

      {/* RIGHT: Search + notif + CTA + avatar */}
      <div className="menu-right">
        <div className="menu-search">
          <input placeholder="Search..." />
        </div>

        <button
          type="button"
          className="menu-icon-btn menu-icon-btn--notif"
          aria-label="Notifications"
        />

        <Link to="/" className="menu-btn">
          New Team
        </Link>

        <div className="menu-avatar" />
      </div>
    </nav>
  );
}
