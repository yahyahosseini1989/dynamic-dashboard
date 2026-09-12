import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.example.com/v1', // فعلا یک آدرس فرضی قرار می‌دهیم
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// اینترسپتور برای افزودن توکن به درخواست‌ها (برای فاز احراز هویت)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// اینترسپتور برای هندل کردن خطاهای سراسری (مثل خطای 401)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // بعدا منطق خروج کاربر و ریدایرکت به لاگین را اینجا می‌نویسیم
            console.log('Unauthorized, redirecting to login...');
        }
        return Promise.reject(error);
    }
);

export default api;