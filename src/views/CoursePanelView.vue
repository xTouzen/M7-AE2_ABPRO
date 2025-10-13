<script setup>
import { onMounted, ref } from 'vue';
import { useCoursesStore } from '@/stores/courses';
import CourseCard from '@/components/CourseCard.vue';
import CourseForm from '@/components/CourseForm.vue';
import { Modal } from 'bootstrap';

const coursesStore = useCoursesStore();
const needsRefresh = ref(false);

const editModalInstance = ref(null);
const deleteModalInstance = ref(null);

const editModalRef = ref(null);
const deleteModalRef = ref(null);

const courseToEdit = ref(null);
const courseToDelete = ref(null);

onMounted(() => {
  coursesStore.getCourses();

  if (editModalRef.value) {
    editModalInstance.value = new Modal(editModalRef.value);
    editModalRef.value.addEventListener('hidden.bs.modal', () => {
      if (needsRefresh.value) {
        coursesStore.getCourses();
        needsRefresh.value = false;
      }
    });
  }

  if (deleteModalRef.value) {
    deleteModalInstance.value = new Modal(deleteModalRef.value);
    deleteModalRef.value.addEventListener('hidden.bs.modal', () => {
      cancelDeleteHold(); // Asegura resetear el botón si se cierra el modal
      if (needsRefresh.value) {
        coursesStore.getCourses();
        needsRefresh.value = false;
      }
    });
  }
});

const openCreateModal = () => {
  courseToEdit.value = null; 
  editModalInstance.value.show();
};
const openEditModal = (course) => {
  courseToEdit.value = course; 
  editModalInstance.value.show();
};
const handleCourseAction = () => { 
  needsRefresh.value = true;
  editModalInstance.value.hide();
};

const openDeleteModal = (course) => {
  courseToDelete.value = course;
  deleteModalInstance.value.show();
};
const handleCourseDeleted = async () => {
  if (!courseToDelete.value) return;
  await coursesStore.deleteCourse(courseToDelete.value.id);
  needsRefresh.value = true;
  deleteModalInstance.value.hide();
};

const holdTimeout = ref(null);
const isHoldingDelete = ref(false);
const progressWidth = ref('0%');

const startDeleteHold = () => {
  if (isHoldingDelete.value) return;
  isHoldingDelete.value = true;
  progressWidth.value = '100%'; 

  holdTimeout.value = setTimeout(() => {
    handleCourseDeleted(); 
  }, 2000);
};

const cancelDeleteHold = () => {
  clearTimeout(holdTimeout.value); 
  isHoldingDelete.value = false;
  progressWidth.value = '0%'; 
};
</script>

<template>
  <div>
    <div class="container my-5 pb-5">
      <h1 class="mb-4 text-center">Panel de Cursos</h1>

      <div v-if="coursesStore.loadingCourses && !coursesStore.coursesList.length" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando cursos...</p>
      </div>

      <div v-else class="row g-4">
        <div v-for="course in coursesStore.coursesList" :key="course.id" class="col-12 col-md-6 col-lg-4">
          <CourseCard 
            :course="course" 
            @edit-course="openEditModal" 
            @delete-course="openDeleteModal"
          />
        </div>
      </div>
    </div>

    <button class="btn btn-primary btn-lg rounded-circle floating-add-btn shadow" @click="openCreateModal">
      <i class="bi bi-plus-lg"></i>
    </button>

    <div class="modal fade" id="courseFormModal" tabindex="-1" ref="editModalRef">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ courseToEdit ? 'Editar Curso' : 'Crear Nuevo Curso' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <CourseForm 
              :initial-data="courseToEdit"
              @course-created="handleCourseAction"
              @course-updated="handleCourseAction"
              @close-modal="editModalInstance.hide()"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="deleteConfirmModal" tabindex="-1" ref="deleteModalRef">
      <div class="modal-dialog modal-dialog-centered" style="max-width: 400px;">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title w-100 text-center">Confirmar Eliminación</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            <p>¿Está seguro que quiere eliminar el curso <strong>"{{ courseToDelete?.name }}"</strong>?</p>
            <p class="text-danger fw-bold">Esta acción no se puede deshacer.</p>
          </div>
          <div class="modal-footer border-0 d-flex flex-column align-items-center">
            <button 
              type="button" 
              class="btn btn-danger position-relative overflow-hidden w-100 mb-2"
              @mousedown="startDeleteHold"
              @mouseup="cancelDeleteHold"
              @mouseleave="cancelDeleteHold"
              @touchstart.prevent="startDeleteHold"
              @touchend.prevent="cancelDeleteHold"
            >
              <span class="position-relative" style="z-index: 2;">Eliminar</span>
              <div class="progress-fill" :style="{ width: progressWidth }"></div>
            </button>
            <button type="button" class="btn btn-secondary w-100" data-bs-dismiss="modal">Cancelar</button>
            <small class="text-muted mt-2">Presiona por dos segundos para eliminar</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.floating-add-btn {
  position: fixed; bottom: 90px; right: 30px;
  width: 60px; height: 60px; display: flex;
  align-items: center; justify-content: center;
  font-size: 2rem; z-index: 1055;
}
.progress-fill {
  position: absolute; top: 0; left: 0;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.4);
  transition: width 2s linear; 
  z-index: 1;
}
</style>

