import React from 'react';
import {connect} from 'react-redux';
import {
  tasksPageSelector,
  pagesCountSelector,
  pagesSelector,
} from "../../../redux/selectors";
import PaginationItem from "./pagination-item";

const Pagination = ({pages = [], currentPage, pagesCount, location}) => {
  const FIRST_PAGE = 1;
  const LAST_PAGE = pagesCount;
  if (!pages.length || pages.length === FIRST_PAGE) return null;

  return (
    <nav className="d-flex justify-content-center">
      <ul className="pagination">
        <PaginationItem title="&laquo;"
                        value={FIRST_PAGE}
                        disabled={currentPage === FIRST_PAGE}
        />
        <PaginationItem title="&lsaquo;"
                        value={currentPage - 1}
                        disabled={currentPage === FIRST_PAGE}
        />
        {
          pages.map(pageNumber => (
            <PaginationItem key={pageNumber}
                            title={pageNumber}
                            value={pageNumber}
                            active={pageNumber === currentPage}
            />)
          )
        }
        <PaginationItem
                        title="&rsaquo;"
                        value={currentPage + 1}
                        disabled={currentPage === LAST_PAGE} />
        <PaginationItem
                        title="&raquo;"
                        value={LAST_PAGE}
                        disabled={currentPage === LAST_PAGE} />
      </ul>
    </nav>
  )
}
const mapStateToProps = (state) => ({
  pages: pagesSelector(state),
  pagesCount: pagesCountSelector(state),
  currentPage: tasksPageSelector(state),
  location: state.router.location
})
export default connect(mapStateToProps)(Pagination)
