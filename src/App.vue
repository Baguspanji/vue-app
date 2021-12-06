<template>
  <div id="app">
    <div>
      <!-- Page Wrapper -->
      <div id="wrapper">
        <Sidebar />

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">
          <!-- Main Content -->
          <div id="content">
            <Nav />

            <router-view />

            <!-- /.container-fluid -->
          </div>
          <!-- End of Main Content -->

          <!-- Footer -->
          <footer class="sticky-footer bg-white">
            <div class="container my-auto">
              <div class="copyright text-center my-auto">
                <span>Copyright &copy; Your Website 2021</span>
              </div>
            </div>
          </footer>
          <!-- End of Footer -->
        </div>
        <!-- End of Content Wrapper -->
      </div>
      <!-- End of Page Wrapper -->

      <!-- Scroll to Top Button-->
      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
      </a>
    </div>
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import Sidebar from "./components/Sidebar.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    Nav,
    Sidebar,
  },
  data() {
    return {
      user: null,
    };
  },
  async created() {
    try {
      const res = await axios.get("user");

      this.$store.dispatch("user", res.data.data);
    } catch (err) {
      console.log(err);
    }
  },
};
</script>
