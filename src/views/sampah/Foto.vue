<template>
  <div class="container-fluid page">
    <div class="card shadow border-1 col-6">
      <div class="card-body">
        <h1 class="title">Selamat Datang</h1>
        <hr />
        <form @submit.prevent="postData()">
          <div class="row mb-3">
            <div class="custom-file col-8 mr-5">
              <input
                type="file"
                class="custom-file-input"
                accept="image/*"
                @change="uploadImage($event)"
                id="file-input"
              />
              <label class="custom-file-label" for="customFile"
                >Choose file</label
              >
            </div>
            <div class="col-2">
              <img :src="previewImage" class="uploading-image mb-3" />
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      file: null,
      previewImage: null,
    };
  },
  methods: {
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.file = image;
        this.previewImage = e.target.result;
        // console.log(this.previewImage);
      };
    },
    async postData() {
      let data = new FormData();
      data.append("photos", this.file);

      var res = await axios.post(
        "sampah/imagessampah/" + this.$route.params.id,
        data,
        {
          headers: {
            Authorization: JSON.parse(window.localStorage.getItem('lbUser')).token
          },
        }
      );

      if (res.data.hasil) {
        this.$router.push("/sampah");
      }
    },
  },
};
</script>

<style>
.uploading-image {
  display: flex;
  width: 100px;
}
</style>