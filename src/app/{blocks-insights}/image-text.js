import styles from "./image-text.module.scss";

const ArticleImageText = ({ fields }) => {
  return (
    <div className={styles.articleImageText}>
      {fields.image && (
        <div className={styles.articleImageText__image}>
          <img
            src={fields.image.url}
            alt={fields.image.alt || "Article image"}
          />
        </div>
      )}
      {fields.text && (
        <div className={`${styles.articleImageText__text} title-2`}>
          {fields.text}
        </div>
      )}
    </div>
  );
};

export default ArticleImageText;
