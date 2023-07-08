import swal from 'sweetalert';
import { Auth } from '@contexts';
import { Println } from '@utils';
import { AuthLayout } from '@layouts';
import { GridData } from '@components';
import { AuthService } from '@services';
import { Button } from '@suid/material';
import { useNavigate } from '@solidjs/router';
import { IUserData, IStudentData } from '@types';
import { Component, createSignal, useContext, createEffect } from 'solid-js';

const Scholarship: Component = () => {
  let field = [];
  const navigate = useNavigate();
  const context = useContext<Auth.IAuthContext>(Auth.Context);
  const [user, setUser] = createSignal<IUserData>(null);
  const [application, setApplication] = createSignal([]);
  const [scholarships, setScholarships] = createSignal([]);
  const [loading, setLoading] = createSignal<boolean>(false);
  const [student, setStudent] = createSignal<IStudentData>(null);

  createEffect(() => {
    setUser(context.user());
    setStudent(context.student());
    setLoading(context.loading());
  });

  const handleDelete = (id: any) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this data!',
      icon: 'warning',
      buttons: ['Cancel', 'Delete'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        AuthService.delete({
          url: `scholarship/${id}`,
          name: 'Scholarship',
          token: context.token()
        });
      }
    });
  };

  const handleApply = async (data: any) => {
    if (student()) {
      await AuthService.post({
        url: 'application',
        name: 'Scholarship',
        token: context.token(),
        data: {
          status: 'pending',
          univ_id: data.univ_id,
          major: data.univ_major,
          student_id: student().id,
          scholarship_id: data.id,
        }
      });
    } else {
      Println('Scholarship', 'You must login as student first', 'error');
    }
  };

  const onFinish = async () => {
    context.updateData('loading', true);

    if (user().role != 'admin' && student()) {
      await AuthService.get({
        url: `application/${student().id}`,
        name: 'Scholarship',
        token: context.token(),
        success: (res: any) => {
          const value = res.data;

          setApplication(value.data);
        }
      });
    }

    await AuthService.get({
      url: 'scholarship',
      name: 'Scholarship',
      token: context.token(),
      success: (res: any) => {
        const value = res.data;

        setScholarships(value.data);
      }
    });

    if (user().role != 'admin') {
      field = [
        { field: 'name' },
        { field: 'univ_name', headerName: 'University' },
        { field: 'univ_major', headerName: 'Major' },
        { field: 'description' },
        { field: 'quantity' },
        { field: 'requirement' },
        { field: 'action', cellRenderer: (params: any) => (
          <>
            {application().filter((item: any) => item.univ_id === params.data.univ_id).length > 0 && application().filter((item: any) => item.major === params.data.univ_major).length > 0 ? (
              <Button variant="contained" color="warning" disabled>
                Applied
              </Button>
            ) : params.data.quantity > 0 ? (
              <Button variant="contained" color="success" onClick={() => handleApply(params.data)}>
                Apply
              </Button>
            ) : (
              <Button variant="contained" color="error" disabled>
                Full
              </Button>
            )}
          </>
        )}
      ];
    } else {
      field = [
        { field: 'id', headerName: 'ID' },
        { field: 'name' },
        { field: 'univ_name', headerName: 'University' },
        { field: 'univ_major', headerName: 'Major' },
        { field: 'description' },
        { field: 'quantity' },
        { field: 'requirement' },
        { field: 'action', cellRenderer: (params: any) => (
          <div class='space-x-3'>
            <Button variant='contained' color='success' onClick={() => navigate(`/scholarship/${params.data.id}/edit`)}>
              Edit
            </Button>
            <Button variant='contained' color='error' onClick={() => handleDelete(params.data.id)}>
              Delete
            </Button>
          </div>
        )},
      ];
    }

    context.updateData('loading', false);
  };

  return (
    <AuthLayout onFinish={onFinish}>
      <div class='w-full mt-12'>
        {loading() ? null : <GridData data={scholarships()} field={field} />}
      </div>
    </AuthLayout>
  );
};

export default Scholarship;