<template>
  <div class="container-fluid page">
    <div class="card shadow border-1">
      <div class="card-body">
        <h1 class="title">Selamat Datang</h1>
        <hr />
        <form @submit.prevent="postData()">
          <div class="form-group">
            <label for="nama_sampah">Nama Sampah</label>
            <input
              type="text"
              class="form-control"
              id="nama_sampah"
              placeholder="Masukkan Nama Sampah"
              v-model="namaSampah"
            />
          </div>
          <div class="form-group">
            <label for="jenis_sampah">Jenis Sampah</label>
            <select
              class="form-control"
              id="jenis_sampah"
              v-model="jenisSampah"
            >
              <option value="">Pilih Jenis Sampah</option>
              <option
                v-for="jenis in jenisSampahs"
                v-bind:key="jenis._id"
                v-bind:value="jenis.Kode"
              >
                {{ jenis.Nama }}
              </option>
            </select>
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
      jenisSampahs: null,
      jenisSampah: "",
      namaSampah: "",
    };
  },
  methods: {
    async getData() {
      var res = await axios.post('jenissampah/list');

      this.jenisSampahs = res.data.result;
    },
    async postData() {
      var res = await axios.post(
        'sampah/add',
        {
          nama: this.namaSampah,
          jenis: this.jenisSampah,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (res.data.hasil) {
        this.$router.push("/sampah");
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
