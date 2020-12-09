import React from 'react'

const Pagination = (props) => {

    const pagesCount = Math.ceil(props.length / props.itemsPerPage)
    const pages = []

    for (let i=1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <ul className="pagination pagination-sm">
                <li className={"page-item" + (props.currentPage === 1 ? "disabled" : null)}>
                    <button className="page-link" onClick={() => props.onPageChanged(props.currentPage - 1)}>Previous</button>
                </li>

                {pages.map(page => (
                    <li key={page} className={"page-item" + props.currentPage === page ? "active" : null}>
                        <button className="page-link" onClick={() => props.onPageChanged(page)}>{page}</button>
                    </li>
                ))}

                <li className={"page-item" + (props.currentPage === pagesCount ? "disabled" : null)}>
                    <button className="page-link" onClick={() => props.onPageChanged(props.currentPage + 1)}>Next</button>
                </li>
            </ul>
        </div>
    )
}

export default Pagination