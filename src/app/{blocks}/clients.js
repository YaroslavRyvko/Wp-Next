import { Fragment } from "react";
import styles from "./clients.module.scss";

const ClientsBlock = ({ fields }) => {
  return (
    <>
      {fields && (
        <section className={styles.clients}>
          <div className="site-container">
            <div className={styles.clients__wrapper}>
              {fields.title && (
                <h2
                  className={`${styles.clients__title} title-3`}
                  dangerouslySetInnerHTML={{ __html: fields.title }}
                ></h2>
              )}

              {fields.logos && (
                <div className={styles.clients__list}>
                  {fields.logos.map((logo, index) => (
                    <Fragment key={index}>
                      {(index === 4 || index === 9 || index === 13) && (
                        <div className={styles.break}></div>
                      )}
                      <div className={styles.clients__item}>
                        <img src={logo.url} alt={logo.alt} />
                      </div>
                    </Fragment>
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

export default ClientsBlock;
