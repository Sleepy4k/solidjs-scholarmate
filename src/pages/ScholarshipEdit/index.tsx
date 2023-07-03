import { Auth } from '@contexts';
import { AuthLayout } from '@layouts';
import { AuthService } from '@services';
import { Component, useContext } from 'solid-js';
import { CustomInput, CustomButton } from '@components';
import { useNavigate, useParams, A } from '@solidjs/router';
import { Println, Validator, convertToTitleCase } from '@utils';
import { createFormGroup, createFormControl } from 'solid-forms';

const ScholarshipEdit: Component = () => {
  const params = useParams();
  const navigate = useNavigate();
  const context = useContext(Auth.Context);
  const loading = context.loading();
  const group = createFormGroup({
    name: createFormControl('', {
      required: true,
      validators: [Validator.required, Validator.maxLength],
    }),
    quantity: createFormControl('', {
      required: true,
      validators: [Validator.required, Validator.maxLength],
    }),
    description: createFormControl('', {
      required: true,
      validators: [Validator.required, Validator.maxLength],
    }),
    requirement: createFormControl('', {
      required: true,
      validators: [Validator.required, Validator.maxLength],
    }),
    univ_id: createFormControl(0, {
      required: true,
      validators: [Validator.required, Validator.maxLength],
    }),
  });

  const handleValidation = () => {
    if (group.isSubmitted) {
      Println('Scholarship', 'Form already submitted', 'error');
      return;
    }

    if (!group.isValid) {
      Object.entries(group.controls).forEach(([fieldName, error]) => {
        if (error.errors) {
          const errors = Object.values(error.errors);

          for (let index = 0; index < errors.length; index++) {
            Println('Scholarship', `${convertToTitleCase(fieldName)} ${errors[index]}`, 'error');
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
    await AuthService.put({
      url: `scholarship/${params.id}`,
      token: context.token(),
      data: group.value,
      success: (res: any) => {
        const value = res.data;

        Println('Scholarship', value.message, 'success');
        navigate('/scholarship');
      },
      error: (err: any) => {
        if (err.response) {
          Println('Scholarship', err.response.data.message, 'error');
        } else {
          Println('Scholarship', err.message, 'error');
        }
      }
    });
  };

  const onFinish = async () => {
    context.updateData('loading', true);

    await AuthService.get({
      url: `scholarship/${params.id}`,
      token: context.token(),
      success: (res: any) => {
        const value = res.data;

        group.controls.name.setValue(value.data.name);
        group.controls.quantity.setValue(value.data.quantity);
        group.controls.description.setValue(value.data.description);
        group.controls.requirement.setValue(value.data.requirement);
        group.controls.univ_id.setValue(value.data.univ_id);
      },
      error: (err: any) => {
        if (err.response) {
          Println('Scholarship', err.response.data.message, 'error');
        } else {
          Println('Scholarship', err.message, 'error');
        }
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
                  name='name'
                  type='text'
                  label='Name'
                  disabled={loading}
                  placeholder='Name'
                  control={group.controls.name}
                  class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                />
              </div>
              <div class="mb-3">
                <CustomInput
                  name='quantity'
                  type='number'
                  label='Quantity'
                  disabled={loading}
                  placeholder='Quantity'
                  control={group.controls.quantity}
                  class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                />
              </div>
              <div class="mb-3">
                <CustomInput
                  name='description'
                  type='text'
                  label='Description'
                  disabled={loading}
                  placeholder='Description'
                  control={group.controls.description}
                  class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                />
              </div>
              <div class="mb-3">
                <CustomInput
                  name='requirement'
                  type='text'
                  label='Requirement'
                  disabled={loading}
                  placeholder='Requirement'
                  control={group.controls.requirement}
                  class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                />
              </div>
              <CustomButton 
                title='Edit'
                disabled={loading}
                onClick={handleValidation}
                class='inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full'
              />
              <div class='flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5' />
              <A
                class='px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3 bg-[#3b5998]'
                href='/scholarship'
                data-mdb-ripple='true'
                data-mdb-ripple-color='light'
              >
                Back
              </A>
            </div>
          </div>
        </div>
      </section>
    </AuthLayout>
  );
};

export default ScholarshipEdit;