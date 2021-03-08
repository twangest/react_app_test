import React from 'react';
import ErrorMessage from "../error-message";

const TextArea = ({
                     value="",
                     label="",
                     placeholder="",
                     disabled,
                     onChange,
                     onInput,
                     error,
                     testValue,
                     className='form-group',
                     children
                   }) => {
  return (
    <>
      <textarea
        className={className}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        onInput={onInput}
        value={value || ''}
      >
        {value || ''}
      </textarea>
      {
        error ? <ErrorMessage error={error} /> : ''
      }
    </>
  )
}


export default TextArea
