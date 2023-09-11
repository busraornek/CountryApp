import React from 'react';

const CountryInput = ({ label, value, onChange, name }) => {
    return (
      <div>
        <label>{label}</label>
        <input type="text" name={name} value={value} onChange={onChange} />
      </div>
    );
  }
  


export default CountryInput;
