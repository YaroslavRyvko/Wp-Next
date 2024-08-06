"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./cards.module.scss";

const CardsBlock = ({ fields }) => {
  const controllerRef = useRef(null);

  useEffect(() => {
    const ScrollMagic = require("scrollmagic");
    const { TweenMax, TimelineMax, Linear } = require("gsap");
    const { ScrollMagicPluginGsap } = require("scrollmagic-plugin-gsap");

    ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

    controllerRef.current = new ScrollMagic.Controller();

    const mediaMobile = window.innerWidth < 768;
    const cards = document.querySelectorAll(`.${styles.cards}`);

    cards.forEach((el) => {
      const timeline = new TimelineMax();
      const cardItems = el.querySelectorAll(`.${styles.cards__item}`);

      cardItems.forEach((item) => {
        timeline.fromTo(
          item,
          1,
          { y: 0 },
          { y: "-50%", ease: Linear.easeNone }
        );
      });

      new ScrollMagic.Scene({
        triggerElement: el,
        duration: mediaMobile ? 100 : 200,
        triggerHook: 0.5,
      })
        .setTween(timeline)
        .addTo(controllerRef.current);
    });

    return () => {
      if (controllerRef.current) {
        controllerRef.current.destroy(true);
        controllerRef.current = null;
      }
    };
  }, []);

  return (
    <section className={styles.cards}>
      <div className="site-container">
        <div className={styles.cards__wrapper}>
          {fields.title && (
            <h2 className={`${styles.cards__title} title-2`}>{fields.title}</h2>
          )}

          {fields.cta && (
            <Link
              href={fields.cta.url}
              className={`${styles.cards__cta} black-cta-l`}
            >
              {fields.cta.title}
            </Link>
          )}

          <div className={styles.cards__list}>
            {fields.cards.map((item, index) => (
              <div
                key={index}
                className={`${styles.cards__item} ${
                  styles[`cards__item-${index}`]
                }`}
              >
                {item.icon && (
                  <div className={styles.cards__itemImage}>
                    <img
                      src={item.icon.url}
                      alt={item.icon.alt || "Card icon"}
                    />
                  </div>
                )}
                {item.text && (
                  <h3 className={`${styles.cards__itemText} title-3`}>
                    {item.text}
                  </h3>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardsBlock;
