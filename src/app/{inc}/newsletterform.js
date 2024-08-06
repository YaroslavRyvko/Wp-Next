import { useState } from "react";
import FormIcon from "../{icons}/form-icon";

const NewsLetterForm = ({ isSent, hasError, handler }) => {
  const [formState, setFormState] = useState({});

  const handleFieldChange = (field, e) => {
    setFormState({
      ...formState,
      [field]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    handler(e, formState);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        onChange={(e) => handleFieldChange("your-email", e)}
        size="40"
        placeholder="Enter your email"
        type="email"
      />
      <button type="submit" className="submit-btn">
        <FormIcon />
      </button>
      <div className="form-response">
        {isSent ? "Form submitted Sucessfully" : hasError}
      </div>
    </form>
  );
};

export default NewsLetterForm;
