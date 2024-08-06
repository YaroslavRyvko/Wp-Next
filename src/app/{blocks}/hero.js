import Link from "next/link";
import styles from "./hero.module.scss";

const HeroBlock = ({ fields }) => {
  return (
    <>
      {fields && (
        <section className={styles.hero}>
          <div className="site-container">
            <div className={styles.hero__wrapper}>
              {fields.title && (
                <h1 className={styles.hero__title}>{fields.title}</h1>
              )}

              {fields.subtitle && (
                <p className={`${styles.hero__subtitle} text-l`}>
                  {fields.subtitle}
                </p>
              )}

              {fields.cta && (
                <Link
                  href={fields.cta.url}
                  className={`black-cta-l ${styles.hero__cta}`}
                >
                  {fields.cta.title}
                </Link>
              )}

              <div className={styles.hero__list}>
                {fields.items &&
                  fields.items.map((item, index) => (
                    <div className={styles.hero__item} key={index}>
                      {item.title && (
                        <p className={styles.hero__itemTitle}>{item.title}</p>
                      )}

                      {item.text && (
                        <p className={`${styles.hero__itemText} text-xxs`}>
                          {item.text}
                        </p>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {fields.images &&
            fields.images.map((image, key) => (
              <div className={styles[`hero__image${key}`]} key={key}>
                <img src={image.image.url} alt={image.image.alt} />
              </div>
            ))}
        </section>
      )}
    </>
  );
};

export default HeroBlock;
