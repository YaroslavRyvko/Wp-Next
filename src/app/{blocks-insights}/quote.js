import styles from "./quote.module.scss";

function ArticleQuote({ fields }) {
  return (
    <blockquote className={`${styles.articleQuote} text-l`}>
      {fields.text}
    </blockquote>
  );
}

export default ArticleQuote;
