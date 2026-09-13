import { describe, it, expect } from 'vitest'
import { usePagination } from './usePagination'

describe('usePagination Composable', () => {
  it('باید تعداد صفحات را به درستی بر اساس آیتم‌ها محاسبه کند', () => {
    const { totalPages, setTotalItems } = usePagination(1, 10)
    
    setTotalItems(25) // ۲۵ آیتم با محدودیت ۱۰ تا در هر صفحه
    
    expect(totalPages.value).toBe(3) // انتظار داریم ۳ صفحه ایجاد شود
  })

  it('نباید اجازه دهد صفحه فعلی از محدوده مجاز خارج شود', () => {
    const { currentPage, setTotalItems, setPage } = usePagination(1, 10)
    
    setTotalItems(20) // مجموعاً ۲ صفحه داریم
    
    setPage(5) // درخواست غیرمجاز
    expect(currentPage.value).toBe(1) // باید روی همان صفحه اول بماند
    
    setPage(2) // درخواست مجاز
    expect(currentPage.value).toBe(2)
  })
})