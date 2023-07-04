import { Auth } from '@contexts';
import { GuestLayout } from '@layouts';
import { GuestService } from '@services';
import { useNavigate, A } from '@solidjs/router';
import { CustomInput, CustomButton } from '@components';
import { Println, Validator, convertToTitleCase } from '@utils';
import { createFormGroup, createFormControl } from 'solid-forms';
import { Component, createEffect, useContext, createSignal } from 'solid-js';

const Login: Component = () => {
  const navigate = useNavigate();
  const context = useContext<Auth.IAuthContext>(Auth.Context);
  const [loading, setLoading] = createSignal<boolean>(false);
  const group = createFormGroup({
    email: createFormControl('', {
      required: true,
      validators: [Validator.required, Validator.email, Validator.maxLength],
    }),
    password: createFormControl('', {
      required: true,
      validators: [Validator.required, Validator.minLength, Validator.maxLength],
    }),
  });

  createEffect(() => {
    setLoading(context.loading());

    if (group.isDisabled || group.isValid) return;
  });
  
  const handleValidation = () => {
    if (group.isSubmitted) {
      Println('Login', 'Form already submitted', 'error');
      return;
    }

    if (!group.isValid) {
      Object.entries(group.controls).forEach(([fieldName, error]) => {
        if (error.errors) {
          const errors = Object.values(error.errors);

          for (let index = 0; index < errors.length; index++) {
            Println('Login', `${convertToTitleCase(fieldName)} ${errors[index]}`, 'error');
          }
        }
      });

      return;
    }

    group.markTouched(true);
    group.markSubmitted(true);
    context.updateData('loading', true);
    
    handleSubmit();
  };

  const handleSubmit = async () => {
    await GuestService.post({
      url: 'login',
      name: 'Login',
      data: group.value,
      success: (res: any) => {
        const value = res.data;

        Println('Login', value.message, 'success');
        context.updateData('token', value.token);
        handleLogin(value.data[0]);
      },
      finally: () => {
        group.markTouched(false);
        group.markSubmitted(false);
        context.updateData('loading', false);
      }
    });
  };

  const handleLogin = (data: any) => {
    context.updateData('user', {
      id: data.id,
      email: data.email,
      role: data.role,
    });

    if (data.student !== null) {
      context.updateData('student', data.student);
    }

    if (data.student === null && data.role === 'user') {
      navigate('/student');
    } else {
      navigate('/');
    }
  };

  return (
    <GuestLayout>
      <section class='h-screen'>
        <div class='py-12 h-full'>
          <div class='flex justify-center items-center flex-wrap h-full g-6 text-gray-500'>
            <div class='md:w-8/12 lg:w-6/12 mb-12 md:mb-0'>
              <img
                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg'
                class='w-full'
                alt='Phone image'
              />
            </div>
            <div class='md:w-8/12 lg:w-5/12 lg:ml-20'>
              <h1 class='text-5xl font-bold text-blue-500 mb-5'>Login</h1>
              <div class='mb-6'>
                <CustomInput
                  name='email'
                  type='email'
                  label='Email'
                  disabled={loading()}
                  placeholder='name@example.com'
                  control={group.controls.email}
                  class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                />
              </div>
              <div class='mb-6'>
                <CustomInput
                  name='password'
                  type='password'
                  label='Password'
                  disabled={loading()}
                  placeholder='your very secret password'
                  control={group.controls.password}
                  class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                />
              </div>
              <CustomButton 
                title='Sign In'
                disabled={loading()}
                onClick={handleValidation}
                class='inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full'
              />
              <div class='flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5'>
                <p class='text-center font-semibold mx-4 mb-0'>OR</p>
              </div>
              <A
                class='px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3 bg-[#3b5998]'
                href='/register'
                data-mdb-ripple='true'
                data-mdb-ripple-color='light'
              >
                Sign Up
              </A>
            </div>
          </div>
        </div>
      </section>
    </GuestLayout>
  );
};

export default Login;