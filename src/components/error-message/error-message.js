import React from 'react';

const ErrorMessage = ({error, className = 'alert-danger d-flex flex-wrap flex-row p-1'}) => {
  const msg = typeof error === 'object'
    ? Object.entries(error).map(([key, value]) => {
      return <div key={key} className='p-1'>
        {/*<span className="fw-bold ">{key}</span>*/}
        <span className="ms-1">{value}</span>
      </div>
    })
    : error;
  return (
    <div className={className}>{msg}</div>
  )
}

export default ErrorMessage
