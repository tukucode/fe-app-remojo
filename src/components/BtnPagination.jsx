/* eslint-disable react/prop-types */
import Pagination from "react-bootstrap/Pagination";
import '../assets/css/btnPagination.css'

export default function BtnPagination(props) {
  const {
    dataProduct = [],
    currentPage = 1,
    totalPage = 3,
    onPage = () => { },
  } = props;

  let arrayItem = [...Array(totalPage)];

  if (!dataProduct.length) return;

  return (
    <div className="d-flex justify-content-center align-items-center btn--pagination">
      <Pagination>
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => onPage(currentPage - 1)}
        />
        {arrayItem.map((_, page) => (
          <Pagination.Item
            key={`item-page-${page + 1}`}
            active={page + 1 === currentPage}
            onClick={() => onPage(page + 1)}
          >
            {page + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          disabled={currentPage === totalPage}
          onClick={() => onPage(currentPage + 1)}
        />
      </Pagination>
    </div>
  );
}
