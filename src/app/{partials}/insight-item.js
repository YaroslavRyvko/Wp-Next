import Link from "next/link";
import styles from "./insight-item.module.scss";

const InsightItem = ({ insight, imageUrl, categoryNames }) => {
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
