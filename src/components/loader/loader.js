import React from 'react';

function Loader({className = 'alert alert-warning p-2 mt-3 text-center'}) {
  return (
    <div className={className}>загружаем данные...</div>
  );
}

export default Loader;
