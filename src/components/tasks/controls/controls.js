import React, {useMemo} from 'react'
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {setQueryToLocation} from '../../../redux/utils/index'
import FormRadioButton from "../../form-radio-button";
import history from "../../../history";

const sortFields = ['id', 'username', 'email', 'status']

const Controls = ({location}) => {
  const {sort_field = 'id', sort_direction = 'asc'} = location.query
  const sortDirectionChecked = useMemo(() => sort_direction === 'desc', [sort_direction])

  const handleChangeSortDirection = (e) => {
    history.push(setQueryToLocation(location, {sort_direction: e.target.checked ? 'desc' : 'asc'}))
  }

  return (
    <nav className="d-flex justify-content-between w-100 mt-3 flex-wrap">
      <div className="d-flex flex-row align-items-center flex-wrap">
        <div className="mx-2 p-1">
          {
            sortFields.map(name => {
              return (
                <Link to={setQueryToLocation(location, {sort_field: name})}
                      key={name}
                      className='d-inline'>

                  <input type="radio"
                         name="sort_field"
                         className="btn-check"
                         id={`sort_field${name}`}
                         checked={sort_field === name}
                         readOnly
                  />
                  <label className="btn btn-sm btn-outline-primary py-1"
                         htmlFor={`sort_field${name}`}>{name}</label>
                </Link>
              )
            })
          }
        </div>
        <div className="d-flex flex-row flex-wrap align-items-center justify-content-between px-1">
          <div className="text-muted me-1 pe-1">asc</div>
          <div className="form-check form-switch p-0 ">
            <FormRadioButton
              checked={sortDirectionChecked}
              onChange={handleChangeSortDirection}
            />
          </div>
          <div className="text-muted ms-1">desc</div>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center flex-wrap">
        <Link to={{
          pathname: '/create',
          state: {from: location}
        }}>
          <button className="btn btn-sm btn-outline-success">Добавить задачу</button>
        </Link>
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => ({
  location: state.router.location
})

export default connect(mapStateToProps)(Controls)
