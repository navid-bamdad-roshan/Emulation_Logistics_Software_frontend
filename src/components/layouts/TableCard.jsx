import TableRow from "./TableCard/TableRow";



function TableCard(props){
    return (
        <div className="card">
            {/* <!-- Card header --> */}
            <div className="card-header border-0">
                <h3 className="mb-0">{props.cardTitle}</h3>
            </div>
            {/* <!-- Light table --> */}
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table text-center table-flush">
                    <thead className="thead-light">
                            <tr>
                                {props.tableHead.map(element=>(
                                    <th className="text-center" scope="col">{element}</th>
                                ))}

                                {/* for action button */}
                                <th className="text-center" scope="col"></th>
                            </tr>
                        </thead>

                        <tbody>



                            {props.tableRows.map(row=>(
                                <tr>
                                    {row.elements.map((element,index)=>(
                                        <td scope="row">
                                            {index == 0 &&
                                                <a href={row.href}>
                                                    <div className="align-items-center">
                                                        <span className="badge badge-dot text-sm">{element}</span>
                                                    </div>
                                                </a>
                                            }
                                            {index != 0 &&
                                                <div className="align-items-center">
                                                    <span className="badge badge-dot text-sm">{element}</span>
                                                </div>
                                            }
                                        </td>
                                    ))}
                                    <td className="text-right">
                                        <div className="dropdown">
                                            <a className="btn btn-sm btn-icon-only text-light"
                                                href="#"
                                                role="button"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false">
                                                <i className="fa fa-lg fa-ellipsis-v"></i>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                                <a className="dropdown-item" href={row.href}>Details</a>
                                                <a className="dropdown-item" href="#">Delete</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* <!-- Card footer --> */}
            <div className="card-footer py-4">
                <nav aria-label="...">
                    <ul className="pagination justify-content-end mb-0">
                        <li className="page-item disabled">
                            <a className="page-link" href="#" tabindex="-1">
                                <i className="fa fa-lg fa-angle-left"></i>
                                <span className="sr-only">Previous</span>
                            </a>
                        </li>
                        <li className="page-item active">
                            <a className="page-link" href="#">1</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">2 <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">3</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                <i className="fa fa-lg fa-angle-right"></i>
                                <span className="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default TableCard;