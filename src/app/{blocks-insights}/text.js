import styles from "./text.module.scss";

function ArticleText({ fields }) {
    return (
      <p className={`${styles.articleText} text-s`}>
        {fields.text}
      </p>
    );
  }
  
export default ArticleText;

