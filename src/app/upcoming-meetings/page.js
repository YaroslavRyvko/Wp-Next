"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import EventItem from "../{partials}/event-item";
import styles from "./page.module.scss";

const UpcomingMeetingsPage = () => {
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [fields, setFields] = useState({});

  const fetchEvents = async (page) => {
    let endpoint = `https://wp-react.bato-webdesign.net/wp-json/wp/v2/events?per_page=9&page=${page}&status=publish&_embed`;
    if (selectedCategoryId) {
      endpoint += `&events-category=${selectedCategoryId}`;
    }

    try {
      const response = await axios.get(endpoint);
      if (page === 1) {
        setEvents(response.data);
      } else {
        setEvents((prevEvents) => [...prevEvents, ...response.data]);
      }
      setHasMore(response.headers["x-wp-totalpages"] > page);
      setCurrentPage(page);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoriesResponse, pageResponse] = await Promise.all([
          axios.get(
            "https://www.wp-react.bato-webdesign.net/wp-json/wp/v2/events-category"
          ),
          axios.get(
            "https://wp-react.bato-webdesign.net/wp-json/wp/v2/pages?slug=upcoming-meetings"
          ),
        ]);

        setCategories(categoriesResponse.data);
        setFields(pageResponse.data[0].acf);
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      }
    };

    fetchInitialData();
    fetchEvents(1);
  }, []);

  useEffect(() => {
    setEvents([]);
    setCurrentPage(1);
    setHasMore(true);
    fetchEvents(1);
  }, [selectedCategoryId]);

  const handleLoadMore = () => {
    fetchEvents(currentPage + 1);
  };

  return (
    <section className={styles.events} id="events-list">
      <div className="site-container">
        <div className={styles.events__wrapper}>
          {fields.title && (
            <h1 className={styles.events__title}>{fields.title}</h1>
          )}
          {fields.text && (
            <div className={`${styles.events__text} text-l`}>{fields.text}</div>
          )}

          <div className={styles.events__filter}>
            <form>
              <label className={styles.events__filterItem}>
                <span
                  className={
                    !selectedCategoryId
                      ? `${styles.itemFilter} ${styles.active}`
                      : styles.itemFilter
                  }
                  onClick={() => setSelectedCategoryId("")}
                >
                  All meetings
                </span>
              </label>
              {categories.map((cat) => (
                <label key={cat.id} className={styles.events__filterItem}>
                  <input
                    type="radio"
                    name="cat_slug"
                    value={cat.slug}
                    checked={selectedCategoryId === cat.id}
                    onChange={() => setSelectedCategoryId(cat.id)}
                    className={styles.itemFilterInput}
                  />
                  <span className={styles.itemFilter}>{cat.name}</span>
                </label>
              ))}
            </form>
          </div>

          {events.length > 0 && (
            <div className={styles.events__list}>
              {events.map((event) => (
                <EventItem key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
        {events.length > 0 && hasMore && (
          <div className="alm-btn-wrap">
            <button onClick={handleLoadMore} className={styles.almLoadMoreBtn}>
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingMeetingsPage;
