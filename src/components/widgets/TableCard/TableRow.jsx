// import React, {Component} from 'react';

// class TableRow extends Component{
//     state={
//         dropdownShow: false
//     };
//     render(){

//         var dropdownDivClassName = "dropdown-menu dropdown-menu-right dropdown-menu-arrow"
//         if (this.state.dropdownShow){
//             dropdownDivClassName = "dropdown-menu show dropdown-menu-right dropdown-menu-arrow"
//         }

//         return(
//             <tr>
//                 {this.props.rowData.elements.map((element,index)=>(
//                     <td scope="row">
//                         {index == 0 &&
//                             <a href={this.props.rowData.href}>
//                                 <div className="align-items-center">
//                                     <span className="badge badge-dot text-sm">{element}</span>
//                                 </div>
//                             </a>
//                         }
//                         {index != 0 &&
//                             <div className="align-items-center">
//                                 <span className="badge badge-dot text-sm">{element}</span>
//                             </div>
//                         }
//                     </td>
//                 ))}
//                 <td className="text-right">
//                     <div className="dropdown">
//                         <a className="btn btn-sm btn-icon-only text-light"
//                             onClick={() => this.setState({dropdownShow: !this.state.dropdownShow})
//                             }
//                             role="button"
//                             data-toggle="dropdown"
//                             aria-haspopup="true"
//                             aria-expanded="false">
//                             <i className="fa fa-lg fa-ellipsis-v"></i>
//                         </a>
//                         <div className={dropdownDivClassName}>
//                             <a className="dropdown-item" href={this.props.rowData.href}>Details</a>
//                             <a className="dropdown-item" href="#">Delete</a>
//                         </div>
//                     </div>
//                 </td>
//             </tr>
//         );
//     }
// }

// export default TableRow;