// src/store/auth.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '../types/auth';

export const useAuthStore = defineStore('auth', () => {
    // === State ===
    const user = ref<User | null>(null);
    const token = ref<string | null>(localStorage.getItem('token') || null);

    // === Getters ===
    const isAuthenticated = computed(() => !!token.value);
    const isAdmin = computed(() => user.value?.role === 'admin');

    // === Actions ===
    const login = async (username: string, password: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username === 'admin' && password === 'admin123') {
                    const mockToken = 'mock-jwt-token-12345';
                    const mockUser: User = {
                        id: 1,
                        name: 'یحیی حسینی',
                        username: 'admin',
                        role: 'admin'
                    };

                    token.value = mockToken;
                    user.value = mockUser;
                    localStorage.setItem('token', mockToken);
                    resolve();
                } else {
                    reject(new Error('نام کاربری یا رمز عبور اشتباه است'));
                }
            }, 1000);
        });
    };

    const logout = () => {
        user.value = null;
        token.value = null;
        localStorage.removeItem('token');
    };

    return {
        user,
        token,
        isAuthenticated,
        isAdmin,
        login,
        logout
    };
});