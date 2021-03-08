import React from 'react';
import {Link, useLocation} from "react-router-dom";

const FormCancelButton = ({
                            title = "Отмена",
                            disabled = false,
                            className = "btn btn-ls btn-danger"
                          }) => {
  const location = useLocation();
  const {from} = location.state || {from: {pathname: '/'}}
  return disabled
    ? <button className={className + ' disabled'}>{title}</button>
    : <Link to={from}>
      <button className={className}>{title}</button>
    </Link>
}
export default FormCancelButton
