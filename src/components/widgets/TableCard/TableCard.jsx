
// import TableRow from './TableRow';

// function TableCard(props){
//     return (
//         <div className="card">
//             {/* <!-- Card header --> */}
//             <div className="card-header border-0">
//                 <h3 className="mb-0">{props.cardTitle}</h3>
//             </div>
//             {/* <!-- Light table --> */}
//             <div className="card-body">
//                 <div className="table-responsive">
//                     <table className="table text-center table-flush">
//                     <thead className="thead-light">
//                             <tr>
//                                 {props.tableHead.map(element=>(
//                                     <th className="text-center" scope="col">{element}</th>
//                                 ))}

//                                 {/* for action button */}
//                                 <th className="text-center" scope="col"></th>
//                             </tr>
//                         </thead>

//                         <tbody>



//                             {props.tableRows.map(row=>(
//                                 <TableRow rowData={row}/>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//             {/* <!-- Card footer --> */}
//             <div className="card-footer py-4">
//                 <nav aria-label="...">
//                     <ul className="pagination justify-content-end mb-0">
//                         <li className="page-item disabled">
//                             <a className="page-link" href="#" tabIndex="-1">
//                                 <i className="fa fa-lg fa-angle-left"></i>
//                                 <span className="sr-only">Previous</span>
//                             </a>
//                         </li>
//                         <li className="page-item active">
//                             <a className="page-link" href="#">1</a>
//                         </li>
//                         <li className="page-item">
//                             <a className="page-link" href="#">2 <span className="sr-only">(current)</span></a>
//                         </li>
//                         <li className="page-item">
//                             <a className="page-link" href="#">3</a>
//                         </li>
//                         <li className="page-item">
//                             <a className="page-link" href="#">
//                                 <i className="fa fa-lg fa-angle-right"></i>
//                                 <span className="sr-only">Next</span>
//                             </a>
//                         </li>
//                     </ul>
//                 </nav>
//             </div>
//         </div>
//     );
// }

// export default TableCard;