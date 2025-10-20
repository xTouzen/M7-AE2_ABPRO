<script setup>
import { useCoursesStore } from '@/stores/courses';

const coursesStore = useCoursesStore();
const emit = defineEmits(['edit-course', 'delete-course']);

const headers = [
  { title: 'Nombre', key: 'name' },
  { title: 'Código', key: 'code' },
  { title: 'Cupos', key: 'capacity' },
  { title: 'Inscritos', key: 'enrolledCount' },
  { title: 'Costo', key: 'price', align: 'end' },
  { title: 'Acciones', key: 'actions', sortable: false, align: 'center' },
];

const formattedPrice = (price) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};
</script>

<template>
  <v-card>
    <v-card-title>
      Gestión de Cursos
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="coursesStore.coursesList"
        :loading="coursesStore.loadingCourses"
        item-value="id"
        density="compact"
      >
        <template v-slot:item.price="{ item }">
          {{ formattedPrice(item.price) }}
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn icon="mdi-pencil" variant="text" size="small" class="me-2" @click="emit('edit-course', item)"></v-btn>
          <v-btn icon="mdi-delete" variant="text" size="small" @click="emit('delete-course', item)"></v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
