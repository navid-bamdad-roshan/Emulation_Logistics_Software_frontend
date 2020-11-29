

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


import BootstrapTable from 'react-bootstrap-table-next';

const products = [{id:'123', name:'record 1', price:2}];
const columns = [{
    dataField: 'id',
    text: 'Product ID'
    }, {
    dataField: 'name',
    text: 'Product Name'
    }, {
    dataField: 'price',
    text: 'Product Price'
}];

export default () =>
  <BootstrapTable keyField='id' data={ products } columns={ columns } />
