import styles from "./links.module.scss";

import PresentationIcon from "../{icons}/presentation-icon";
import PdfIcon from "../{icons}/pdf-icon";

function ArticleLinks({ fields }) {
  return (
    <div className={styles.articleLinks}>
      {fields.links &&
        fields.links.map((item, index) =>
          item.link.subtype !== "pdf" ? (
            <a
              key={index}
              href={item.link.url}
              download
              target="_blank"
              className={`white-cta ${styles.link}`}
            >
              <span>
                <PresentationIcon />
              </span>
              <span>{item.link.title}</span>
            </a>
          ) : (
            <a
              key={index}
              href={item.link.url}
              download
              target="_blank"
              className={`black-cta-l ${styles.link}`}
            >
              <span>
                <PdfIcon />
              </span>
              <span>{item.link.title}</span>
            </a>
          )
        )}
    </div>
  );
}

export default ArticleLinks;
