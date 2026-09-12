<script setup lang="ts">
defineProps<{
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}>();

const model = defineModel<string | number>();
</script>

<template>
  <div class="mb-4">
    <label class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      v-model="model"
      :type="type || 'text'"
      :placeholder="placeholder"
      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition"
    />
  </div>
</template>
