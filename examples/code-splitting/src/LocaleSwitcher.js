import React from 'react';

export default () => {

  const handleChange = (e) => {
    document.location.assign('/' + e.target.value);
  }

  return (
    <div>
      <label htmlFor="locale-select">Choose a locale:</label>
      <select id="locale-select" value={process.env.LOCALE} onChange={handleChange}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
      </select>
    </div>
  );
}