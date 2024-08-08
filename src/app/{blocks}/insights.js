"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Link from "next/link";
import InsightItem from "../{partials}/insight-item";
import styles from "./insights.module.scss";

const InsightsBlock = ({ fields }) => {
  const [categories, setCategories] = useState([]);
  const [insights, setInsights] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://www.wp-react.bato-webdesign.net/wp-json/wp/v2/insights-category"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  const fetchInsights = useCallback(async () => {
    try {
      let endpoint =
        "https://www.wp-react.bato-webdesign.net/wp-json/wp/v2/insights?per_page=4&status=publish&_embed";
      if (selectedCategoryId) {
        endpoint += `&insights-category=${selectedCategoryId}`;
      }
      const response = await axios.get(endpoint);
      setInsights(response.data);
    } catch (error) {
      console.error("Error fetching insights:", error);
    }
  }, [selectedCategoryId]);

  useEffect(() => {
    fetchCategories();
    fetchInsights();
  }, [fetchCategories, fetchInsights]);

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
                <InsightItem
                  key={insight.id}
                  insight={insight}
                  imageUrl={insight._embedded["wp:featuredmedia"][0].source_url}
                  categoryNames={insight._embedded["wp:term"][0].map(
                    (term) => term.name
                  )}
                />
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
