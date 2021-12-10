<template>
  <div class="container-fluid mb-5">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Add Admin</h1>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="card border-0 shadow rounded-3">
          <div class="card-body">
            <h4>Add Admin</h4>
            <hr />

            <form @submit.prevent="onSave">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="Masukkan Username"
                  v-model="username"
                />
              </div>
              <div class="mb-3">
                <label for="fullname" class="form-label">Nama Lengkap</label>
                <input
                  type="text"
                  class="form-control"
                  id="fullname"
                  placeholder="Masukkan Nama Lengkap"
                  v-model="fullName"
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Masukkan Email"
                  v-model="email"
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Masukkan Password"
                  v-model="password"
                />
              </div>
              <div class="mb-3">
                <label for="nomor" class="form-label">Nomor Telephon</label>
                <input
                  type="number"
                  class="form-control"
                  id="nomor"
                  placeholder="Masukkan Nomor Telephon"
                  v-model="nomorTelpon"
                />
              </div>
              <div class="form-group">
                <label for="provinsi">Provinsi</label>
                <select
                  class="form-control"
                  id="provinsi"
                  v-model="provinsi"
                  @change="onKota"
                >
                  <option value="">Pilih Provinsi</option>
                  <option
                    v-for="prov in provinsiData"
                    v-bind:key="prov._id"
                    v-bind:value="prov.Kode"
                  >
                    {{ prov.Provinsi }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="kota">Kota</label>
                <select
                  class="form-control"
                  id="kota"
                  v-model="kota"
                  @change="onKecamatan"
                >
                  <option value="">Pilih Kota</option>
                  <option
                    v-for="kota in kotaData"
                    v-bind:key="kota._id"
                    v-bind:value="kota.Kode"
                  >
                    {{ kota.Kota }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="kecamatan">Kecamatan</label>
                <select
                  class="form-control"
                  id="kecamatan"
                  v-model="kecamatan"
                  @change="onDesa"
                >
                  <option value="">Pilih Kecamatan</option>
                  <option
                    v-for="kecamatan in kecamatanData"
                    v-bind:key="kecamatan._id"
                    v-bind:value="kecamatan.Kode"
                  >
                    {{ kecamatan.Kecamatan }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="desa">Desa</label>
                <select class="form-control" id="desa" v-model="desa">
                  <option value="">Pilih Desa</option>
                  <option
                    v-for="desa in desaData"
                    v-bind:key="desa._id"
                    v-bind:value="desa.Kode"
                  >
                    {{ desa.Desa }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="bank_sampah">Bank Sampah</label>
                <select class="form-control" id="bank_sampah" v-model="banksampah">
                  <option value="">Pilih Bank Sampah</option>
                  <option
                    v-for="bs in bangSampahData"
                    v-bind:key="bs._id"
                    v-bind:value="bs.Kode"
                  >
                    {{ bs.Nama }}
                  </option>
                </select>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary w-50">
                  Simpan
                </button>
              </div>
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
  name: "AddAdmin",
  data() {
    return {
      username: "",
      fullName: "",
      password: "",
      email: "",
      nomorTelpon: "",
      provinsi: "",
      kota: "",
      kecamatan: "",
      desa: "",
      banksampah: "",
      provinsiData: [],
      kotaData: [],
      kecamatanData: [],
      desaData: [],
      bangSampahData: [],
    };
  },
  mounted() {
    this.onProvinsi();
    this.onBankSampah();
  },
  methods: {
    async onSave() {
      try {
        await axios.post("admin/register", {
          username: this.username,
          fullName: this.fullName,
          password: this.password,
          email: this.email,
          nomorTelpon: this.nomorTelpon,
          provinsi: this.provinsi,
          kota: this.kota,
          kecamatan: this.kecamatan,
          desa: this.desa,
          banksampah: this.banksampah,
        });

        this.$router.push("/admin");
      } catch (error) {
        this.error_message = error.response.data;
      }
    },
    async onProvinsi() {
      try {
        var res = await axios.get("provinsi/list");

        this.provinsiData = res.data.result;
      } catch (error) {
        this.error_message = error.response.data;
      }
    },
    async onKota() {
      try {
        var res = await axios.post("kota/listkotabyprovinsi", {
          provinsi: this.provinsi,
        });

        this.kotaData = res.data.result;
      } catch (error) {
        this.error_message = error.response.data;
      }
    },
    async onKecamatan() {
      try {
        var res = await axios.post("kecamatan/listkecamatanbykota", {
          provinsi: this.provinsi,
          kota: this.kota,
        });

        this.kecamatanData = res.data.result;
      } catch (error) {
        this.error_message = error.response.data;
      }
    },
    async onDesa() {
      try {
        var res = await axios.post("desa/listdesabykecamatan", {
          provinsi: this.provinsi,
          kota: this.kota,
          kecamatan: this.kecamatan,
        });

        this.desaData = res.data.result;
      } catch (error) {
        this.error_message = error.response.data;
      }
    },
    async onBankSampah() {
      try {
        var res = await axios.get("banksampah/list");

        this.bangSampahData = res.data.result;
      } catch (error) {
        this.error_message = error.response.data;
      }
    },
  },
};
</script>

<style>
</style>