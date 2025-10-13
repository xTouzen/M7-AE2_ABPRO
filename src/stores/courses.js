import { defineStore } from "pinia";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../fireBaseConfig";

export const useCoursesStore = defineStore("coursesStore", {
  state: () => ({
    coursesList: [],
    loadingCourses: false,
  }),
  actions: {
    async getCourses() {
      this.loadingCourses = true;
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const courses = [];
        querySnapshot.forEach((doc) => {
          courses.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        this.coursesList = courses;
      } catch (error) {
        console.error("Error fetching courses: ", error);
      } finally {
        this.loadingCourses = false;
      }
    },

    async addCourse(courseData) {
      this.loadingCourses = true;
      try {
        await addDoc(collection(db, "courses"), courseData);
      } catch (error) {
        console.error("Error adding course: ", error);
        return error;
      } finally {
        this.loadingCourses = false;
      }
    },

    async updateCourse(courseId, courseData) {
      this.loadingCourses = true;
      try {
        const courseRef = doc(db, "courses", courseId);
        await updateDoc(courseRef, courseData);
      } catch (error) {
        console.error("Error updating course: ", error);
        return error;
      } finally {
        this.loadingCourses = false;
      }
    },

    async deleteCourse(courseId) {
      this.loadingCourses = true;
      try {
        const courseRef = doc(db, "courses", courseId);
        await deleteDoc(courseRef);
      } catch (error) {
        console.error("Error deleting course: ", error);
        return error;
      } finally {
        this.loadingCourses = false;
      }
    },
  },
});

