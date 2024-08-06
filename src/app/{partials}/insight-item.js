import { useState, useEffect } from "react";

import axios from "axios";

import Link from "next/link";

import styles from "./insight-item.module.scss";

const InsightItem = ({ insight }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [categoryNames, setCategoryNames] = useState([]);

  useEffect(() => {
    if (insight._links["wp:featuredmedia"]) {
      axios
        .get(insight._links["wp:featuredmedia"][0].href)
        .then((response) => {
          setImageUrl(response.data.source_url);
        })
        .catch((error) =>
          console.error("Error fetching featured image:", error)
        );
    }

    if (insight._links["wp:term"]) {
      const categoriesLink = insight._links["wp:term"].find(
        (link) => link.taxonomy === "insights-category"
      );
      if (categoriesLink) {
        axios
          .get(categoriesLink.href)
          .then((response) => {
            setCategoryNames(response.data.map((category) => category.name));
          })
          .catch((error) => console.error("Error fetching categories:", error));
      }
    }
  }, [insight]);

  return (
    <div className={styles.insights__item}>
      <Link href={`/insights/${insight.slug}`}>
        <div className={styles.insights__itemImage}>
          {imageUrl && <img src={imageUrl} alt={insight.title.rendered} />}
        </div>

        {categoryNames.length > 0 && (
          <div className={styles.insights__itemCategory}>
            #{categoryNames.join(" #").toLowerCase()}
          </div>
        )}

        <h3 className={`${styles.insights__itemTitle} title-5`}>
          {insight.title.rendered}
        </h3>
      </Link>
    </div>
  );
};

export default InsightItem;
