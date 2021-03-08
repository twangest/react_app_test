import React from 'react';
import ErrorMessage from "../error-message";

const InputText = ({
                     value = "",
                     label = "",
                     placeholder = "",
                     disabled,
                     hidden,
                     type = "text", errorText = "",
                     onChange,
                     onInput,
                     error,
                     testValue,
                     className = 'form-group',
                     children
                   }) => {
  if (hidden) return null;
  return (
    <>
      <input
        type={type}
        className={className}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onInput={onInput}
      />
      {
        error ? <ErrorMessage error={error}/> : ''
      }
    </>
  )
}


export default InputText
