"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import InsightItem from "../{partials}/insight-item";
import styles from "./insights.module.scss";

const InsightsBlock = ({ fields }) => {
  const [categories, setCategories] = useState([]);
  const [insights, setInsights] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(
        "https://www.wp-react.bato-webdesign.net/wp-json/wp/v2/insights-category"
      );
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchInsights = async () => {
      let endpoint =
        "https://www.wp-react.bato-webdesign.net/wp-json/wp/v2/insights?per_page=4&status=publish";
      if (selectedCategoryId) {
        endpoint += `&insights-category=${selectedCategoryId}`;
      }

      const response = await axios.get(endpoint);
      setInsights(response.data);
    };

    fetchInsights();
  }, [selectedCategoryId]);

  return (
    <section className={styles.insights} id="insights-list">
      <div className="site-container-small">
        <div className={styles.insights__wrapper}>
          {fields.title && (
            <h2 className={`${styles.insights__title} title-2`}>
              {fields.title}
            </h2>
          )}
          {fields.subtitle && (
            <p className={`${styles.insights__subtitle} text-l`}>
              {fields.subtitle}
            </p>
          )}

          <div className={styles.insights__filter}>
            <form>
              <label className={styles.insights__filterItem}>
                <span
                  className={
                    !selectedCategoryId
                      ? `${styles.active} ${styles.itemFilter}`
                      : styles.itemFilter
                  }
                  onClick={() => setSelectedCategoryId(null)}
                >
                  All insights
                </span>
              </label>
              {categories.map((cat) => (
                <label key={cat.id} className={styles.insights__filterItem}>
                  <input
                    type="radio"
                    name="cat_ids"
                    value={cat.id}
                    checked={selectedCategoryId === cat.id}
                    onChange={() => setSelectedCategoryId(cat.id)}
                    className={styles.itemFilterInput}
                  />
                  <span className={styles.itemFilter}>{cat.name}</span>
                </label>
              ))}
            </form>
          </div>

          {insights.length > 0 && (
            <div className={styles.insights__list}>
              {insights.map((insight) => (
                <InsightItem key={insight.id} insight={insight} />
              ))}
            </div>
          )}

          <Link
            href="/insights-page"
            className={`${styles.insights__cta} white-cta`}
          >
            View all
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InsightsBlock;
