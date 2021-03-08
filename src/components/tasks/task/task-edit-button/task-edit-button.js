import React from 'react';
import {connect} from "react-redux"
import { Link } from 'react-router-dom'
import {ReactComponent as EditIcon} from 'bootstrap-icons/icons/pencil-square.svg';
import {tokenSelector} from "../../../../redux/selectors";

const TaskEditButton = ({hasToken, taskId, location}) => {
  if (!hasToken) return null;
  return (
    <Link to={{
      pathname: "/edit/"+taskId,
      state: {from: location}
    }}>
      <button className="btn btn-xs btn-outline-secondary">
        <EditIcon/>
      </button>
    </Link>
  )
}

const mapStateToProps = (state) => ({
  hasToken: !!tokenSelector(state),
  location: state.router.location
})
export default connect(mapStateToProps)(TaskEditButton)
