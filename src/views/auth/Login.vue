<template>
  <div class="row auth justify-content-center">
    <div class="col-md-4 col-sm-6 col-8">
      <div class="card border-0 shadow rounded-3">
        <div class="card-body">
          <div class="alert alert-danger text-center" v-if="error">Unauthorized</div>

          <form @submit.prevent="handleAuth">
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="username"
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="password"
              />
            </div>
            <button type="submit" class="btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async handleAuth() {
      try {
        const res = await axios.post("http://localhost:8000/api/auth/login", {
          username: this.username,
          password: this.password,
        });

        localStorage.setItem("token", res.data.data.access_token);
        this.$store.dispatch("user", res.data.data.user);
        this.$router.push("/");
      } catch (err) {
        this.error = err;
      }
    },
  },
};
</script>

<style>
</style>