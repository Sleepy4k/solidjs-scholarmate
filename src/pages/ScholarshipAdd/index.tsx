import { Auth } from '@contexts';
import { AuthLayout } from '@layouts';
import { AuthService } from '@services';
import '@thisbeyond/solid-select/style.css';
import { useNavigate, A } from '@solidjs/router';
import { Select } from '@thisbeyond/solid-select';
import { CustomInput, CustomButton } from '@components';
import { createFormGroup, createFormControl } from 'solid-forms';
import { Component, useContext, createSignal, createEffect } from 'solid-js';
import { Println, Validator, convertToTitleCase, convertStringToNumber } from '@utils';

interface IUniversity {
  label: string;
  value: string;
}

const ScholarshipAdd: Component = () => {
  const navigate = useNavigate();
  const context = useContext<Auth.IAuthContext>(Auth.Context);
  const [loading, setLoading] = createSignal<boolean>(false);
  const [universities, setUniversities] = createSignal<IUniversity[]>([]);
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
    univ_id: createFormControl('', {
      required: true,
      validators: [Validator.required, Validator.maxLength],
    }),
  });

  const formatter = (item: any, type: string) => (type === 'option' ? item.label : item.label);

  createEffect(() => {
    setLoading(context.loading());

    if (group.isDisabled || group.isValid) return;
  });

  const handleValidation = () => {
    console.log(group.controls.univ_id.value);
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
    await AuthService.post({
      url: 'scholarship',
      name: 'Scholarship',
      data: {
        name: group.controls.name.value,
        quantity: convertStringToNumber(group.controls.quantity.value),
        description: group.controls.description.value,
        requirement: group.controls.requirement.value,
        univ_id: convertStringToNumber(group.controls.univ_id.value),
      },
      token: context.token(),
      success: (res: any) => {
        const value = res.data;

        Println('Scholarship', value.message, 'success');
        navigate('/scholarship');
      },
      finally: () => {
        group.markTouched(false);
        group.markSubmitted(false);
        context.updateData('loading', false);
      }
    });
  };

  const onFinish = async () => {
    context.updateData('loading', true);

    await AuthService.get({
      url: 'university',
      name: 'Scholarship',
      token: context.token(),
      success: (res: any) => {
        const value = res.data;

        setUniversities(value.data.filter((item: any) => item.quantity > 0).map((item: any) => ({
          label: item.name,
          value: item.id
        })));
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
                  disabled={loading()}
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
                  name='requirement'
                  type='text'
                  label='Requirement'
                  disabled={loading()}
                  placeholder='Requirement'
                  control={group.controls.requirement}
                  class='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                />
              </div>
              <div class="mb-3">
                <label>University</label>
                <Select
                  format={formatter}
                  options={universities()}
                  onChange={data => group.controls.univ_id.setValue(data.value)}
                />
              </div>
              <CustomButton 
                title='Add'
                disabled={loading()}
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

export default ScholarshipAdd;