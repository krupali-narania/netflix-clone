import { defineStore } from "pinia"

export const useAuthStore = defineStore("auth", {

  state: () => ({
    user: null
  }),

  actions: {

    signup(name, email, password) {

      const user = { name, email, password }

      localStorage.setItem("user", JSON.stringify(user))

      this.user = user
    },

    login(email, password) {

      const storedUser = JSON.parse(localStorage.getItem("user"))

      if (!storedUser) {
        throw new Error("User not found")
      }

      if (
        storedUser.email === email &&
        storedUser.password === password
      ) {
        this.user = storedUser
      } else {
        throw new Error("Invalid credentials")
      }

    },

    logout() {

      this.user = null

      localStorage.removeItem("user")

    },

    loadUser() {

      const user = JSON.parse(localStorage.getItem("user"))

      if (user) {
        this.user = user
      }

    }

  }

})