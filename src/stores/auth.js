import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const isAuthenticated = ref(false)
  
  // Actions
  const login = (userData) => {
    user.value = userData
    isAuthenticated.value = true
  }
  
  const logout = () => {
    user.value = null
    isAuthenticated.value = false
  }
  
  const updateUser = (userData) => {
    if (user.value) {
      user.value = { ...user.value, ...userData }
    }
  }
  
  return {
    // State
    user,
    isAuthenticated,
    
    // Actions
    login,
    logout,
    updateUser
  }
})
