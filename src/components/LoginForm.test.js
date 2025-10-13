import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import LoginForm from './LoginForm.vue';
import { useUserStore } from '@/stores/user';

describe('LoginForm.vue', () => {

  it('Muestra un mensaje de error si los campos están vacíos al enviar', async () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
        stubs: {
          'router-link': true
        }
      }
    });

    await wrapper.find('form').trigger('submit');

    expect(wrapper.find('.alert-danger').exists()).toBe(true);
    expect(wrapper.find('.alert-danger').text()).toContain('El correo y la contraseña son obligatorios.');
  });

  it('Llama a la acción loginUser del store con los datos correctos al enviar', async () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
        stubs: {
          'router-link': true
        }
      }
    });

    const userStore = useUserStore();

    const email = 'test@correo.com';
    const password = 'password123';

    await wrapper.find('#email').setValue(email);
    await wrapper.find('#password').setValue(password);

    await wrapper.find('form').trigger('submit');

    expect(userStore.loginUser).toHaveBeenCalledTimes(1);
    expect(userStore.loginUser).toHaveBeenCalledWith(email, password);
  });
});
