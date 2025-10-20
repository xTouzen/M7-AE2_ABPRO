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
  <v-form @submit.prevent="handleSubmit">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="courseData.name"
            label="Nombre del Curso"
            variant="outlined"
            density="compact"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="courseData.code"
            label="Código"
            variant="outlined"
            density="compact"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="courseData.imageUrl"
            label="URL de la Imagen"
            variant="outlined"
            density="compact"
            prepend-inner-icon="mdi-image"
          ></v-text-field>
        </v-col>

        <v-col cols="6" md="3">
          <v-text-field
            v-model.number="courseData.capacity"
            label="Cupos"
            type="number"
            variant="outlined"
            density="compact"
          ></v-text-field>
        </v-col>

        <v-col cols="6" md="3">
          <v-text-field
            v-model.number="courseData.enrolledCount"
            label="Inscritos"
            type="number"
            variant="outlined"
            density="compact"
          ></v-text-field>
        </v-col>

        <v-col cols="6" md="3">
          <v-text-field
            v-model="courseData.duration"
            label="Duración"
            variant="outlined"
            density="compact"
            prepend-inner-icon="mdi-clock-outline"
          ></v-text-field>
        </v-col>

        <v-col cols="6" md="3">
          <v-text-field
            v-model.number="courseData.price"
            label="Costo"
            type="number"
            variant="outlined"
            density="compact"
            prefix="$"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-textarea
            v-model="courseData.description"
            label="Descripción"
            variant="outlined"
            rows="3"
            auto-grow
          ></v-textarea>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col class="d-flex justify-end gap-2">
          <v-btn
            variant="text"
            @click="handleCancel"
          >
            Cancelar
          </v-btn>
          <v-btn
            type="submit"
            color="primary"
            variant="flat"
          >
            {{ submitButtonText }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

