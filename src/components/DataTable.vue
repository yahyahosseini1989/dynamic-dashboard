<script setup lang="ts">
export interface TableHeader {
  key: string
  label: string
}

defineProps<{
  headers: TableHeader[]
  items: Record<string, any>[]
  isLoading?: boolean
}>()

// تعریف رویدادهای خروجی جدول
defineEmits<{
  (e: 'edit', item: Record<string, any>): void
  (e: 'delete', item: Record<string, any>): void
}>()
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-600" dir="rtl">
        <thead class="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-100">
          <tr>
            <th v-for="header in headers" :key="header.key" scope="col" class="px-6 py-4 font-semibold tracking-wider">
              {{ header.label }}
            </th>
            <th scope="col" class="px-6 py-4 text-center font-semibold tracking-wider">عملیات</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr v-if="isLoading">
            <td :colspan="headers.length + 1" class="px-6 py-8 text-center text-gray-400">
              <span class="animate-pulse">در حال به‌روزرسانی...</span>
            </td>
          </tr>
          
          <tr v-else-if="items.length === 0">
            <td :colspan="headers.length + 1" class="px-6 py-12 text-center text-gray-400">
              هیچ داده‌ای یافت نشد.
            </td>
          </tr>

          <tr v-else v-for="(item, index) in items" :key="item.id || index" class="hover:bg-blue-50/30 transition-colors duration-200">
            <td v-for="header in headers" :key="header.key" class="px-6 py-4 whitespace-nowrap">
              {{ item[header.key] }}
            </td>
            <td class="px-6 py-4 text-center space-x-2 space-x-reverse">
              <!-- دکمه‌های مدرن با استایل Soft -->
              <button @click="$emit('edit', item)" class="text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">ویرایش</button>
              <button @click="$emit('delete', item)" class="text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">حذف</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>