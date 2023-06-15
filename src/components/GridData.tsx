import AgGridSolid from "ag-grid-solid";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import { Component, createResource } from "solid-js";
import "ag-grid-community/styles/ag-theme-alpine.css";

const GridData: Component<{ data: any[], field: any[] }> = (props) => {
  const [rowData] = createResource(() => props.data);
  const columnDefs = props.field;
  const defaultColDef: ColDef = {
    minWidth: 150,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
  };

  return (
    <div class="ag-theme-alpine-dark" style={{ height: "750px" }}>
      <AgGridSolid rowData={rowData()} columnDefs={columnDefs} defaultColDef={defaultColDef} animateRows={true} pagination={true} paginationPageSize={10} />
    </div>
  );
};

export default GridData;
