<script setup lang="ts">
import type { FormField } from "../types/form";
import BaseInput from "./BaseInput.vue";
import BaseSelect from "./BaseSelect.vue"; // ایمپورت کامپوننت جدید

defineProps<{
  schema: FormField[];
}>();

const formData = defineModel<Record<string, any>>({ default: () => ({}) });

const getComponent = (type: string) => {
  switch (type) {
    case "select":
      return BaseSelect;
    default:
      return BaseInput;
  }
};
</script>

<template>
  <form
    @submit.prevent="$emit('submit', formData)"
    class="bg-white p-6 rounded-lg shadow-md border border-gray-100"
  >
    <div class="space-y-4">
      <template v-for="field in schema" :key="field.name">
        <component
          :is="getComponent(field.type)"
          v-model="formData[field.name]"
          :label="field.label"
          :type="field.type"
          :placeholder="field.placeholder"
          :required="field.required"
          :options="field.options"
          class="w-full"
        />
      </template>
    </div>

    <div class="mt-6">
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        ذخیره اطلاعات
      </button>
    </div>
  </form>
</template>
