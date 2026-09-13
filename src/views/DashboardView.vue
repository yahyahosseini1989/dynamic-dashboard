<script setup lang="ts">
import { ref } from "vue";
import DynamicForm from "../components/DynamicForm.vue";
import DataTable from "../components/DataTable.vue";
import type { FormField } from "../types/form";

// ۱. ساختار فرم (Schema)
const userSchema: FormField[] = [
  {
    name: "firstName",
    label: "نام",
    type: "text",
    required: true,
    placeholder: "مثلاً یحیی",
  },
  { name: "lastName", label: "نام خانوادگی", type: "text", required: true },
  { name: "age", label: "سن", type: "number" },
  {
    name: "role",
    label: "نقش سازمانی",
    type: "select",
    required: true,
    options: [
      { label: "مدیر ارشد", value: "Admin" },
      { label: "توسعه‌دهنده", value: "Developer" },
      { label: "پشتیبان", value: "Support" },
    ],
  },
];

// ۲. ساختار ستون‌های جدول
const tableHeaders = [
  { key: "firstName", label: "نام" },
  { key: "lastName", label: "نام خانوادگی" },
  { key: "age", label: "سن" },
  { key: "role", label: "نقش سازمانی" },
];

// ۳. State Management
const formData = ref({});
const usersList = ref<Record<string, any>[]>([]);
const isLoading = ref(false);

// ۴. شبیه‌سازی ارسال به API و به‌روزرسانی جدول
const handleSubmit = (data: Record<string, any>) => {
  isLoading.value = true;

  // شبیه‌سازی تاخیر شبکه (Network Delay)
  setTimeout(() => {
    // افزودن داده جدید به بالای لیست جدول
    usersList.value.unshift({ ...data, id: Date.now() });

    // ریست کردن فرم
    formData.value = {};
    isLoading.value = false;
  }, 600);
};
</script>

<template>
  <div class="p-8 max-w-7xl mx-auto" dir="rtl">
    <h1 class="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
      مدیریت کاربران (یکپارچگی فرم و جدول)
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- بخش فرم (یک ستون) -->
      <div class="lg:col-span-1">
        <h2 class="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <span
            class="bg-blue-600 text-white w-6 h-6 rounded-full flex justify-center items-center text-sm ml-2"
            >+</span
          >
          افزودن کاربر جدید
        </h2>
        <DynamicForm
          :schema="userSchema"
          v-model="formData"
          @submit="handleSubmit"
        />
      </div>

      <!-- بخش جدول (دو ستون) -->
      <div class="lg:col-span-2">
        <h2 class="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <span
            class="bg-gray-700 text-white w-6 h-6 rounded-full flex justify-center items-center text-sm ml-2"
            >≡</span
          >
          لیست کاربران سیستم
        </h2>
        <DataTable
          :headers="tableHeaders"
          :items="usersList"
          :isLoading="isLoading"
        />
      </div>
    </div>
  </div>
</template>
