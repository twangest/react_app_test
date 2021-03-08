import React from 'react';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {setQueryToLocation} from "../../../redux/utils";

const PaginationItem = ({value, title, onClick, active, disabled, location}) => {
  return disabled
    ?
    <li className="page-item disabled">
      <button className="page-link">
        <span aria-hidden="true">{title}</span>
      </button>
    </li>
    :
    <NavLink
      to={setQueryToLocation(location, {page: value})}
      className="page-item text-decoration-none"
      activeClassName="active"
      isActive={(match, location) => location.search.includes(`page=${title}`)}
    >
      <button className="page-link"><span aria-hidden="true">{title}</span></button>
    </NavLink>
}
export default connect((state) => ({
  location: state.router.location
}))(PaginationItem)
