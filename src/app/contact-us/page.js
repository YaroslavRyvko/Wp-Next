"use client";

import { useState, useEffect } from "react";
import ContactForm from "../{inc}/contactform";
import Cf7FormWrapper from "../{inc}/cf7";
import styles from "./page.module.scss";
import axios from "axios";

const ContactPage = () => {
  const [fields, setFields] = useState({});

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await axios.get(
          `https://www.wp-react.bato-webdesign.net/wp-json/wp/v2/pages?slug=contact-us}`
        );
        if (response.data.length > 0) {
          setFields(response.data[0].acf || {});
        }
      } catch (error) {
        console.error("Failed to fetch page data:", error);
      }
    };

    fetchPageData();
  }, []);

  return (
    <>
      {fields && (
        <section className={styles.contactPage}>
          <div className="site-container">
            <div className={styles.contactPage__wrapper}>
              {fields.title && (
                <h1 className={styles.contactPage__title}>{fields.title}</h1>
              )}

              {fields.items && (
                <div className={styles.contactPage__list}>
                  {fields.items.map((item, index) => (
                    <div className={styles.contactPage__item} key={index}>
                      {item.title && (
                        <h2 className={styles.contactPage__itemTitle}>
                          {item.title}
                        </h2>
                      )}

                      {item.address && (
                        <address
                          className={`${styles.contactPage__itemAddress} text-s`}
                        >
                          {item.address}
                        </address>
                      )}

                      {item.tel && (
                        <a
                          href={`tel:${item.tel.replace(" ", "")}`}
                          className={`${styles.contactPage__itemTel} text-s`}
                        >
                          Tel.{item.tel}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {fields.contact && (
        <section className={styles.contactPage__form}>
          <div className="site-container">
            <div className={styles.contactPage__formWrapper}>
              {fields.contact.image && (
                <div className={styles.contactPage__formImage}>
                  <img
                    src={fields.contact.image.url}
                    alt={fields.contact.image.alt}
                  />
                </div>
              )}

              {fields.contact.form && (
                <div className={styles.contactPage__formForm}>
                  {fields.contact.title && (
                    <h2 className={`${styles.contactPage__formTitle} title-2`}>
                      {fields.contact.title}
                    </h2>
                  )}

                  {fields.contact.text && (
                    <p className={`${styles.contactPage__formText} text-l`}>
                      {fields.contact.text}
                    </p>
                  )}
                  <Cf7FormWrapper url="https://www.wp-react.bato-webdesign.net/wp-json/contact-form-7/v1/contact-forms/294/feedback/">
                    <ContactForm />
                  </Cf7FormWrapper>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ContactPage;
