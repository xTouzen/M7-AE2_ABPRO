<script setup>
defineProps({
  course: {
    type: Object,
    required: true
  }
});

const formattedPrice = (price) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};
</script>

<template>
  <v-card class="h-100 d-flex flex-column">
    <v-img
      :src="course.imageUrl"
      :alt="course.name"
      height="200px"
      cover
    ></v-img>

    <v-card-item>
      <v-card-title>{{ course.name }}</v-card-title>
      <v-card-subtitle>{{ course.code }}</v-card-subtitle>
    </v-card-item>

    <v-card-text class="flex-grow-1">
      <div class="mb-3">
        <v-chip
          color="primary"
          size="small"
          prepend-icon="mdi-account-group"
          class="me-2"
        >
          {{ course.enrolledCount }} / {{ course.capacity }}
        </v-chip>
      </div>

      <div class="d-flex justify-space-between align-center text-grey-darken-1 mb-3">
        <div class="d-flex align-center text-caption">
          <v-icon start icon="mdi-clock-outline"></v-icon>
          {{ course.duration }}
        </div>
        <div class="text-h6 text-success font-weight-bold">
          {{ formattedPrice(course.price) }}
        </div>
      </div>
      
      <p class="text-body-2">{{ course.description }}</p>
    </v-card-text>
    
  </v-card>
</template>

