<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";

const router = useRouter();
const authStore = useAuthStore();

// State های فرم
const username = ref("admin"); // به صورت پیش‌فرض پر کردیم تا تست راحت باشد
const password = ref("admin123");
const errorMessage = ref("");
const isLoading = ref(false);

const handleLogin = async () => {
  if (!username.value || !password.value) {
    errorMessage.value = "لطفاً نام کاربری و رمز عبور را وارد کنید.";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    // فراخوانی اکشن لاگین از Pinia
    await authStore.login(username.value, password.value);

    // در صورت موفقیت، ریدایرکت به داشبورد
    router.push({ name: "dashboard" });
  } catch (error: any) {
    errorMessage.value = error.message || "خطایی در ورود رخ داد";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
        ورود به پنل مدیریت
      </h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <!-- پیام خطا -->
        <div
          v-if="errorMessage"
          class="bg-red-50 text-red-600 p-3 rounded text-sm text-center"
        >
          {{ errorMessage }}
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >نام کاربری</label
          >
          <input
            v-model="username"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="admin"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >رمز عبور</label
          >
          <input
            v-model="password"
            type="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="admin123"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center"
        >
          <span v-if="isLoading">در حال ورود...</span>
          <span v-else>ورود</span>
        </button>
      </form>
    </div>
  </div>
</template>
