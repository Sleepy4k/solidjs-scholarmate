import swal from 'sweetalert';
import { Auth } from '@contexts';
import { AuthLayout } from '@layouts';
import { GridData } from '@components';
import { AuthService } from '@services';
import { Button } from '@suid/material';
import { useNavigate } from '@solidjs/router';
import { IUserData, IUniversityData } from '@types';
import { Component, createSignal, useContext, createEffect } from 'solid-js';

const University: Component = () => {
  let field = [];
  const navigate = useNavigate();
  const context = useContext<Auth.IAuthContext>(Auth.Context);
  const [user, setUser] = createSignal<IUserData>(null);
  const [loading, setLoading] = createSignal<boolean>(false);
  const [universities, setUniversities] = createSignal<IUniversityData[]>([]);

  createEffect(() => {
    setUser(context.user());
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
          url: `university/${id}`,
          name: 'University',
          token: context.token()
        });
      }
    });
  };

  const onFinish = async () => {
    context.updateData('loading', true);

    await AuthService.get({
      url: 'university',
      name: 'University',
      token: context.token(),
      success: (res: any) => {
        const value = res.data;

        setUniversities(value.data);
      }
    });

    if (user().role != 'admin') {
      field = [
        { field: 'name' },
        { field: 'major' },
        { field: 'description' },
        { field: 'quantity' },
      ];
    } else {
      field = [
        { field: 'id', headerName: 'ID' },
        { field: 'name' },
        { field: 'alias' },
        { field: 'major' },
        { field: 'description' },
        { field: 'quantity' },
        { field: 'action', cellRenderer: (params: any) => (
          <div class='space-x-3'>
            <Button variant='contained' color='success' onClick={() => navigate(`/university/${params.data.id}/edit`)}>
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
        {loading() ? null : <GridData data={universities()} field={field} />}
      </div>
    </AuthLayout>
  );
};

export default University;