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
                    :to="{ name: 'admin.add' }"
                    class="btn btn-primary float-right"
                    ><i class="fas fa-plus-circle"></i> Add Sampah</router-link
                >
                </h4>
                <hr />

                <table class="table table-bordered">
                <thead class="text-center">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Nomor</th>
                    <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr v-for="(admin, index) in admins" :key="index">
                    <th>
                        {{ index + 1 }}
                    </th>
                    <td>{{ admin.Username }}</td>
                    <td>{{ admin.Fullname }}</td>
                    <td>{{ admin.Email }}</td>
                    <td>{{ admin.NomorTelpon }}</td>
                    <td>
                        <a
                        href="javascript:void(0)"
                        class="btn btn-sm btn-warning mr-2"
                        ><i class="fas fa-pen"></i
                        ></a>
                        <a
                        href="javascript:void(0)"
                        class="btn btn-sm btn-danger"
                        ><i class="fas fa-trash"></i
                        ></a>
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Admin",
    data() {
        return {
            admins: [],
        };
    },
    methods: {
        async getData() {
            const res = await axios.get("admin/list");

            this.admins = res.data.result;
        },
    },
    mounted() {
        this.getData();
    },
};
</script>