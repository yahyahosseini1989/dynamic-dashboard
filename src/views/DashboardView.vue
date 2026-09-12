<script setup lang="ts">
import { ref } from "vue";
import DynamicForm from "../components/DynamicForm.vue";
import type { FormField } from "../types/form";

// تعریف ساختار فرم به صورت داینامیک (Schema)
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
    options: [
      { label: "مدیر ارشد", value: "admin" },
      { label: "توسعه‌دهنده", value: "developer" },
    ],
  },
];

// استیت برای نگهداری مقادیر فرم
const formData = ref({});

const handleSubmit = (data: Record<string, any>) => {
  console.log("فرم با موفقیت ارسال شد:", data);
  alert("اطلاعات در کنسول ثبت شد! خروجی زنده را در باکس مشکی ببینید.");
};
</script>

<template>
  <div class="p-8 max-w-4xl mx-auto" dir="rtl">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">
      داشبورد مدیریت - تست فرم‌ساز پویا
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- بخش فرم -->
      <div>
        <DynamicForm
          :schema="userSchema"
          v-model="formData"
          @submit="handleSubmit"
        />
      </div>

      <!-- بخش نمایش زنده داده‌ها -->
      <div
        class="bg-gray-800 text-green-400 p-6 rounded-lg shadow-inner h-fit border border-gray-700"
      >
        <h3 class="text-white mb-4 font-semibold border-b border-gray-600 pb-2">
          خروجی زنده داده‌ها (JSON)
        </h3>
        <pre class="text-sm font-mono text-left" dir="ltr">{{ formData }}</pre>
      </div>
    </div>
  </div>
</template>
