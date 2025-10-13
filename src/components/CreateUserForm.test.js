import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import CreateUserForm from './CreateUserForm.vue';
import { useUserStore } from '@/stores/user';

describe('CreateUserForm.vue', () => {

  it('Muestra un mensaje de error si las contraseñas no coinciden', async () => {
    const wrapper = mount(CreateUserForm, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
        stubs: { 'router-link': true }
      }
    });

    const userStore = useUserStore();

    await wrapper.find('#email').setValue('test@correo.com');
    await wrapper.find('#password').setValue('password123');
    await wrapper.find('#confirmPassword').setValue('password456'); 

    await wrapper.find('form').trigger('submit');

    expect(wrapper.find('.alert-danger').exists()).toBe(true);
    expect(wrapper.find('.alert-danger').text()).toContain('Las contraseñas no coinciden.');
    
    expect(userStore.registerUser).toHaveBeenCalledTimes(0);
  });

  it('Llama a la acción registerUser del store cuando el formulario es válido', async () => {
    const wrapper = mount(CreateUserForm, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
        stubs: { 'router-link': true }
      }
    });

    const userStore = useUserStore();

    const email = 'usuario.nuevo@correo.com';
    const password = 'passwordSegura123';

    await wrapper.find('#email').setValue(email);
    await wrapper.find('#password').setValue(password);
    await wrapper.find('#confirmPassword').setValue(password);

    await wrapper.find('form').trigger('submit');

    expect(wrapper.find('.alert-danger').exists()).toBe(false);

    expect(userStore.registerUser).toHaveBeenCalledTimes(1);
    
    expect(userStore.registerUser).toHaveBeenCalledWith(email, password);
  });
});
