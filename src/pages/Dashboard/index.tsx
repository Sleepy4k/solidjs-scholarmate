import { Auth } from '@contexts';
import { Box } from '@components';
import { AuthLayout } from '@layouts';
import { AuthService } from '@services';
import { IUserData, IStudentData } from '@types';
import { Component, createSignal, useContext, lazy, createEffect } from 'solid-js';

const User = lazy(() => import('./User'));
const Admin = lazy(() => import('./Admin'));

const Dashboard: Component = () => {
  const context = useContext<Auth.IAuthContext>(Auth.Context);
  const [forum, setForum] = createSignal([]);
  const [user, setUser] = createSignal<IUserData>(null);
  const [universities, setUniversities] = createSignal([]);
  const [scholarships, setScholarships] = createSignal([]);
  const [loading, setLoading] = createSignal<boolean>(false);
  const [myapplications, setMyApplications] = createSignal([]);
  const [student, setStudent] = createSignal<IStudentData>(null);
  const [applications, setApplications] = createSignal({
    total: 0,
    pending: 0,
    accepted: 0,
    declined: 0,
  });

  createEffect(() => {
    setUser(context.user());
    setStudent(context.student());
    setLoading(context.loading());
  });

  const onFinish = async () => {
    context.updateData('loading', true);

    if (student() && user() && user().role === 'user') {
      await AuthService.get({
        url: `application/${student().id}`,
        token: context.token(),
        success: (res: any) => {
          const value = res.data;
          const total = value.data.length;
          const pending = value.data.filter((item: any) => item.status === 'pending').length;
          const accepted = value.data.filter((item: any) => item.status === 'accepted').length;
          const declined = value.data.filter((item: any) => item.status === 'declined').length;

          setMyApplications(value.data);
          setApplications({
            total,
            pending,
            accepted,
            declined,
          });
        }
      });

      await AuthService.get({
        url: `forum/${student().id}`,
        name: 'Dashboard',
        token: context.token(),
        success: (res: any) => {
          const value = res.data;

          setForum(value.data);
        },
        finally: () => {
          context.updateData('loading', false);
        }
      });
    } else if (user() && user().role === 'admin') {
      await AuthService.get({
        url: 'application',
        name: 'Dashboard',
        token: context.token(),
        success: (res: any) => {
          const value = res.data;
          const total = value.data.length;
          const pending = value.data.filter((item: any) => item.status === 'pending').length;
          const accepted = value.data.filter((item: any) => item.status === 'accepted').length;
          const declined = value.data.filter((item: any) => item.status === 'declined').length;

          setApplications({
            total,
            pending,
            accepted,
            declined,
          });
        }
      });

      await AuthService.get({
        url: 'scholarship',
        name: 'Dashboard',
        token: context.token(),
        success: (res: any) => {
          const value = res.data;

          setScholarships(value.data);
        }
      });

      await AuthService.get({
        url: 'university',
        name: 'Dashboard',
        token: context.token(),
        success: (res: any) => {
          const value = res.data;

          setUniversities(value.data);
        },
        finally: () => {
          context.updateData('loading', false);
        }
      });
    }
  };

  return (
    <AuthLayout onFinish={onFinish}>
      <div class='w-full'>
        <div class='grid gap-2 grid-cols-12'>
          <Box title='Applications' value={applications().total.toString()} />
          <Box title='Application Accepted' value={applications().accepted.toString()} />
          <Box title='Application Declined' value={applications().declined.toString()} />
          <Box title='Application Pending' value={applications().pending.toString()} />
        </div>
        {user().role === 'user' ? <User forum={forum()} myapplications={myapplications()} /> : <Admin loading={loading()} scholarships={scholarships()} universities={universities()} />}
      </div>        
    </AuthLayout>
  );
};

export default Dashboard;