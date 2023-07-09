import { Auth } from '@contexts';
import { IUserData } from '@types';
import { AuthLayout } from '@layouts';
import { AuthService } from '@services';
import { GridData, CustomButton } from '@components';
import { Component, createSignal, useContext, createEffect } from 'solid-js';

const User: Component = () => {
  const context = useContext<Auth.IAuthContext>(Auth.Context);
  const [users, setUsers] = createSignal<IUserData[]>([]);
  const [loading, setLoading] = createSignal<boolean>(false);
  const field = [
    { field: 'id', headerName: 'ID' },
    { field: 'email' },
    { field: 'role' },
  ];

  createEffect(() => {
    setLoading(context.loading());
  });

  const handleRefresh = async (loading: boolean = false) => {
    loading && context.updateData('loading', true);

    await AuthService.get({
      url: 'user',
      name: 'User',
      token: context.token(),
      success: (res: any) => {
        const value = res.data;

        setUsers(value.data);
      }
    });

    loading && context.updateData('loading', false);
  };

  const onFinish = async () => {
    context.updateData('loading', true);

    await handleRefresh();

    context.updateData('loading', false);
  };

  const handleExpotExcel = () => {
    AuthService.post({
      url: 'user/excel',
      name: 'User',
      token: context.token(),
      server: 'export',
      data: {
        fields: field.map((item: any) => item.field === 'action' ? '' : item.field)
      }
    });
  };

  const handleExpotCsv = () => {
    AuthService.post({
      url: 'user/csv',
      name: 'User',
      token: context.token(),
      server: 'export',
      data: {
        fields: field.map((item: any) => item.field === 'action' ? '' : item.field)
      }
    });
  };

  return (
    <AuthLayout onFinish={onFinish} canAccess='admin'>
      <div class='w-full mt-12'>
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
        {loading() ? null : <GridData data={users()} field={field} />}
      </div>
    </AuthLayout>
  );
};

export default User;