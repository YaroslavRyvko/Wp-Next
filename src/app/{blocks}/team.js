import Link from "next/link";
import styles from "./team.module.scss";

const TeamBlock = ({ fields }) => {
  return (
    <>
      {fields && (
        <section className={styles.team}>
          <div className="site-container">
            <div className={styles.team__wrapper}>
              {fields.title && (
                <h2 className={`${styles.team__title} title-2`}>
                  {fields.title}
                </h2>
              )}

              {fields.text && (
                <div className={`${styles.team__text} text-l`}>
                  {fields.text}
                </div>
              )}

              {fields.image_desktop && (
                <div className={`${styles.team__image} ${styles.desktop}`}>
                  <img
                    src={fields.image_desktop.url}
                    alt={fields.image_desktop.alt}
                  />
                </div>
              )}

              {fields.image_mobile && (
                <div className={`${styles.team__image} ${styles.mobile}`}>
                  <img
                    src={fields.image_mobile.url}
                    alt={fields.image_mobile.alt}
                  />
                </div>
              )}

              {fields.items && (
                <div className={styles.team__list}>
                  {fields.items.map((item, index) => (
                    <div className={styles.team__item} key={index}>
                      {item.name && (
                        <h3 className={styles.team__itemName}>{item.name}</h3>
                      )}

                      {item.post && (
                        <p className={`${styles.team__itemPost} text-s`}>
                          {item.post}
                        </p>
                      )}

                      {item.link && (
                        <Link
                          href={item.link.url}
                          className={styles.team__itemLink}
                        >
                          {item.link.title}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default TeamBlock;
