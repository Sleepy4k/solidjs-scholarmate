import swal from 'sweetalert';
import { Auth } from '@contexts';
import { AuthLayout } from '@layouts';
import { AuthService } from '@services';
import { Button } from '@suid/material';
import { useNavigate } from '@solidjs/router';
import { IUserData, IUniversityData } from '@types';
import { GridData, CustomButton } from '@components';
import { Component, createSignal, useContext, createEffect } from 'solid-js';

const University: Component = () => {
  let field = [];
  const navigate = useNavigate();
  const context = useContext<Auth.IAuthContext>(Auth.Context);
  const [token, setToken] = createSignal<string>('');
  const [user, setUser] = createSignal<IUserData>(null);
  const [loading, setLoading] = createSignal<boolean>(false);
  const [universities, setUniversities] = createSignal<IUniversityData[]>([]);

  createEffect(() => {
    setUser(context.user());
    setToken(context.token());
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
          token: context.token(),
          finally: () => handleRefresh(true)
        });
      }
    });
  };

  const handleRefresh = async (loading: boolean = false) => {
    loading && context.updateData('loading', true);

    await AuthService.get({
      url: 'university',
      name: 'University',
      token: context.token(),
      success: (res: any) => {
        const value = res.data;

        setUniversities(value.data);
      }
    });

    loading && context.updateData('loading', false);
  };

  const onFinish = async () => {
    context.updateData('loading', true);

    await handleRefresh();

    if (user()?.role != 'admin') {
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

  const handleExpotExcel = () => {
    AuthService.post({
      url: 'university/excel',
      name: 'University',
      token: token(),
      server: 'export',
      data: {
        fields: field.map((item: any) => item.field === 'action' ? '' : item.field)
      }
    });
  };

  const handleExpotCsv = () => {
    AuthService.post({
      url: 'university/csv',
      name: 'University',
      token: token(),
      server: 'export',
      data: {
        fields: field.map((item: any) => item.field === 'action' ? '' : item.field)
      }
    });
  };

  return (
    <AuthLayout onFinish={onFinish}>
      <div class='w-full mt-12'>
        {user()?.role == 'admin' && <CustomButton 
          title='Add'
          disabled={loading()}
          onClick={() => navigate('/university/add')}
          class='inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-1/8 mb-2'
        />}
        <CustomButton 
          title='Export Excel'
          disabled={loading()}
          onClick={handleExpotExcel}
          class='ms-2 inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-1/8 mb-2'
        />
        <CustomButton 
          title='Export Csv'
          disabled={loading()}
          onClick={handleExpotCsv}
          class='ms-2 inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-1/8 mb-2'
        />
        <CustomButton 
          title='Refresh'
          disabled={loading()}
          onClick={() => handleRefresh(true)}
          class='ms-2 inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-1/8 mb-2'
        />
        {loading() ? null : <GridData data={universities()} field={field} />}
      </div>
    </AuthLayout>
  );
};

export default University;