import React from 'react';
import './Pagination.scss';

function Pagination({transition, currentPage, pageAll}){
  return (
    <div className="pagination">
      <div className="pagination__place">
        { pageAll >= 7 &&  <div className="pagination__page-select">
          <div className="pagination__page-backward-btn" data-prev={true} onClick={transition}></div>
          {((currentPage + 2 <= pageAll || currentPage - 2 <= pageAll) &&  (currentPage >= 3)) &&
          <>
            <div className="pagination__page-area pagination__page-first" data-page={1} onClick={transition}>1</div>
            {(pageAll > 7 && currentPage > 3) && <div className="pagination__page-area pagination__page-space">..</div>}
          </>}

          {currentPage >= pageAll && <div className="pagination__page-area pagination__page-first" data-page={currentPage - 4} onClick={transition}>{currentPage - 4}</div>}
          {currentPage > (pageAll - 3) && <div className="pagination__page-area pagination__page-first" data-page={currentPage - 3} onClick={transition}>{currentPage - 3}</div>}
          {currentPage > (pageAll - 2) && <div className="pagination__page-area pagination__page-first" data-page={currentPage - 2} onClick={transition}>{currentPage - 2}</div>}
          {currentPage > 1 && <div className="pagination__page-area pagination__page-first" data-page={currentPage - 1} onClick={transition}>{currentPage - 1}</div>}
          <div className="pagination__page-area pagination__page-area--active" data-page={currentPage} >{currentPage}</div>
          {currentPage <= pageAll -1 && <div className="pagination__page-area pagination__page-first" data-page={currentPage + 1} onClick={transition}>{currentPage + 1}</div>}
          {currentPage <= 3  && <div className="pagination__page-area pagination__page-space" data-page={currentPage + 2} onClick={transition}>{currentPage + 2}</div>}
          {currentPage <= 2  && <div className="pagination__page-area pagination__page-space" data-page={currentPage + 3} onClick={transition}>{currentPage + 3}</div>}
          {currentPage === 1  && <div className="pagination__page-area pagination__page-space" data-page={currentPage + 4} onClick={transition}>{currentPage + 4}</div>}
          {currentPage + 2 <= pageAll &&
          <>
            {(pageAll > 7 && (pageAll - 2) > currentPage ) && <div className="pagination__page-area market__page-space">..</div>}
            <div className="pagination__page-area pagination__page-last" data-page={pageAll} onClick={transition}>{pageAll}</div>
          </>
          }
          <div className="pagination__page-forward-btn" data-next={true} onClick={transition}></div>
        </div>}

        { pageAll < 7 &&
        <div className="pagination__page-select">
          <div className="pagination__page-backward-btn" data-prev={true} onClick={transition}></div>
          {Array(pageAll).fill("").map((el,i) => <div key={i} className={`pagination__page-area ${ currentPage === i + 1  ? "pagination__page--active" : ""}`} data-page={i + 1} onClick={transition}>{i+1}</div>)}
          <div className="pagination__page-forward-btn" data-next={true} onClick={transition}></div>
        </div>}
      </div>
    </div>
  )
}

export default Pagination;