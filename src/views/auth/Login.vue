<template>
  <div class="row auth justify-content-center auth">
    <div class="col-md-4 col-sm-6 col-8">
      <div class="card border-0 shadow rounded-3">
        <div class="card-body">
          <div class="alert alert-danger text-center" v-if="error">
            Unauthorized
          </div>

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
        const res = await axios.post("admin/login", {
          username: this.username,
          password: this.password,
        });

        if (res.data.hasil) {
          const response = await axios.get("admin/get", {
            headers: { Authorization: res.data.token },
          });

          this.$store.dispatch("user", res.data);
          this.$store.dispatch("level", response.data.result.Level);

          var store = {
            token: res.data.token,
            role: "",
          };

          if (response.data.result.Level == 1) {
            store.role = "super_admin";
          } else if (response.data.result.Level == 2) {
            store.role = "admin";
          }

          window.localStorage.setItem("lbUser", JSON.stringify(store));

          this.$router.push("/");
        } else {
          return alert("Login gagal");
        }
      } catch (err) {
        this.error = err;
      }
    },
  },
};
</script>

<style>
.auth {
  padding-top: 140px;
}
</style>