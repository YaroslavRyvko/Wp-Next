import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./event-item.module.scss";

const EventItem = ({ event }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [categoryNames, setCategoryNames] = useState([]);

  useEffect(() => {
    const fetchFeaturedImage = async () => {
      if (event._links["wp:featuredmedia"]) {
        try {
          const response = await axios.get(
            event._links["wp:featuredmedia"][0].href
          );
          setImageUrl(response.data.source_url);
        } catch (error) {
          console.error("Error fetching featured image:", error);
        }
      }
    };

    const fetchCategories = async () => {
      if (event._links["wp:term"]) {
        const categoriesLink = event._links["wp:term"].find(
          (link) => link.taxonomy === "events-category"
        );
        if (categoriesLink) {
          try {
            const response = await axios.get(categoriesLink.href);
            setCategoryNames(response.data.map((category) => category.name));
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
        }
      }
    };

    fetchFeaturedImage();
    fetchCategories();
  }, [event]);

  return (
    <div className={styles.eventItem}>
      <div className={styles.eventItemImage}>
        {imageUrl && <img src={imageUrl} alt={event.title.rendered} />}
      </div>

      {categoryNames.length > 0 && (
        <div className={styles.eventItemCategory}>
          #{categoryNames.join(" #").toLowerCase()}
        </div>
      )}

      <h3 className={`${styles.eventItemTitle} title-5`}>
        {event.title.rendered}
      </h3>
    </div>
  );
};

export default EventItem;
