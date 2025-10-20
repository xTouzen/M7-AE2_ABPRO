<script setup>
import { onMounted, ref } from 'vue';
import { useCoursesStore } from '@/stores/courses';
import CourseAdmin from '@/components/CourseAdmin.vue'; 
import CourseForm from '@/components/CourseForm.vue';

const coursesStore = useCoursesStore();

const isFormDialogOpen = ref(false);
const isDeleteDialogOpen = ref(false);

const courseToEdit = ref(null);
const courseToDelete = ref(null);

onMounted(() => {
  coursesStore.getCourses();
});

const openCreateModal = () => {
  courseToEdit.value = null;
  isFormDialogOpen.value = true;
};
const openEditModal = (course) => {
  courseToEdit.value = course;
  isFormDialogOpen.value = true;
};
const handleCourseAction = () => {
  isFormDialogOpen.value = false;
  coursesStore.getCourses();
};
const openDeleteModal = (course) => {
  courseToDelete.value = course;
  isDeleteDialogOpen.value = true;
};
const handleCourseDeleted = async () => {
  if (!courseToDelete.value) return;
  await coursesStore.deleteCourse(courseToDelete.value.id);
  isDeleteDialogOpen.value = false;
  coursesStore.getCourses();
};

const holdTimeout = ref(null);
const isHoldingDelete = ref(false);
const progressValue = ref(0);

const startDeleteHold = () => {
  if (isHoldingDelete.value) return;
  isHoldingDelete.value = true;
  progressValue.value = 100;

  holdTimeout.value = setTimeout(() => {
    handleCourseDeleted();
  }, 2000);
};

const cancelDeleteHold = () => {
  clearTimeout(holdTimeout.value);
  isHoldingDelete.value = false;
  progressValue.value = 0;
};
</script>

<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h4 font-weight-bold text-grey-darken-3">Panel de Administración</h1>
      <v-btn
        color="primary"
        @click="openCreateModal"
        prepend-icon="mdi-plus"
      >
        Añadir Curso
      </v-btn>
    </div>

    <CourseAdmin
      @edit-course="openEditModal"
      @delete-course="openDeleteModal"
    />

    <v-dialog v-model="isFormDialogOpen" persistent max-width="800px">
       <v-card>
        <v-card-title class="pa-4">
          <span class="text-h5">{{ courseToEdit ? 'Editar Curso' : 'Crear Nuevo Curso' }}</span>
        </v-card-title>
        <v-card-text class="pa-4">
          <CourseForm 
            :initial-data="courseToEdit"
            @course-created="handleCourseAction"
            @course-updated="handleCourseAction"
            @close-modal="isFormDialogOpen = false"
          />
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isDeleteDialogOpen" persistent max-width="400px">
      <v-card>
        <v-card-title class="text-center text-h6 pa-4">Confirmar Eliminación</v-card-title>
        <v-card-text class="text-center">
          <p>¿Está seguro que quiere eliminar el curso <strong>"{{ courseToDelete?.name }}"</strong>?</p>
          <p class="text-error font-weight-bold mt-2">Esta acción no se puede deshacer.</p>
        </v-card-text>
        <v-card-actions class="d-flex flex-column pa-4">
          <v-btn
            color="error"
            block
            variant="flat"
            class="mb-2"
            @mousedown="startDeleteHold"
            @mouseup="cancelDeleteHold"
            @mouseleave="cancelDeleteHold"
            @touchstart.prevent="startDeleteHold"
            @touchend.prevent="cancelDeleteHold"
          >
            <v-progress-linear
              :model-value="progressValue"
              absolute
              color="white"
              style="opacity: 0.3; transition: width 2s linear;"
            ></v-progress-linear>
            Eliminar
          </v-btn>
          <v-btn color="grey-darken-1" block variant="text" @click="isDeleteDialogOpen = false">Cancelar</v-btn>
          <small class="text-grey-darken-1 mt-2">Presiona por dos segundos para eliminar</small>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
