import { Auth } from '@contexts';
import { IUserData } from '@types';
import { AuthLayout } from '@layouts';
import { GridData } from '@components';
import { AuthService } from '@services';
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

  const onFinish = async () => {
    context.updateData('loading', true);

    await AuthService.get({
      url: 'user',
      name: 'User',
      token: context.token(),
      success: (res: any) => {
        const value = res.data;

        setUsers(value.data);
      },
      finally: () => {
        context.updateData('loading', false);
      }
    });
  };

  return (
    <AuthLayout onFinish={onFinish} canAccess='admin'>
      <div class='w-full mt-12'>
        {loading() ? null : <GridData data={users()} field={field} />}
      </div>
    </AuthLayout>
  );
};

export default User;