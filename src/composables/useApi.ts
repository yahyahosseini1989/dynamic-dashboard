import { ref } from 'vue'
import api from '../services/api'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export function useApi<T>() {
    const data = ref<T | null>(null)
    const error = ref<string | null>(null)
    const isLoading = ref(false)

    const execute = async (config: AxiosRequestConfig): Promise<T> => {
        isLoading.value = true
        error.value = null

        try {
            const response: AxiosResponse<T> = await api(config)
            data.value = response.data
            return response.data
        } catch (err: any) {
            error.value = err.response?.data?.message || err.message || 'خطایی در ارتباط با سرور رخ داد'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    return { data, error, isLoading, execute }
}