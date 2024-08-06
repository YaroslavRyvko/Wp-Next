"use client";

import { useState, useEffect } from "react";

import Link from "next/link";

import axios from "axios";

import styles from "./header.module.scss";

import Linkedin from "../{icons}/linkedin";

const Header = () => {
  const [logo, setLogo] = useState(null);
  const [headerLinks, setHeaderLinks] = useState({});
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://www.wp-react.bato-webdesign.net/wp-json/acf/v3/options/options"
      )
      .then((response) => {
        setLogo(response.data.acf.logo);
        setHeaderLinks(response.data.acf.header_links);
      })
      .catch((error) => {
        console.error("Error fetching header options:", error);
      });

    axios
      .get(
        "https://www.wp-react.bato-webdesign.net/wp-json/menus/v1/menus/main-menu"
      )
      .then((response) => {
        setMenu(response.data.items);
      });

    const handleScroll = () => {
      const header = document.querySelector(`.${styles.header}`);
      if (header) {
        const sticky = header.offsetTop;
        if (window.pageYOffset > sticky + header.offsetHeight) {
          setIsHeaderFixed(true);
        } else {
          setIsHeaderFixed(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
    document.body.classList.toggle(styles.overflow, !isMenuActive);
    document.documentElement.classList.toggle(styles.overflow, !isMenuActive);
  };

  return (
    <header
      className={`${styles.header} ${isHeaderFixed ? styles.fixed : ""} ${
        isMenuActive ? styles.active : ""
      }`}
    >
      <div className={styles.header__wrapper}>
        <div className={styles.burgerWrapper}>
          <div
            className={`${styles.burgerMenu} ${
              isMenuActive ? styles.active : ""
            }`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
          </div>
        </div>

        {logo && (
          <div className={styles.logoWrapper}>
            <Link href="/" className={styles.header__logo}>
              <img src={logo.url} alt="Logo" />
            </Link>
          </div>
        )}

        <div className={styles.header__links}>
          {headerLinks.login && (
            <Link href={headerLinks.login.url} className={styles.header__link}>
              {headerLinks.login.title}
            </Link>
          )}

          {headerLinks.contact_us && (
            <Link href={headerLinks.contact_us.url} className="black-cta-s">
              {headerLinks.contact_us.title}
            </Link>
          )}

          {headerLinks.linkedin && (
            <Link
              href={headerLinks.linkedin.url}
              className={styles.header__linkIcon}
            >
              <Linkedin />
            </Link>
          )}
        </div>
      </div>
      <nav
        className={`${styles.header__navigation} ${
          isMenuActive ? styles.active : ""
        }`}
      >
        <div className={styles.header__wrapper}>
          <ul className={styles.header__menu}>
            {menu.map((item, index) => (
              <li key={index} className={styles.menuItem}>
                <Link
                  onClick={() => {
                    toggleMenu();
                  }}
                  href={`/${item.slug || "/"}`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
