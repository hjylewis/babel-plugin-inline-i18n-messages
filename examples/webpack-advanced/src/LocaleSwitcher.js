import React from "react";
import { getLocale } from "./i18n/getLocale";

const LocaleSwitcher = () => {
  const handleChange = (e) => {
    document.location.assign("/" + e.target.value + ".html");
  };

  return (
    <div>
      <label htmlFor="locale-select">Choose a locale:</label>
      <select id="locale-select" value={getLocale()} onChange={handleChange}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
      </select>
    </div>
  );
};

export default LocaleSwitcher;
