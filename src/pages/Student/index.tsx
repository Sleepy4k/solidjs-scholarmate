import { Auth } from '@contexts';
import { AuthLayout } from '@layouts';
import { AuthService } from '@services';
import { useNavigate } from '@solidjs/router';
import { IUserData, IStudentData } from '@types';
import { Component, createSignal, useContext, lazy, createEffect } from 'solid-js';

const Admin = lazy(() => import('./Admin'));

const Students: Component = () => {
  const navigate = useNavigate();
  const context = useContext<Auth.IAuthContext>(Auth.Context);
  const [user, setUser] = createSignal<IUserData>(null);
  const [loading, setLoading] = createSignal<boolean>(false);
  const [student, setStudent] = createSignal<IStudentData>(null);
  const [students, setStudents] = createSignal<IStudentData[]>([]);
 
  createEffect(() => {
    setUser(context.user());
    setLoading(context.loading());
    setStudent(context.student());
  });

  const handleRefresh = async (loading: boolean = false) => {
    loading && context.updateData('loading', true);

    await AuthService.get({
      url: 'student',
      name: 'Student',
      token: context.token(),
      success: (res: any) => {
        const value = res.data;

        setStudents(value.data);
      }
    });

    loading && context.updateData('loading', false);
  };

  const onFinish = async () => {
    context.updateData('loading', true);

    if (user() && user()?.role === 'user') {
      if (student()) {
        navigate(`/student/${student().id}/edit`);
      } else {
        navigate('/student/add');
      }
    } else if (user() && user()?.role === 'admin') {
      await handleRefresh();
    }

    context.updateData('loading', false);
  };

  return (
    <AuthLayout onFinish={onFinish}>
      {user()?.role === 'admin' && <Admin loading={loading()} students={students()} token={context.token()} handleRefresh={handleRefresh} />}
    </AuthLayout>
  );
};

export default Students;