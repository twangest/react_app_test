import React from 'react';

const FormSubmitButton = ({
                        title, onClick,
                        disabled = false,
                        className = "btn btn-ls btn-success"
                      }) => {
  return disabled
    ? <button className={className+ ' disabled'} >{title}</button>
    : <button className={className} onClick={onClick}>{title}</button>
}
export default FormSubmitButton
