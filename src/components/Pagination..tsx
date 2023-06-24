interface PaginationProps {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    paginate: (pageNumber: number) => void;
  }
  
  const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    itemsPerPage,
    totalItems,
    paginate,
  }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className='flex space-x-2'>
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`${
                number === currentPage ? 'font-semibold' : ''
              } cursor-pointer`}
              onClick={() => paginate(number)}
            >
              {number}
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  export default Pagination;