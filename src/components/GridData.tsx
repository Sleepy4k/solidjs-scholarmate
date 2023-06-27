import AgGridSolid from 'ag-grid-solid';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import { Component, createResource } from 'solid-js';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface IGridDataProps {
  data: any[];
  field: any[];
}

const GridData: Component<IGridDataProps> = (props) => {
  const [rowData] = createResource(() => props.data);
  const defaultColDef: ColDef = {
    minWidth: 150,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
  };

  return (
    <div class='ag-theme-alpine h-[750px]'>
      <AgGridSolid rowData={rowData()} columnDefs={props.field} defaultColDef={defaultColDef} animateRows={true} pagination={true} paginationPageSize={10} />
    </div>
  );
};

export default GridData;
