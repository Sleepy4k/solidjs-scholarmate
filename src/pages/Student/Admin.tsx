import { Component } from 'solid-js';
import { GridData } from '@components';

interface IAdminProps {
  students: any;
  loading: boolean;
}

const Admin: Component<IAdminProps> = (props) => {
  const field = [
    { field: 'id', headerName: 'ID' },
    { field: 'first_name', headerName: 'First Name' },
    { field: 'last_name', headerName: 'Last Name' },
    { field: 'email' },
    { field: 'phone' },
    { field: 'date_of_birth', headerName: 'DOB' },
    { field: 'region' },
    { field: 'register_number', headerName: 'NIK' },
    { field: 'toefl_score', headerName: 'TOEFL' },
    { field: 'ielts_score', headerName: 'IELTS' }
  ];

  return (
    <div class='w-full mt-12'>
      {props.loading ? null : <GridData data={props.students()} field={field} />}
    </div>
  );
};

export default Admin;