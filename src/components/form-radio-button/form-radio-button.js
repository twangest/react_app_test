import React from 'react';

const FormRadioButton = ({
                           id = '',
                           value='',
                           disabled = false,
                           hidden = false,
                           checked,
                           labelText = '',
                           className = 'form-check form-switch mt-1',
                           onChange
                         }) => {

  if (hidden) return null;
  return disabled
    ? (
      <div className={className + ' disabled'}>
        <input className="form-check-input d-none"
               type="checkbox"
               id={id}
               readOnly
               value={value}
               checked={checked}
        />
        {labelText ? <label htmlFor={id} className="form-check-label">{labelText}</label> : ""}
      </div>
    )
    : (
      <div className={className}>
        <input className="form-check-input"
               type="checkbox"
               id={id}
               value={value}
               checked={checked}
               onChange={onChange}
               readOnly
        />
        <label htmlFor={id} className="form-check-label">{labelText}</label>
      </div>
    )
}

export default FormRadioButton
