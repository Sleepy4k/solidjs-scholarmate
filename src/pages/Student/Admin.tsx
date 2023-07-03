import { Component } from 'solid-js';
import { Button } from '@suid/material';
import { useNavigate } from '@solidjs/router';
import { GridData, CustomButton } from '@components';

interface IAdminProps {
  students: any;
  loading: boolean;
}

const Admin: Component<IAdminProps> = (props) => {
  const navigate = useNavigate();
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
    { field: 'ielts_score', headerName: 'IELTS' },
    { field: 'action', cellRenderer: (params: any) => (
      <div class='space-x-3'>
        <Button variant='contained' color='success' onClick={() => navigate(`/student/${params.data.id}/edit`)}>
          Edit
        </Button>
      </div>
    )},
  ];

  return (
    <div class='w-full mt-12'>
      <CustomButton 
        title='Add'
        disabled={props.loading}
        onClick={() => navigate('/student/add')}
        class='inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-1/8 mb-2'
      />
      {props.loading ? null : <GridData data={props.students} field={field} />}
    </div>
  );
};

export default Admin;