<script setup lang="ts">
import type { SelectOption } from "../types/form";

defineProps<{
  label: string;
  options?: SelectOption[];
  required?: boolean;
}>();

const model = defineModel<string | number>();
</script>

<template>
  <div class="mb-4">
    <label class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <select
      v-model="model"
      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
    >
      <!-- آپشن پیش‌فرض -->
      <option :value="undefined" disabled>انتخاب کنید...</option>
      <!-- رندر آپشن‌های داینامیک -->
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>
