<script setup>
import { ref, watch, computed } from 'vue';
import { useCoursesStore } from '@/stores/courses';

const props = defineProps({
  initialData: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['course-created', 'course-updated', 'close-modal']);
const coursesStore = useCoursesStore();

const courseData = ref({});
const isEditMode = computed(() => !!props.initialData);

watch(() => props.initialData, (newData) => {
  if (newData) {
    courseData.value = { ...newData };
  } else {
    courseData.value = {
      name: '', imageUrl: '', capacity: 0, enrolledCount: 0,
      duration: '', price: 0, code: '', description: ''
    };
  }
}, { immediate: true }); 

const formTitle = computed(() => isEditMode.value ? 'Editar Curso' : 'Crear Nuevo Curso');
const submitButtonText = computed(() => isEditMode.value ? 'Guardar Cambios' : 'Crear Curso');

const handleSubmit = async () => {
  if (!courseData.value.name || !courseData.value.code) {
    alert('El nombre y el código del curso son obligatorios.');
    return;
  }

  if (isEditMode.value) {
    await coursesStore.updateCourse(props.initialData.id, courseData.value);
    emit('course-updated');
  } else {
    await coursesStore.addCourse(courseData.value);
    emit('course-created');
  }
};

const handleCancel = () => {
  emit('close-modal');
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="row">
      <div class="col-md-6 mb-3">
        <label for="courseName" class="form-label">Nombre del Curso</label>
        <input type="text" class="form-control" id="courseName" v-model="courseData.name" required>
      </div>
      <div class="col-md-6 mb-3">
        <label for="courseCode" class="form-label">Código</label>
        <input type="text" class="form-control" id="courseCode" v-model="courseData.code" required>
      </div>
    </div>
    <div class="mb-3">
      <label for="courseImageUrl" class="form-label">URL de la Imagen</label>
      <input type="text" class="form-control" id="courseImageUrl" v-model="courseData.imageUrl" placeholder="https://ejemplo.com/imagen.png">
    </div>
    <div class="row">
      <div class="col-md-3 mb-3">
        <label for="courseCapacity" class="form-label">Cupos</label>
        <input type="number" class="form-control" id="courseCapacity" v-model.number="courseData.capacity">
      </div>
      <div class="col-md-3 mb-3">
        <label for="courseEnrolled" class="form-label">Inscritos</label>
        <input type="number" class="form-control" id="courseEnrolled" v-model.number="courseData.enrolledCount">
      </div>
      <div class="col-md-3 mb-3">
        <label for="courseDuration" class="form-label">Duración</label>
        <input type="text" class="form-control" id="courseDuration" v-model="courseData.duration">
      </div>
      <div class="col-md-3 mb-3">
        <label for="coursePrice" class="form-label">Costo</label>
        <input type="number" class="form-control" id="coursePrice" v-model.number="courseData.price">
      </div>
    </div>
    <div class="mb-3">
      <label for="courseDescription" class="form-label">Descripción</label>
      <textarea class="form-control" id="courseDescription" rows="3" v-model="courseData.description"></textarea>
    </div>
    <div class="d-flex justify-content-end gap-2 mt-4">
      <button type="button" class="btn btn-secondary" @click="handleCancel">Cancelar</button>
      <button type="submit" class="btn btn-primary">{{ submitButtonText }}</button>
    </div>
  </form>
</template>

