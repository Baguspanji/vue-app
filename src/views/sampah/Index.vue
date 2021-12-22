<template>
  <div class="container page">
    <div class="card shadow border-1">
      <div class="card-body">
        <h1 class="title">
          Selamat Datang
          <router-link
            :to="{ name: 'sampah.add' }"
            class="btn btn-primary btn-sm float-right"
            ><i class="bi bi-plus-lg"></i> Tambah Data</router-link
          >
        </h1>
        <hr />

        <vue-bootstrap4-table :rows="rows" :columns="columns" :config="config">
          <template slot="aksi" slot-scope="rows">
            <button
              class="btn btn-warning mr-2"
              @click="onEdit(rows)"
            >
              Edit
            </button>
            <button
              class="btn btn-info"
              @click="onDetail(rows)"
            >
              Detail
            </button>
          </template>
        </vue-bootstrap4-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueBootstrap4Table from "vue-bootstrap4-table";

export default {
  name: "Sampah",
  components: {
    VueBootstrap4Table,
  },
  data() {
    return {
      rows: [
        {
          no: 1,
          kode: "SMP001",
          nama_sampah: "Kardus",
          jenis: "Plastik",
        },
      ],
      columns: [
        {
          label: "#",
          name: "no",
        },
        {
          label: "Kode",
          name: "kode",
        },
        {
          label: "Nama Sampah",
          name: "nama_sampah",
        },
        {
          label: "Jenis",
          name: "jenis",
        },
        {
          label: "Aksi",
          name: "aksi",
        },
      ],
      config: {
        card_title: "Daftar Sampah",
        card_mode: false,
        selected_rows_info: false,
        pagination: true,
        pagination_info: true,
        num_of_visibile_pagination_buttons: 7,
        global_search: {
          placeholder: "Cari Sampah",
          visibility: true,
          case_sensitive: false,
        },
        per_page_options: [10, 20, 30],
        show_refresh_button: false,
        show_reset_button: false,
      },
    };
  },
  methods: {
    async getData() {
      var res = await axios.get(
        "http://147.139.193.105/resik/v1/sampah/listsampah"
      );

      var sampahs = [];
      var no = 1;
      res.data.result.forEach((sampah) => {
        sampahs.push({
          no: no++,
          id: sampah._id,
          kode: sampah.Kode,
          nama_sampah: sampah.Nama,
          jenis: sampah.Jenis.Nama,
          aksi: "",
        });
      });

      this.rows = sampahs;
    },
    onEdit(id) {
      var data = this.output = id;
      console.log(data.row.id)
    },
    onDetail(id) {
      var data = this.output = id;
      console.log(data.row.id)
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
