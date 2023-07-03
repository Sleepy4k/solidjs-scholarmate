import { Auth } from '@contexts';
import { AuthLayout } from '@layouts';
import { AuthService } from '@services';
import { Println, Validator, convertToTitleCase } from '@utils';
import { createFormGroup, createFormControl } from 'solid-forms';
import { Component, createSignal, useContext, lazy, createEffect } from 'solid-js';

const User = lazy(() => import('./User'));
const Admin = lazy(() => import('./Admin'));

const Students: Component = () => {
  const context = useContext(Auth.Context);
  const [user, setUser] = createSignal(null);
  const [student, setStudent] = createSignal(null);
  const [students, setStudents] = createSignal([]);
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
      validators: [Validator.required, Validator.isNumber],
    }),
    ielts_score: createFormControl('', {
      required: true,
      validators: [Validator.required, Validator.isNumber],
    }),
  });

  createEffect(() => {
    setUser(context.user());
    setLoading(context.loading());
    setStudent(context.student());

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

    group.markTouched(true);
    group.markSubmitted(true);
    group.controls.email.setValue(user().email);
    context.updateData('loading', true);
    
    handleSubmit();
  };

  // submit Button
  const handleSubmit = async () => {
    if (student()) {
      await AuthService.put({
        url: `student/${student().id}`,
        token: context.token(),
        data: group.value,
        success: (res: any) => {
          const value = res.data;

          Println('Students', value.message, 'success');
          context.updateData('student', value.data[0]);
        },
        error: (err: any) => {
          if (err.response) {
            Println('Student', err.response.data.message, 'error');
          } else {
            Println('Student', err.message, 'error');
          }
        },
        finally: () => {
          group.markTouched(false);
          group.markSubmitted(false);
          context.updateData('loading', false);
        }
      });
    } else {
      await AuthService.post({
        url: 'apply',
        token: context.token(),
        data: {
          first_name: group.controls.first_name.value,
          last_name: group.controls.last_name.value,
          email: group.controls.email.value,
          phone: group.controls.phone.value,
          date_of_birth: group.controls.date_of_birth.value,
          region: group.controls.region.value,
          register_number: group.controls.register_number.value,
          toefl_score: parseInt(group.controls.toefl_score.value, 10),
          ielts_score: parseInt(group.controls.ielts_score.value, 10),
        },
        success: (res: any) => {
          const value = res.data;

          Println('Student', value.message, 'success');
          context.updateData('student', value.data[0]);
        },
        error: (err: any) => {
          if (err.response) {
            Println('Student', err.response.data.message, 'error');
          } else {
            Println('Student', err.message, 'error');
          }
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

    if (student() && user() && user().role === 'user') {
      group.controls.first_name.setValue(student().first_name);
      group.controls.last_name.setValue(student().last_name);
      group.controls.email.setValue(student().email);
      group.controls.phone.setValue(student().phone);
      group.controls.date_of_birth.setValue(student().date_of_birth);
      group.controls.region.setValue(student().region);
      group.controls.register_number.setValue(student().register_number);
      group.controls.toefl_score.setValue(student().toefl_score);
      group.controls.ielts_score.setValue(student().ielts_score);
    } else if (user() && user().role === 'admin') {
      await AuthService.get({
        url: 'student',
        token: context.token(),
        data: group.value,
        success: (res: any) => {
          const value = res.data;

          setStudents(value.data);
        },
        error: (err: any) => {
          if (err.response) {
            Println('Student', err.response.data.message, 'error');
          } else {
            Println('Student', err.message, 'error');
          }
        }
      });
    }

    context.updateData('loading', false);
  };

  return (
    <AuthLayout onFinish={onFinish}>
      {user().role === 'user' ? <User group={group} loading={loading()} student={student()} handleValidation={handleValidation} /> : <Admin loading={loading()} students={students()} />}
    </AuthLayout>
  );
};

export default Students;