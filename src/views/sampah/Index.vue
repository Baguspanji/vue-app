<template>
  <!-- Begin Page Content -->
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">List Sampah</h1>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 shadow rounded-3">
          <div class="card-body">
            <h4>
              List Sampah

              <router-link
                :to="{ name: 'sampah.add' }"
                class="btn btn-primary float-right"
                ><i class="fas fa-plus-circle"></i> Add Sampah</router-link
              >
            </h4>
            <hr />

            <table class="table table-bordered">
              <thead class="text-center">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Page</th>
                  <th scope="col">Author</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr v-for="(sampahsData, index) in sampahs" :key="index">
                  <th>
                    {{ index + 1 + (nowPage > 1 ? (nowPage - 1) * 10 : 0) }}
                  </th>
                  <td>{{ sampahsData.Kode }}</td>
                  <td>{{ sampahsData.Nama }}</td>
                  <td>{{ sampahsData.Jenis.Kode }}</td>
                  <td>
                    <a
                      href="javascript:void(0)"
                      class="btn btn-sm btn-warning mr-2"
                      ><i class="fas fa-pen"></i
                    ></a>
                    <a
                      href="javascript:void(0)"
                      class="btn btn-sm btn-danger"
                      @click="onDelete(book._id)"
                      ><i class="fas fa-trash"></i
                    ></a>
                  </td>
                </tr>
              </tbody>
            </table>

            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-end">
                <li class="page-item disabled" v-if="nowPage == 1">
                  <a
                    class="page-link"
                    @click="handlePage(nowPage - 1)"
                    href="javascript:void(0)"
                    >Previous</a
                  >
                </li>
                <li class="page-item" v-if="nowPage > 1">
                  <a
                    class="page-link"
                    @click="handlePage(nowPage - 1)"
                    href="javascript:void(0)"
                    >Previous</a
                  >
                </li>
                <div v-for="index in pages" :key="index">
                  <li class="page-item active" v-if="nowPage == index">
                    <a class="page-link" href="#">{{ index }}</a>
                  </li>
                  <li class="page-item" v-if="nowPage != index">
                    <a
                      class="page-link"
                      @click="handlePage(index)"
                      href="javascript:void(0)"
                      >{{ index }}</a
                    >
                  </li>
                </div>
                <li class="page-item disabled" v-if="nowPage == pages">
                  <a
                    class="page-link"
                    @click="handlePage(nowPage + 1)"
                    href="javascript:void(0)"
                    >Next</a
                  >
                </li>
                <li class="page-item" v-if="nowPage < pages">
                  <a
                    class="page-link"
                    @click="handlePage(nowPage + 1)"
                    href="javascript:void(0)"
                    >Next</a
                  >
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Sampah",
  data() {
    return {
      sampahs: [],
      sampahsData: [],
      pages: 1,
      nowPage: 1,
    };
  },
  methods: {
    async getData() {
      const res = await axios.get('sampah/listsampah');

      var page = res.data.result.length;
      page = String(page / 10);
      const arrNo = page.split(".");

      this.pages = parseInt(arrNo[0]) < 18 ? parseInt(arrNo[0]) + 1 : 0;
      this.nowPage = 1;

      this.sampahsData = res.data.result;
      this.sampahs = [];
      for (let i = 0; i < 10; i++) {
        if (res.data.result[i]) {
          this.sampahs.push(res.data.result[i]);
        }
      }
    },
    handlePage(index) {
      var last = index * 10 - 10;

      this.sampahs = [];
      const data = this.sampahsData;

      for (let i = 0; i < 10; i++) {
        if (data[last]) {
          this.sampahs.push(data[last]);
          last++;
        }
      }

      this.nowPage = index;
    },
    onDelete(id) {
      axios.delete(`book/${id}`);

      this.getData();
    },
  },
  mounted() {
    this.getData();
  },
};
</script>