import React from 'react';
import TaskEditButton from "./task-edit-button";
import statusesGuide from './status-guide'
import { connect } from "react-redux"
import {tokenSelector} from "../../../redux/selectors";

const Task = ({id, username, email, text, status }) => {
  const statusText = statusesGuide[status].title || ''
  const {adminEdited, panelStyle, statusStyle} = statusesGuide[status];
  return (
    <div className={`card mb-2 ${panelStyle}`}>
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <div className="d-flex flex-column  align-items-start flex-wrap">
            <div className="card-title fs-5 fw-bold me-2 text-nowrap">{username}</div>
            <div className="card-subtitle fw-lighter fs-6 text-wrap">{email}</div>
          </div>
          <div className={`d-flex flex-wrap align-items-center justify-content-between ${statusStyle}`}>
            <div className="d-flex flex-wrap flex-column align-items-end">
              {statusText}
              {adminEdited ? <div className="text-danger">Отредактировано администратором</div> : '' }
            </div>
            <div className="ms-2">
              <TaskEditButton taskId={ id }/>
            </div>
          </div>
        </div>
        <hr className="my-3"/>
        <div>{text}</div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  hasToken: !!tokenSelector(state)
})

export default connect(mapStateToProps)(Task)
