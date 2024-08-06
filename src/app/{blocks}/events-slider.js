"use client";

import { useRef, useEffect } from "react";
import Swiper, { Navigation } from "swiper";
import ArrowRightIcon from "../{icons}/arrow-right-icon";
import Link from "next/link";
import styles from "./events-slider.module.scss";

const events_slider = ({ fields }) => {
  const swiperRef = useRef(null);
  const nextRef = useRef(null);
  const prevRef = useRef(null);

  useEffect(() => {
    if (fields && fields.slides) {
      const swiper = new Swiper(swiperRef.current, {
        modules: [Navigation],
        slidesPerView: "auto",
        spaceBetween: 10,
        allowTouchMove: false,
        speed: 1500,
        navigation: {
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        },
        breakpoints: {
          320: {
            slidesPerView: 1.1,
            spaceBetween: 12,
          },
          991: {
            slidesPerView: "auto",
            spaceBetween: 10,
          },
        },
      });

      return () => {
        if (swiper) swiper.destroy(true, true);
      };
    }
  }, [fields]);

  return (
    <section className={styles.eventsSlider}>
      <div className="site-container">
        <div className={styles.eventsSlider__wrapper}>
          {fields.title && (
            <h2 className={`${styles.eventsSlider__title} title-2`}>
              {fields.title}
            </h2>
          )}
          {fields.subtitle && (
            <div className={`${styles.eventsSlider__subtitle} text-l`}>
              {fields.subtitle}
            </div>
          )}
          {fields.cta && (
            <Link
              href={fields.cta.url}
              className={`${styles.eventsSlider__cta} white-cta`}
            >
              {fields.cta.title}
            </Link>
          )}

          {fields.slides && (
            <div className={styles.eventsSlider__list}>
              <div className="swiper" ref={swiperRef}>
                <div className="swiper-wrapper">
                  {fields.slides.map((item, index) => (
                    <div className="swiper-slide" key={index}>
                      <div className={styles.eventsSlider__slide}>
                        {item.image && (
                          <div className={styles.eventsSlider__slideImage}>
                            <img
                              src={item.image.url}
                              alt={item.image.alt || ""}
                            />
                          </div>
                        )}
                        <div className={styles.eventsSlider__slideInfo}>
                          {item.date && (
                            <div className={styles.eventsSlider__slideDate}>
                              {item.date}
                            </div>
                          )}
                          {item.title && (
                            <h3
                              className={`${styles.eventsSlider__slideTitle} title-3`}
                            >
                              {item.title}
                            </h3>
                          )}
                          {item.text && (
                            <div
                              className={`${styles.eventsSlider__slideText} text-m`}
                            >
                              {item.text}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.eventsSlider__nav}>
                <div className={styles.eventsSlider__prev} ref={prevRef}>
                  <ArrowRightIcon />
                </div>
                <div className={styles.eventsSlider__next} ref={nextRef}>
                  <ArrowRightIcon />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default events_slider;
