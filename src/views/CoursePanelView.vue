<script setup>
import { onMounted } from 'vue';
import { useCoursesStore } from '@/stores/courses';
import CourseCard from '@/components/CourseCard.vue';

const coursesStore = useCoursesStore();

onMounted(() => {
  coursesStore.getCourses();
});
</script>

<template>
  <v-container>
    <h1 class="mb-4 text-center text-h4 font-weight-bold text-grey-darken-3">Nuestros Cursos</h1>

    <v-row v-if="coursesStore.loadingCourses && !coursesStore.coursesList.length" justify="center" class="mt-16">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      <p class="w-100 text-center mt-4 text-grey-darken-1">Cargando cursos...</p>
    </v-row>
    
    <v-row v-else>
      <v-col
        v-for="course in coursesStore.coursesList"
        :key="course.id"
        cols="12"
        md="6"
        lg="4"
      >
        <CourseCard :course="course" />
      </v-col>
    </v-row>
  </v-container>
</template>

