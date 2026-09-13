import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUsersStore = defineStore('users', () => {
  const usersList = ref<Record<string, any>[]>([])
  const isLoading = ref(false)

  const addUser = async (data: Record<string, any>) => {
    isLoading.value = true
    // در پروژه متصل به بک‌اند واقعی:
    // await useApi().execute({ method: 'POST', url: '/users', data })
    await new Promise(resolve => setTimeout(resolve, 500)) // شبیه‌سازی درخواست
    usersList.value.unshift({ ...data, id: Date.now() })
    isLoading.value = false
  }

  const updateUser = async (id: number, data: Record<string, any>) => {
    isLoading.value = true
    await new Promise(resolve => setTimeout(resolve, 500))
    const index = usersList.value.findIndex(u => u.id === id)
    if (index !== -1) usersList.value[index] = { ...data, id }
    isLoading.value = false
  }

  const deleteUser = async (id: number) => {
    isLoading.value = true
    await new Promise(resolve => setTimeout(resolve, 500))
    usersList.value = usersList.value.filter(u => u.id !== id)
    isLoading.value = false
  }

  return { usersList, isLoading, addUser, updateUser, deleteUser }
})