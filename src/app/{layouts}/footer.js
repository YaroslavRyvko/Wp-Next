"use client";

import { useState, useEffect } from "react";

import Link from "next/link";

import axios from "axios";

import Cf7FormWrapper from "../{inc}/cf7";
import NewsLetterForm from "../{inc}/newsletterform";

import LinkedinIcon from "../{icons}/linkedin";

import styles from "./Footer.module.scss";

const Footer = () => {
  const [logo, setLogo] = useState(null);
  const [headerLinks, setHeaderLinks] = useState({});
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [form, setForm] = useState(null);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://www.wp-react.bato-webdesign.net/wp-json/menus/v1/menus/main-menu"
      )
      .then((response) => {
        setMenu(response.data.items);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://www.wp-react.bato-webdesign.net/wp-json/acf/v3/options/options"
      )
      .then((response) => {
        const data = response.data.acf;
        setLogo(data.logo);
        setHeaderLinks(data.header_links);
        setTitle(data.title);
        setText(data.text);
        setForm(data.form);
      })
      .catch((error) => {
        console.error("Error fetching footer options:", error);
      });
  }, []);

  return (
    <footer className={styles.footer}>
      <div className="site-container">
        <div className={styles.footer__wrapper}>
          <div className={styles.footer__left}>
            {logo && (
              <div className={styles.footer__logo}>
                <img src={logo.url} alt="Footer Logo" />
              </div>
            )}
            <div className={`${styles.footer__copyright} text-xxs`}>
              Copyright &copy; {new Date().getFullYear()} IMA ASIA All Rights
              Reserved
            </div>
            {headerLinks.linkedin && (
              <Link
                href={headerLinks.linkedin.url}
                className={styles.footer__linkIcon}
              >
                <LinkedinIcon />
              </Link>
            )}
          </div>
          <div className={styles.footer__middle}>
            <p className={`${styles.footerTitle} text-xs-medium`}>Sitemap</p>
            <nav className={styles.footer__navigation}>
              <ul className={styles.footer__menu}>
                {menu.map((item, index) => (
                  <li key={index} className={styles.menuItem}>
                    <Link href={`/${item.slug || "/"}`}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className={styles.footer__right}>
            {title && (
              <p className={`${styles.footerTitle} text-xs-medium`}>{title}</p>
            )}
            {text && <p className={styles.footerText}>{text}</p>}
            <div className={styles.footerForm}>
              <Cf7FormWrapper url="https://www.wp-react.bato-webdesign.net/wp-json/contact-form-7/v1/contact-forms/100/feedback/">
                <NewsLetterForm />
              </Cf7FormWrapper>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
