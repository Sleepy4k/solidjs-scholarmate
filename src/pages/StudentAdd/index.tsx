import { Auth } from '@contexts';
import { IUserData } from '@types';
import { AuthLayout } from '@layouts';
import { AuthService } from '@services';
import { useNavigate, A } from '@solidjs/router';
import { CustomInput, CustomButton } from '@components';
import { createFormGroup, createFormControl } from 'solid-forms';
import { Component, useContext, createSignal, createEffect } from 'solid-js';
import { Println, Validator, convertToTitleCase, convertStringToNumber } from '@utils';

const StudentAdd: Component = () => {
  const navigate = useNavigate();
  const context = useContext<Auth.IAuthContext>(Auth.Context);
  const [user, setUser] = createSignal<IUserData>(null);
  const [users, setUsers] = createSignal<IUserData[]>([]);
  const [loading, setLoading] = createSignal<boolean>(false);
  const group = createFormGroup({
    first_name: createFormControl('', {
      required: true,
      validators: [Validator.required, Validator.maxLength],
    }),
    last_name: createFormControl('', {
      required: true,
      validators: [Validator.required, Validator.maxLength],
    }),
    email: createFormControl(''),
    phone: createFormControl('', {
      required: true,
      validators: [Validator.required, Validator.maxLength],
    }),
    date_of_birth: createFormControl('', {
      required: true,
      validators: [Validator.required, Validator.maxLength],
    }),
    region: createFormControl('', {
      required: true,
      validators: [Validator.required, Validator.maxLength],
    }),
    register_number: createFormControl('', {
      required: true,
      validators: [Validator.required, Validator.maxLength],
    }),
    toefl_score: createFormControl('', {
      required: true,
      validators: [Validator.required, Validator.isNumber, Validator.minLengthNumber, Validator.maxToefl],
    }),
    ielts_score: createFormControl('', {
      required: true,
      validators: [Validator.required, Validator.isNumber, Validator.minLengthNumber, Validator.maxIelts],
    }),
  });

  createEffect(() => {
    setUser(context.user());
    setLoading(context.loading());

    if (group.isDisabled || group.isValid) return;
  });

  const handleValidation = () => {
    if (group.isSubmitted) {
      Println('Student', 'Form already submitted', 'error');
      return;
    }

    if (!group.isValid) {
      Object.entries(group.controls).forEach(([fieldName, error]) => {
        if (error.errors) {
          const errors = Object.values(error.errors);

          for (let index = 0; index < errors.length; index++) {
            Println('Student', `${convertToTitleCase(fieldName)} ${errors[index]}`, 'error');
          }
        }
      });

      return;
    }

    const userExist = users().filter((item: any) => item.email === group.controls.email.value);

    if (!userExist) {
      Println('Student', `User with email ${group.controls.email.value} not exist`, 'error');
      return;
    } else if (userExist.length > 0 && userExist[0].role !== 'user') {
      Println('Student', `User with email ${group.controls.email.value} not a student`, 'error');
      return;
    }

    group.markTouched(true);
    group.markSubmitted(true);
    context.updateData('loading', true);
    
    handleSubmit();
  };

  const handleSubmit = async () => {
    if (user()?.role !== 'admin') {
      await AuthService.post({
        url: 'apply',
        name: 'Student',
        data: {
          first_name: group.controls.first_name.value,
          last_name: group.controls.last_name.value,
          email: user().email,
          phone: group.controls.phone.value,
          date_of_birth: group.controls.date_of_birth.value,
          region: group.controls.region.value,
          register_number: group.controls.register_number.value,
          toefl_score: convertStringToNumber(group.controls.toefl_score.value),
          ielts_score: convertStringToNumber(group.controls.ielts_score.value),
        },
        token: context.token(),
        success: (res: any) => {
          const value = res.data;
  
          Println('Student', value.message, 'success');
          context.updateData('student', value.data[0]);
          navigate('/student');
        },
        finally: () => {
          group.markTouched(false);
          group.markSubmitted(false);
          context.updateData('loading', false);
        }
      });
    } else {
      await AuthService.post({
        url: 'student',
        name: 'Student',
        data: {
          first_name: group.controls.first_name.value,
          last_name: group.controls.last_name.value,
          email: group.controls.email.value,
          phone: group.controls.phone.value,
          date_of_birth: group.controls.date_of_birth.value,
          region: group.controls.region.value,
          register_number: group.controls.register_number.value,
          toefl_score: convertStringToNumber(group.controls.toefl_score.value),
          ielts_score: convertStringToNumber(group.controls.ielts_score.value),
        },
        token: context.token(),
        success: (res: any) => {
          const value = res.data;
  
          Println('Student', value.message, 'success');
          navigate('/student');
        },
        finally: () => {
          group.markTouched(false);
          group.markSubmitted(false);
          context.updateData('loading', false);
        }
      });
    }
  };

  const onFinish = async () => {
    context.updateData('loading', true);

    await AuthService.get({
      url: 'user',
      name: 'Student',
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
    <AuthLayout onFinish={onFinish}>
      <section>
        <div class="py-12 h-full">
          <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-500">
            <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
              <div class="mb-3">
                <CustomInput
                  name='first_name'
                  type='text'
                  label='First Name'
                  disabled={loading()}
                  placeholder='First Name'
                  control={group.controls.first_name}
                  class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                />
              </div>
              <div class="mb-3">
                <CustomInput
                  name='last_name'
                  type='text'
                  label='Last Name'
                  disabled={loading()}
                  placeholder='Last Name'
                  control={group.controls.last_name}
                  class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                />
              </div>
              {user()?.role === 'admin' && (
                <div class="mb-3">
                  <CustomInput
                    name='email'
                    type='email'
                    label='Email'
                    disabled={loading()}
                    placeholder='Email'
                    control={group.controls.email}
                    class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  />
                </div>
              )}
              <div class="mb-3">
                <CustomInput
                  name='phone'
                  type='text'
                  label='Phone'
                  disabled={loading()}
                  placeholder='Phone'
                  control={group.controls.phone}
                  class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                />
              </div>
              <div class="mb-3">
                <CustomInput
                  name='register_number'
                  type='text'
                  label='Register Number'
                  disabled={loading()}
                  placeholder='Register Number'
                  control={group.controls.register_number}
                  class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                />
              </div>
              <div class="mb-3">
                <CustomInput
                  name='date_of_birth'
                  type='date'
                  label='Date of Birth'
                  disabled={loading()}
                  placeholder='Date of Birth'
                  control={group.controls.date_of_birth}
                  class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                />
              </div>
              <div class="mb-3">
                <CustomInput
                  name='region'
                  type='text'
                  label='Region'
                  disabled={loading()}
                  placeholder='Region'
                  control={group.controls.region}
                  class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                />
              </div>
              <div class="mb-3">
                <CustomInput
                  min={1}
                  max={700}
                  name='toefl_score'
                  type='number'
                  label='TOEFL Score'
                  disabled={loading()}
                  placeholder='TOEFL Score'
                  control={group.controls.toefl_score}
                  class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                />
              </div>
              <div class="mb-3">
                <CustomInput
                  min={1}
                  max={9}
                  name='ielts_score'
                  type='number'
                  label='IELTS Score'
                  disabled={loading()}
                  placeholder='IELTS Score'
                  control={group.controls.ielts_score}
                  class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                />
              </div>
              <CustomButton 
                title='Add'
                disabled={loading()}
                onClick={handleValidation}
                class='inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full'
              />
              {user()?.role === 'admin' && (
                <>
                  <div class='flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5' />
                  <A
                    class='px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3 bg-[#3b5998]'
                    href='/student'
                    data-mdb-ripple='true'
                    data-mdb-ripple-color='light'
                  >
                    Back
                  </A>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </AuthLayout>
  );
};

export default StudentAdd;