import { Auth } from '@contexts';
import { AuthLayout } from '@layouts';
import { AuthService } from '@services';
import { CustomInput, CustomButton } from '@components';
import { useNavigate, useParams, A } from '@solidjs/router';
import { createFormGroup, createFormControl } from 'solid-forms';
import { Component, useContext, createEffect, createSignal } from 'solid-js';
import { Println, Validator, convertToTitleCase, convertStringToNumber } from '@utils';

const UniversityEdit: Component = () => {
  const params = useParams();
  const navigate = useNavigate();
  const context = useContext<Auth.IAuthContext>(Auth.Context);
  const [loading, setLoading] = createSignal<boolean>(false);
  const group = createFormGroup({
    name: createFormControl('', {
      required: true,
      validators: [Validator.required, Validator.maxLength],
    }),
    major: createFormControl('', {
      required: true,
      validators: [Validator.required, Validator.maxLength],
    }),
    description: createFormControl('', {
      required: true,
      validators: [Validator.required, Validator.maxLength],
    }),
    quantity: createFormControl('', {
      required: true,
      validators: [Validator.required, Validator.isNumber, Validator.minLengthNumber],
    }),
    image: createFormControl('', {
      required: true,
      validators: [Validator.required, Validator.maxLength],
    }),
    link: createFormControl('', {
      required: true,
      validators: [Validator.required, Validator.maxLength],
    }),
    alias: createFormControl('', {
      required: true,
      validators: [Validator.required, Validator.maxLength],
    }),
  });

  createEffect(() => {
    setLoading(context.loading());

    if (group.isDisabled || group.isValid) return;
  });

  const handleValidation = () => {
    if (group.isSubmitted) {
      Println('University', 'Form already submitted', 'error');
      return;
    }

    if (!group.isValid) {
      Object.entries(group.controls).forEach(([fieldName, error]) => {
        if (error.errors) {
          const errors = Object.values(error.errors);

          for (let index = 0; index < errors.length; index++) {
            Println('University', `${convertToTitleCase(fieldName)} ${errors[index]}`, 'error');
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
      url: `university/${params.id}`,
      name: 'University',
      data: {
        name: group.controls.name.value,
        major: group.controls.major.value,
        description: group.controls.description.value,
        quantity: convertStringToNumber(group.controls.quantity.value),
        image: group.controls.image.value,
        link: group.controls.link.value,
        alias: group.controls.alias.value,
      },
      token: context.token(),
      success: (res: any) => {
        const value = res.data;

        Println('University', value.message, 'success');
        navigate('/university');
      },
      finally: () => {
        group.markTouched(true);
        group.markSubmitted(true);
        context.updateData('loading', false);
      }
    });
  };

  const onFinish = async () => {
    context.updateData('loading', true);

    await AuthService.get({
      url: `university/${params.id}`,
      name: 'University',
      token: context.token(),
      success: (res: any) => {
        const value = res.data;
        const responseData = value.data[0];

        group.controls.name.setValue(responseData.name);
        group.controls.major.setValue(responseData.major);
        group.controls.description.setValue(responseData.description);
        group.controls.quantity.setValue(responseData.quantity);
        group.controls.image.setValue(responseData.image);
        group.controls.link.setValue(responseData.link);
        group.controls.alias.setValue(responseData.alias);
      },
      finally: () => {
        context.updateData('loading', false);
      }
    });
  };

  return (
    <AuthLayout onFinish={onFinish} canAccess='admin'>
      <section>
        <div class="py-12 h-full">
          <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-500">
            <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
              <div class="mb-3">
                <CustomInput
                  name='name'
                  type='text'
                  label='Name'
                  disabled={loading()}
                  placeholder='Name'
                  control={group.controls.name}
                  class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                />
              </div>
              <div class="mb-3">
                <CustomInput
                  name='alias'
                  type='text'
                  label='Alias'
                  disabled={loading()}
                  placeholder='Alias'
                  control={group.controls.alias}
                  class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                />
              </div>
              <div class="mb-3">
                <CustomInput
                  name='major'
                  type='text'
                  label='Major'
                  disabled={loading()}
                  placeholder='Major'
                  control={group.controls.major}
                  class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                />
              </div>
              <div class="mb-3">
                <CustomInput
                  name='quantity'
                  type='number'
                  label='Quantity'
                  disabled={loading()}
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
                  disabled={loading()}
                  placeholder='Description'
                  control={group.controls.description}
                  class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                />
              </div>
              <div class="mb-3">
                <CustomInput
                  name='link'
                  type='text'
                  label='Web Url'
                  disabled={loading()}
                  placeholder='Link'
                  control={group.controls.link}
                  class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                />
              </div>
              <div class="mb-3">
                <CustomInput
                  name='image'
                  type='text'
                  label='Image Url'
                  disabled={loading()}
                  placeholder='Link'
                  control={group.controls.image}
                  class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                />
              </div>
              <CustomButton 
                title='Edit'
                disabled={loading()}
                onClick={handleValidation}
                class='inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full'
              />
              <div class='flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5' />
              <A
                class='px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3 bg-[#3b5998]'
                href='/university'
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

export default UniversityEdit;