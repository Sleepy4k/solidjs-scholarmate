import { Println } from '@utils';
import { Auth } from '@contexts';
import { AuthLayout } from '@layouts';
import { GridData } from '@components';
import { AuthService } from '@services';
import { Component, createSignal, useContext } from 'solid-js';

const User: Component = () => {
  const context = useContext(Auth.Context);
  const loading = context.loading();
  const [users, setUsers] = createSignal([]);
  const field = [
    { field: 'id', headerName: 'ID' },
    { field: 'email' },
    { field: 'role' },
  ];

  const onFinish = async () => {
    context.updateData('loading', true);

    await AuthService.get({
      url: 'user',
      token: context.token(),
      success: (res: any) => {
        const value = res.data;

        setUsers(value.data);
      },
      error: (err: any) => {
        if (err.response) {
          Println('Students', err.response.data.message, 'error');
        } else {
          Println('Students', err.message, 'error');
        }
      },
      finally: () => {
        context.updateData('loading', false);
      }
    });
  };

  return (
    <AuthLayout onFinish={onFinish}>
      <div class='w-full mt-12'>
        {loading ? null : <GridData data={users()} field={field} />}
      </div>
    </AuthLayout>
  );
};

export default User;