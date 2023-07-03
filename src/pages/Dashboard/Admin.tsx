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
      {props.loading || props.scholarships.length === 0 ? null : (
        <div class='col-span-12 w-full px-6 sm:col-span-12 xl:col-span-6 bg-white rounded-lg border shadow-md dark:bg-gray-200 dark:border-gray-700'>
          <PieChart name='Scholarships Quota' tag='scholarship-data' category='alias' value='quantity' data={props.scholarships} />
        </div>
      )}
      {props.loading || props.universities.length === 0 ? null : (
        <div class='col-span-12 w-full px-6 sm:col-span-12 xl:col-span-6 bg-white rounded-lg border shadow-md dark:bg-gray-200 dark:border-gray-700'>
          <PieChart name='Universities Quota' tag='univ-data' category='alias' value='quantity' data={props.universities} />
        </div>
      )}
    </div>
  );
};

export default Admin;