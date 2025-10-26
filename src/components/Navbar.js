import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faSun, faMoon);

const Navbar = (props) => {
  const [country, setCountry] = React.useState("in");
  let location = useLocation();

  React.useEffect(() => {}, [location]);

  return (
    <div>
      <nav
        className={`navbar fixed-top navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            HeadineHub
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse bg-${props.mode} text-${
              props.mode === "dark" ? "light" : "dark"
            }`}
            id="navbarSupportedContent"
          >
            <div>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/business" ? "active" : ""
                    }`}
                    to={"/business-" + country}
                  >
                    Business
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/entertainment" ? "active" : ""
                    }`}
                    to={"/entertainment-" + country}
                  >
                    Entertainment
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/health" ? "active" : ""
                    }`}
                    to={"/health-" + country}
                  >
                    Health
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/science" ? "active" : ""
                    }`}
                    to={"/science-" + country}
                  >
                    Science
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/sports" ? "active" : ""
                    }`}
                    to={"/sports-" + country}
                  >
                    Sports
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/technology" ? "active" : ""
                    }`}
                    to={"/technology-" + country}
                  >
                    Technology
                  </Link>
                </li>
              </ul>
            </div>

            <div className="d-flex align-items-center ms-auto justify-content-start">
              <div className="dropdown d-flex align-items-center ms-auto justify-content-start">
                <button
                  className={`btn dropdown-toggle  text-${
                    props.mode === "dark" ? "light" : "dark"
                  } p-0 bg-none`}
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ border: "none" }}
                >
                  {country === "in" ? "India" : "United States"}
                </button>
                <ul
                  className={`dropdown-menu bg-${props.mode} text-${
                    props.mode === "dark" ? "light" : "dark"
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  <li
                    onClick={() => setCountry("in")}
                    className={`dropdown-item text-${
                      props.mode === "dark" ? "light" : "dark"
                    }`}
                    value="in"
                  >
                    India
                  </li>
                  <li
                    onClick={() => setCountry("us")}
                    className={`dropdown-item text-${
                      props.mode === "dark" ? "light" : "dark"
                    }`}
                    value="us"
                  >
                    United States
                  </li>
                </ul>
              </div>
              <div className="ms-4">
                <FontAwesomeIcon
                  style={{ cursor: "pointer" }}
                  icon={`${props.icon}`}
                  onClick={props.toggleMode}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
