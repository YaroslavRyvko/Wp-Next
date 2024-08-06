import { useState } from "react";
import styles from "./contactform.module.scss";

const ContactForm = ({ isLoading, isSent, hasError, handler }) => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    company: "",
    city: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleFieldChange = (field, e) => {
    setFormState({
      ...formState,
      [field]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handler(e, formState);
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.contactForm}>
      {["first-name", "last-name", "company", "city", "email", "phone"].map(
        (field) => (
          <div className={styles.contactForm__row} key={field}>
            <div className={styles.contactForm__field}>
              <span className="wpcf7-form-control-wrap" data-name={field}>
                <input
                  size="40"
                  className={`wpcf7-form-control wpcf7-text ${
                    field === "email" ? "wpcf7-email" : ""
                  } ${
                    field === "phone" ? "wpcf7-tel" : ""
                  } wpcf7-validates-as-required`}
                  aria-required="true"
                  aria-invalid="false"
                  value={formState[field]}
                  onChange={(e) => handleFieldChange(field, e)}
                  type={
                    field === "email"
                      ? "email"
                      : field === "phone"
                      ? "tel"
                      : "text"
                  }
                  name={field}
                />
              </span>
              <label className={styles.contactForm__field_label}>
                {field.charAt(0).toUpperCase() +
                  field.slice(1).replace("-", " ")}
                *
              </label>
            </div>
          </div>
        )
      )}
      <div className={styles.contactForm__row}>
        <div className={`${styles.contactForm__field} ${styles.textarea}`}>
          <span className="wpcf7-form-control-wrap" data-name="message">
            <textarea
              cols="40"
              rows="10"
              className="wpcf7-form-control wpcf7-textarea"
              aria-invalid="false"
              name="message"
              onChange={(e) => handleFieldChange("message", e)}
            />
          </span>
          <label className={styles.contactForm__field_label}>Message</label>
        </div>
      </div>
      <div className={styles.contactForm__row}>
        <div className={styles.contactForm__field}>
          <input
            className="wpcf7-form-control has-spinner wpcf7-submit black-cta-l"
            type="submit"
            value="Submit"
          />
        </div>
      </div>
      <div className="form-response">
        {isSent ? "Form submitted successfully" : hasError}
      </div>
    </form>
  );
};

export default ContactForm;
