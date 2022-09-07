export const PagingList = ({ paginate }) => {
  return (
    <ul className='paging-list'>
      <li
        onClick={() => paginate.prev()}
        className='paging-list__item paging-prev'
      >
        <button className='paging-list__link'>
          <i className='icon-arrow'></i>
        </button>
      </li>

      {[...Array(paginate.maxPage)].map((x, i) => (
        <li
          key={i}
          onClick={() => paginate.jump(i + 1)}
          className={`paging-list__item ${
            paginate.currentPage === i + 1 && 'active'
          }`}
        >
          <button className='paging-list__link'>{i + 1}</button>
        </li>
      ))}

      <li
        onClick={() => paginate.next()}
        className='paging-list__item paging-next'
      >
        <button className='paging-list__link'>
          <i className='icon-arrow'></i>
        </button>
      </li>
    </ul>
  );
};
