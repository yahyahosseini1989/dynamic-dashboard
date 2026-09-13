<script setup lang="ts">
export interface TableHeader {
  key: string;
  label: string;
}

defineProps<{
  headers: TableHeader[];
  items: Record<string, any>[];
  isLoading?: boolean;
}>();
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden"
  >
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500" dir="rtl">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 border-b">
          <tr>
            <th
              v-for="header in headers"
              :key="header.key"
              scope="col"
              class="px-6 py-4 font-semibold"
            >
              {{ header.label }}
            </th>
            <!-- ستون عملیات (ویرایش/حذف) برای فازهای بعدی -->
            <th scope="col" class="px-6 py-4 text-center">عملیات</th>
          </tr>
        </thead>
        <tbody>
          <!-- حالت لودینگ -->
          <tr v-if="isLoading">
            <td
              :colspan="headers.length + 1"
              class="px-6 py-8 text-center text-gray-500"
            >
              در حال دریافت اطلاعات...
            </td>
          </tr>

          <!-- حالت خالی بودن لیست -->
          <tr v-else-if="items.length === 0">
            <td
              :colspan="headers.length + 1"
              class="px-6 py-8 text-center text-gray-500"
            >
              هیچ داده‌ای برای نمایش وجود ندارد.
            </td>
          </tr>

          <!-- رندر داینامیک سطرها -->
          <tr
            v-else
            v-for="(item, index) in items"
            :key="index"
            class="bg-white border-b hover:bg-gray-50 transition"
          >
            <td
              v-for="header in headers"
              :key="header.key"
              class="px-6 py-4 whitespace-nowrap text-gray-800"
            >
              {{ item[header.key] }}
            </td>
            <td class="px-6 py-4 text-center space-x-2 space-x-reverse">
              <button class="text-blue-600 hover:text-blue-800 font-medium">
                ویرایش
              </button>
              <button class="text-red-600 hover:text-red-800 font-medium">
                حذف
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
