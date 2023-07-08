import swal from 'sweetalert';
import { Component } from 'solid-js';
import { Button } from '@suid/material';
import { AuthService } from '@services';
import { useNavigate } from '@solidjs/router';
import { GridData, CustomButton } from '@components';

interface IAdminProps {
  token: string;
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
        <Button variant='contained' color='error' onClick={() => handleDelete(params.data.id)}>
          Delete
        </Button>
      </div>
    )},
  ];

  const handleDelete = (id: any) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this data!',
      icon: 'warning',
      buttons: ['Cancel', 'Delete'],
      dangerMode: true,
    // eslint-disable-next-line solid/reactivity
    }).then((willDelete) => {
      if (willDelete) {
        AuthService.delete({
          url: `student/${id}`,
          name: 'Student',
          token: props.token
        });
      }
    });
  };

  const handleExpotExcel = () => {
    AuthService.post({
      url: 'student/excel',
      name: 'Student',
      token: props.token,
      server: 'export',
      data: {
        fields: field.map((item: any) => item.field === 'action' ? '' : item.field)
      }
    });
  };

  const handleExpotCsv = () => {
    AuthService.post({
      url: 'student/csv',
      name: 'Student',
      token: props.token,
      server: 'export',
      data: {
        fields: field.map((item: any) => item.field === 'action' ? '' : item.field)
      }
    });
  };

  return (
    <div class='w-full mt-12'>
      <CustomButton 
        title='Add'
        disabled={props.loading}
        onClick={() => navigate('/student/add')}
        class='inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-1/8 mb-2'
      />
      <CustomButton 
        title='Export Excel'
        disabled={props.loading}
        onClick={handleExpotExcel}
        class='ms-2 inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-1/8 mb-2'
      />
      <CustomButton 
        title='Export Csv'
        disabled={props.loading}
        onClick={handleExpotCsv}
        class='ms-2 inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-1/8 mb-2'
      />
      {props.loading ? null : <GridData data={props.students} field={field} />}
    </div>
  );
};

export default Admin;