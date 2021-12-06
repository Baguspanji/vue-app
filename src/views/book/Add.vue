<template>
  <div class="container-fluid">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Add Book</h1>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="card border-0 shadow rounded-3">
          <div class="card-body">
            <h4>Add Sampah</h4>
            <hr />

            <form @submit.prevent="onSave">
              <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="Book Title"
                  v-model="title"
                />
                <p class="text-danger mt-2" v-if="error_message.title">
                  {{ error_message.title[0] }}
                </p>
              </div>
              <div class="mb-3">
                <label for="page" class="form-label">Page</label>
                <input
                  type="number"
                  class="form-control"
                  id="page"
                  placeholder="Nama Sampah"
                  v-model="page"
                />
                <p class="text-danger mt-2" v-if="error_message.page">
                  {{ error_message.page[0] }}
                </p>
              </div>
              <button type="submit" class="btn btn-primary float-end">
                Simpan
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddBook",
  data() {
    return {
      title: "",
      page: "",
      error_message: {
        title: null,
        page: null,
      },
    };
  },
  methods: {
    async onSave() {
      try {
        await axios.post("book", {
          title: this.title,
          page: this.page,
        });

        this.$router.push("/book");
      } catch (error) {
        this.error_message = error.response.data;
      }
    },
  },
};
</script>

<style>
</style>