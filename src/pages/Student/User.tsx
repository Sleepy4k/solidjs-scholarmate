import { Component } from 'solid-js';
import { TextInput, Button } from '@components';

interface IUserProps {
  group: any;
  student: any;
  loading: boolean;
  handleValidation: () => void;
}

const User: Component<IUserProps> = (props) => {
  return (
    <section>
      <div class='py-12 h-full'>
        <div class='flex justify-center items-center flex-wrap h-full g-6 text-gray-500'>
          <div class='md:w-8/12 lg:w-5/12 lg:ml-20'>
            <div class='flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5'>
              <p class='text-center font-semibold mx-4 mb-0'>Personal Data</p>
            </div>
            <div class='mb-3'>
              <TextInput
                name='first_name'
                type='text'
                label='First Name'
                disabled={props.loading}
                placeholder='First Name'
                control={props.group.controls.first_name}
                class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              />
            </div>
            <div class='mb-3'>
              <TextInput
                name='last_name'
                type='text'
                label='Last Name'
                disabled={props.loading}
                placeholder='Last Name'
                control={props.group.controls.last_name}
                class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              />
            </div>
            <div class='mb-3'>
              <TextInput
                name='phone'
                type='text'
                label='Handphone'
                disabled={props.loading}
                placeholder='Handphone'
                control={props.group.controls.phone}
                class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              />
            </div>
            <div class='mb-3'>
              <TextInput
                name='register_number'
                type='number'
                label='Register Number'
                disabled={props.loading}
                placeholder='Register Number'
                control={props.group.controls.register_number}
                class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              />
            </div>
            <div class='mb-3'>
              <TextInput
                name='date_of_birth'
                type='date'
                label='Date of Birth'
                disabled={props.loading}
                control={props.group.controls.date_of_birth}
                class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              />
            </div>
            <div class='mb-3'>
              <TextInput
                name='region'
                type='text'
                label='Region'
                disabled={props.loading}
                placeholder='Region'
                control={props.group.controls.region}
                class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              />
            </div>
            <div class='flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5'>
              <p class='text-center font-semibold mx-4 mb-0'>Academy Score</p>
            </div>
            <div class='mb-3'>
              <TextInput
                name='toefl_score'
                type='number'
                label='TOEFL'
                disabled={props.loading}
                control={props.group.controls.toefl_score}
                class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              />
            </div>
            <div class='mb-3'>
              <TextInput
                name='ielts_score'
                type='number'
                label='IELTS'
                disabled={props.loading}
                control={props.group.controls.ielts_score}
                class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              />
            </div>
            <Button 
              title={props.student ? 'Update' : 'Register'}
              disabled={props.loading}
              onClick={props.handleValidation}
              class='inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default User;