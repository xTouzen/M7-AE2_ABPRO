import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CourseCard from './CourseCard.vue';

describe('CourseCard.vue', () => {

  const mockCourse = {
    id: 'test-id-123',
    name: 'Curso de Pruebas Unitarias',
    code: 'TEST-101',
    imageUrl: 'https://ejemplo.com/imagen.png',
    enrolledCount: 10,
    capacity: 25,
    duration: '10 horas',
    price: 75000,
    description: 'Aprende a hacer tests con Vitest.'
  };

  it('Muestra los datos del curso pasados por props correctamente', () => {
    const wrapper = mount(CourseCard, {
      props: {
        course: mockCourse
      }
    });

    const cardText = wrapper.text();

    expect(cardText).toContain(mockCourse.name);
    expect(cardText).toContain(mockCourse.code);
    expect(cardText).toContain(`${mockCourse.enrolledCount} / ${mockCourse.capacity}`);
    expect(cardText).toContain(mockCourse.duration);
    expect(cardText).toContain(mockCourse.description);
    
    const formattedPrice = new Intl.NumberFormat('es-CL').format(mockCourse.price);
    expect(cardText).toContain(`$${formattedPrice}`);
    
    const img = wrapper.find('img');
    expect(img.attributes('src')).toBe(mockCourse.imageUrl);
    expect(img.attributes('alt')).toBe(mockCourse.name);
  });

  it('Emite los eventos "edit-course" y "delete-course" con los datos del curso', async () => {
    const wrapper = mount(CourseCard, {
      props: {
        course: mockCourse
      }
    });

    await wrapper.find('.btn-warning').trigger('click');

    expect(wrapper.emitted('edit-course')).toBeTruthy(); 
    expect(wrapper.emitted('edit-course').length).toBe(1); 
    expect(wrapper.emitted('edit-course')[0][0]).toEqual(mockCourse); 

    await wrapper.find('.btn-danger').trigger('click');

    expect(wrapper.emitted('delete-course')).toBeTruthy();
    expect(wrapper.emitted('delete-course').length).toBe(1);
    expect(wrapper.emitted('delete-course')[0][0]).toEqual(mockCourse);
  });
});
