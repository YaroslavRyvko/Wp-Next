import styles from "./hero2.module.scss";

const Hero2Block = ({ fields }) => {
  return (
    <>
      {fields && (
        <section className={styles.hero2}>
          <div className="site-container">
            <div className={styles.hero2__wrapper}>
              {fields.title && (
                <h1 className={styles.hero2__title}>{fields.title}</h1>
              )}

              {fields.image && (
                <div className={styles.hero2__image}>
                  <img src={fields.image.url} alt={fields.image.alt} />
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Hero2Block;
