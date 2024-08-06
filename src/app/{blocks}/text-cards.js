import styles from "./text-cards.module.scss"; 

const TextCardsBlock = ({ fields }) => {
  return (
    <>
      {fields && (
        <section className={styles.textCards}>
          <div className="site-container-small">
            <div className={styles.textCards__wrapper}>
              {fields.title && (
                <h2 className={`${styles.textCards__title} title-2`}>
                  {fields.title}
                </h2>
              )}

              {fields.text && (
                <div
                  dangerouslySetInnerHTML={{ __html: fields.text }}
                  className={`${styles.textCards__text} text-l`}
                />
              )}
            </div>
          </div>

          <div className="site-container">
            {fields.cards && (
              <div className={styles.textCards__list}>
                {fields.cards.map((item, index) => (
                  <div className={styles.textCards__item} key={index}>
                    {item.icon && (
                      <div className={styles.textCards__itemIcon}>
                        <img src={item.icon.url} alt={item.icon.alt} />
                      </div>
                    )}

                    {item.title && (
                      <h3 className={styles.textCards__itemTitle}>
                        {item.title}
                      </h3>
                    )}

                    {item.text && (
                      <p className={`${styles.textCards__itemText} text-s`}>
                        {item.text}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default TextCardsBlock;
