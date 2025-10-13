<script setup>
defineProps({
  course: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['edit-course', 'delete-course']);
</script>

<template>
  <div class="card h-100 shadow-sm">
    <img :src="course.imageUrl" class="card-img-top" :alt="course.name" style="height: 200px; object-fit: cover;">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ course.name }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ course.code }}</h6>
      
      <div class="my-2">
        <span class="badge bg-primary me-2">
          <i class="bi bi-people-fill"></i> {{ course.enrolledCount }} / {{ course.capacity }}
        </span>
      </div>
      
      <div class="d-flex justify-content-between align-items-center text-muted small">
        <span><i class="bi bi-clock"></i> {{ course.duration }}</span>
        <span class="fw-bold fs-5 text-success">${{ new Intl.NumberFormat('es-CL').format(course.price) }}</span>
      </div>

      <p class="card-text mt-3 flex-grow-1">{{ course.description }}</p>

      <div class="mt-auto pt-2">
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button class="btn btn-warning btn-sm" type="button" @click="emit('edit-course', course)">
            <i class="bi bi-pencil-fill"></i> Editar
          </button>
          <button class="btn btn-danger btn-sm" type="button" @click="emit('delete-course', course)">
            <i class="bi bi-trash-fill"></i> Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-title {
  font-weight: bold;
}
.card:hover {
  transform: translateY(-5px);
  transition: all 0.2s ease-in-out;
}
</style>

