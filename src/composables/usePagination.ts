import { ref, computed } from 'vue'

export function usePagination(initialPage = 1, initialLimit = 10) {
    const currentPage = ref(initialPage)
    const limit = ref(initialLimit)
    const totalItems = ref(0)

    // محاسبه خودکار تعداد کل صفحات
    const totalPages = computed(() => {
        return Math.ceil(totalItems.value / limit.value) || 1
    })

    // محاسبه Offset برای ارسال به API (در صورت نیاز بک‌اند)
    const offset = computed(() => {
        return (currentPage.value - 1) * limit.value
    })

    const setPage = (page: number) => {
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page
        }
    }

    const setTotalItems = (total: number) => {
        totalItems.value = total
    }

    const setLimit = (newLimit: number) => {
        limit.value = newLimit
        currentPage.value = 1 // بازگشت به صفحه اول هنگام تغییر سایز صفحات
    }

    return {
        currentPage,
        limit,
        totalItems,
        totalPages,
        offset,
        setPage,
        setTotalItems,
        setLimit
    }
}