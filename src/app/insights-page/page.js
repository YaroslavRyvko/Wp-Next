"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import InsightItem from "../{partials}/insight-item";
import styles from "./page.module.scss";

const InsightsPage = () => {
  const [categories, setCategories] = useState([]);
  const [insights, setInsights] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [featuredImageUrl, setFeaturedImageUrl] = useState(null);
  const [recentPostTitle, setRecentPostTitle] = useState("");
  const [featuredImageDate, setFeaturedImageDate] = useState("");
  const [recentPostCategoryID, setRecentPostCategoryID] = useState([]);

  const formatDate = (dateString) => {
    const options = { month: "long", year: "numeric" };
    const date = new Date(dateString);
    return `#${date.toLocaleDateString("en-US", options).replace(/\s+/g, "")}`;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(
        "https://www.wp-react.bato-webdesign.net/wp-json/wp/v2/insights-category"
      );
      setCategories(response.data);
    };
    fetchCategories();

    const fetchRecentPost = async () => {
      const response = await axios.get(
        "https://www.wp-react.bato-webdesign.net/wp-json/wp/v2/insights?per_page=1&order=desc"
      );
      const post = response.data[0];
      setRecentPostTitle(post.title.rendered);
      setFeaturedImageDate(formatDate(post.date));
      setRecentPostCategoryID(post["insights-category"][0]);

      if (post.featured_media) {
        const mediaResponse = await axios.get(
          `https://wp-react.bato-webdesign.net/wp-json/wp/v2/media/${post.featured_media}`
        );
        setFeaturedImageUrl(mediaResponse.data.source_url);
      }
    };
    fetchRecentPost();
  }, []);

  const getCategoryNameById = (categoryId) => {
    const category = categories.find((category) => category.id === categoryId);
    return category ? category.name : null;
  };

  useEffect(() => {
    const fetchInsights = async () => {
      let endpoint = `https://wp-react.bato-webdesign.net/wp-json/wp/v2/insights?per_page=10&status=publish&page=${currentPage}`;
      if (selectedCategoryId) {
        endpoint += `&insights-category=${selectedCategoryId}`;
      }
      const response = await axios.get(endpoint);
      setInsights(response.data);
      const total = response.headers["x-wp-totalpages"];
      setTotalPages(parseInt(total, 10));
    };

    fetchInsights();
  }, [selectedCategoryId, currentPage]);

  const handleCategoryChange = (catId) => {
    setSelectedCategoryId(catId);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginationLinks = () => {
    let links = [];
    const prevPage = currentPage > 1 ? currentPage - 1 : 1;
    const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

    links.push(
      <a
        href="#"
        className={`page-numbers ${currentPage === 1 ? "disabled" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          handlePageChange(prevPage);
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 6.99986H13"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M7 1L13 7L7 13"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </a>
    );

    for (let i = 1; i <= totalPages; i++) {
      if (i === currentPage) {
        links.push(
          <span aria-current="page" className="page-numbers current">
            {i}
          </span>
        );
      } else {
        links.push(
          <a
            className="page-numbers"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
          >
            {i}
          </a>
        );
      }
    }

    links.push(
      <a
        href="#"
        className={`next page-numbers ${
          currentPage === totalPages ? "disabled" : ""
        }`}
        onClick={(e) => {
          e.preventDefault();
          handlePageChange(nextPage);
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 6.99986H13"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M7 1L13 7L7 13"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </a>
    );

    return links;
  };

  return (
    <>
      <section className={styles.insightsPageHero}>
        <div className={styles.insightsPageHero__image}>
          {featuredImageUrl && <img src={featuredImageUrl} alt="Featured" />}
        </div>
        <div className={`site-container ${styles.insightsPageHero__container}`}>
          <div className={styles.insightsPageHero__wrapper}>
            <a href="#" className={styles.insightsPageHero__recent}>
              <div className={styles.insightsPageHero__recentCats}>
                <span>{featuredImageDate}</span>

                <span key={recentPostCategoryID}>
                  #{getCategoryNameById(recentPostCategoryID)}
                </span>
              </div>
              {recentPostTitle && (
                <h1
                  className={`${styles.insightsPageHero__recentTitle} title-2`}
                >
                  {" "}
                  {recentPostTitle}
                </h1>
              )}
            </a>
          </div>
        </div>
      </section>
      <section className={styles.insightsPage} id="insights-list">
        <div className="site-container">
          <div className={styles.insightsPage__wrapper}>
            <div className={styles.insightsPage__filter}>
              <form>
                <label className={styles.insightsPage__filterItem}>
                  <span
                    className={
                      !selectedCategoryId
                        ? `${styles.itemFilter} ${styles.active}`
                        : styles.itemFilter
                    }
                    onClick={() => handleCategoryChange(null)}
                  >
                    All articles
                  </span>
                </label>
                {categories.map((cat) => (
                  <label key={cat.id} className={styles.insightsFilterItem}>
                    <input
                      type="radio"
                      name="cat_ids"
                      value={cat.id}
                      checked={selectedCategoryId === cat.id}
                      onChange={() => handleCategoryChange(cat.id)}
                      className={styles.itemFilterInput}
                    />
                    <span className={styles.itemFilter}>{cat.name}</span>
                  </label>
                ))}
              </form>
            </div>
            {insights.length > 0 && (
              <div className={styles.insightsPage__list}>
                {insights.map((insight) => (
                  <InsightItem key={insight.id} insight={insight} />
                ))}
              </div>
            )}
          </div>
          <div className="pagination">
            <div className="pagination__list">{paginationLinks()}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InsightsPage;
