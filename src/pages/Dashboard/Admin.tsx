import { Component } from 'solid-js';
import { PieChart } from '@components';

interface IAdminProps {
  loading: boolean;
  scholarships: any;
  universities: any;
}

const Admin: Component<IAdminProps> = (props) => {
  return (
    <div class='grid gap-2 grid-cols-12 pt-2'>
      <div class='col-span-12 w-full px-6 sm:col-span-12 xl:col-span-6 bg-white rounded-lg border shadow-md dark:bg-gray-200 dark:border-gray-700'>
        {props.loading ? null : <PieChart name='Scholarships Program' tag='my-app-data' category='name' value='quantity' data={props.scholarships} />}
      </div>
      <div class='col-span-12 w-full px-6 sm:col-span-12 xl:col-span-6 bg-white rounded-lg border shadow-md dark:bg-gray-200 dark:border-gray-700'>
        {props.loading ? null : <PieChart name='Universities Quota' tag='univ-data' category='alias' value='quantity' data={props.universities} />}
      </div>
    </div>
  );
};

export default Admin;