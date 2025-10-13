import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import CourseForm from './CourseForm.vue';
import { useCoursesStore } from '@/stores/courses';

describe('CourseForm.vue', () => {

  it('En modo creación, llama a la acción addCourse y emite el evento course-created', async () => {
    const wrapper = mount(CourseForm, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      }
    });

    const coursesStore = useCoursesStore();

    const newCourseData = {
      name: 'Nuevo Curso de Vitest',
      code: 'VIT-101'
    };

    await wrapper.find('#courseName').setValue(newCourseData.name);
    await wrapper.find('#courseCode').setValue(newCourseData.code);
    
    await wrapper.find('form').trigger('submit');
    
    expect(coursesStore.addCourse).toHaveBeenCalledTimes(1);
    
    expect(coursesStore.addCourse).toHaveBeenCalledWith(
      expect.objectContaining(newCourseData)
    );
      
    expect(wrapper.emitted('course-created')).toBeTruthy();
  });

  it('En modo edición, llama a la acción updateCourse y emite el evento course-updated', async () => {
    const initialCourseData = {
      id: 'xyz123',
      name: 'Curso Original',
      code: 'ORG-101',
      price: 50000
    };

    const wrapper = mount(CourseForm, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      },
      props: {
        initialData: initialCourseData
      }
    });
    
    const coursesStore = useCoursesStore();
    
    const updatedName = 'Curso Actualizado con Éxito';
    
    await wrapper.find('#courseName').setValue(updatedName);
    
    await wrapper.find('form').trigger('submit');
    
    expect(coursesStore.updateCourse).toHaveBeenCalledTimes(1);

    expect(coursesStore.updateCourse).toHaveBeenCalledWith(
      initialCourseData.id, 
      expect.objectContaining({ name: updatedName })
    );

    expect(wrapper.emitted('course-updated')).toBeTruthy();
  });
});
