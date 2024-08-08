import React from "react";
import styles from "./event-item.module.scss";

const EventItem = ({ event }) => {
  const imageUrl = event._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
  const categoryNames =
    event._embedded?.["wp:term"]?.[0]?.map((term) => term.name) || [];

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
