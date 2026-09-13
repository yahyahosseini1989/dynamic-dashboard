<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import DynamicForm from '../components/DynamicForm.vue'
import DataTable from '../components/DataTable.vue'
import type { FormField } from '../types/form'
import { useUsersStore } from '../store/users'

const usersStore = useUsersStore()
const { usersList, isLoading } = storeToRefs(usersStore)

const userSchema: FormField[] = [
  { name: 'firstName', label: 'نام', type: 'text', required: true, placeholder: 'مثلاً یحیی' },
  { name: 'lastName', label: 'نام خانوادگی', type: 'text', required: true },
  { name: 'age', label: 'سن', type: 'number' },
  {
    name: 'role',
    label: 'نقش سازمانی',
    type: 'select',
    required: true,
    options: [
      { label: 'مدیر ارشد', value: 'Admin' },
      { label: 'توسعه‌دهنده', value: 'Developer' },
      { label: 'پشتیبان', value: 'Support' }
    ]
  }
]

const tableHeaders = [
  { key: 'firstName', label: 'نام' },
  { key: 'lastName', label: 'نام خانوادگی' },
  { key: 'age', label: 'سن' },
  { key: 'role', label: 'نقش سازمانی' }
]

const formData = ref<Record<string, any>>({})
const editingId = ref<number | null>(null)

const formTitle = computed(() => editingId.value ? 'ویرایش اطلاعات کاربر' : 'افزودن کاربر جدید')

const handleSubmit = async (data: Record<string, any>) => {
  if (editingId.value) {
    await usersStore.updateUser(editingId.value, data)
    editingId.value = null
  } else {
    await usersStore.addUser(data)
  }
  formData.value = {} 
}

const handleEdit = (item: Record<string, any>) => {
  formData.value = { ...item }
  editingId.value = item.id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleDelete = async (item: Record<string, any>) => {
  if (confirm(`آیا از حذف ${item.firstName} ${item.lastName} اطمینان دارید؟`)) {
    await usersStore.deleteUser(item.id)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50/50 p-8">
    <div class="max-w-7xl mx-auto" dir="rtl">
      <header class="mb-8 flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-800 tracking-tight">پنل مدیریت کاربران</h1>
        <div class="text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
          تعداد کل: <span class="font-bold text-indigo-600">{{ usersList.length }}</span>
        </div>
      </header>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-1">
          <div class="sticky top-8">
            <h2 class="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <span class="bg-indigo-600 text-white w-2 h-6 rounded-full inline-block"></span>
              {{ formTitle }}
            </h2>
            <!-- افزودن افکت شیشه‌ای (Glassmorphism) به پس‌زمینه فرم -->
            <div class="backdrop-blur-sm bg-white/90 rounded-xl shadow-sm border border-gray-100 p-1">
              <DynamicForm 
                :schema="userSchema" 
                v-model="formData" 
                @submit="handleSubmit" 
              />
            </div>
            <!-- دکمه انصراف از ویرایش -->
            <button 
              v-if="editingId" 
              @click="editingId = null; formData = {}" 
              class="w-full mt-3 text-gray-500 hover:text-gray-700 text-sm py-2 transition"
            >
              انصراف از ویرایش
            </button>
          </div>
        </div>

        <div class="lg:col-span-2">
          <h2 class="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span class="bg-gray-800 text-white w-2 h-6 rounded-full inline-block"></span>
            لیست کاربران سیستم
          </h2>
          <DataTable 
            :headers="tableHeaders" 
            :items="usersList" 
            :isLoading="isLoading"
            @edit="handleEdit"
            @delete="handleDelete"
          />
        </div>
      </div>
    </div>
  </div>
</template>