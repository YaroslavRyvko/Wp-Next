import Link from "next/link";
import styles from "./contact.module.scss";

const ContactBlock = ({ fields }) => {
  return (
    <section className={styles.contact}>
      {fields.image && (
        <div className={styles.contact__image}>
          <img src={fields.image.url} alt={fields.image.alt} />
        </div>
      )}

      <div className="site-container">
        <div className={styles.contact__wrapper}>
          <div className={styles.contact__block}>
            {fields.title && (
              <h2 className={`${styles.contact__title} title-2`}>
                {fields.title}
              </h2>
            )}

            {fields.text && (
              <p className={`${styles.contact__text} text-l`}>{fields.text}</p>
            )}

            {fields.cta && (
              <Link
                href={fields.cta.url}
                className={`${styles.contact__cta} black-cta-l`}
              >
                {fields.cta.title}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBlock;
