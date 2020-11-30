<template>
  <div class="container">
    <div class="product-bar">
      <header class="product-bar-header">
        <div class="total">{{ productsTotal }} results</div>
        <div class="vert-align-center">
          <div @click="gridView = !gridView" class="grid-toggle">
            <span v-if="!gridView">
              <font-awesome-icon icon="th" />
            </span>
            <span v-else>
              <font-awesome-icon icon="bars" />
            </span>
          </div>
        </div>
      </header>
      <div class="filters">
        <div class="filter-field">
          <label>Size:</label>
          <vue-picker placeholder="Select size" v-model="filters.size">
            <vue-picker-option value="">Any</vue-picker-option>
            <vue-picker-option
              v-for="(size, index) in allSizes"
              :value="size"
              :key="index"
              >{{ size }}</vue-picker-option
            >
          </vue-picker>
        </div>
        <div class="filter-field">
          <label>Rating:</label>
          <vue-picker v-model="filters.rating" placeholder="Select rating">
            <vue-picker-option value="">Any</vue-picker-option>
            <vue-picker-option
              v-for="(rating, index) in allRates"
              :value="rating.toString()"
              :key="index"
              >{{ rating }} stars</vue-picker-option
            >
          </vue-picker>
        </div>
        <div class="filter-field price">
          <label>Prise:</label>
          <div class="space-between">
            <input
              v-model.lazy="filters.priceMin"
              type="number"
              class="inp"
              placeholder="Min."
              min="0"
            />
            <input
              v-model.lazy="filters.priceMax"
              type="number"
              class="inp"
              placeholder="Max."
              min="0"
            />
          </div>
        </div>
        <div class="filter-field">
          <label>Sort by:</label>
          <vue-picker v-model="sortParam" placeholder="Select sorting">
            <vue-picker-option value="">Default</vue-picker-option>
            <vue-picker-option value="price-asc"
              >Price: Low - High</vue-picker-option
            >
            <vue-picker-option value="price-desc"
              >Price: High - Low</vue-picker-option
            >
            <vue-picker-option value="name-asc">Name: A - Z</vue-picker-option>
          </vue-picker>
        </div>
      </div>
    </div>
    <div class="align-center" v-if="loading">
      <div class="lds-dual-ring"></div>
    </div>
    <div
      v-if="filteredData.length"
      :class="gridView ? 'grid-view' : 'list-view'"
      class="products-wrapper"
    >
      <product-item
        v-for="product in filteredData"
        :key="product._id"
        :product="product"
      ></product-item>
    </div>
    <div v-if="!loading && !filteredData.length" class="align-center not-found">
      {{ status }}
    </div>
  </div>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";

export default {
  name: "ProductList",
  components: {
    ProductItem,
  },
  data() {
    return {
      products: [],
      gridView: true,
      loading: true,
      status: "",
      filters: {
        size: "",
        rating: "",
        priceMin: "",
        priceMax: "",
      },
      sortParam: "",
    };
  },
  computed: {
    allSizes() {
      return [...new Set(this.products.map((item) => item.size))].sort();
    },
    allRates() {
      return [...new Set(this.products.map((item) => item.rating))].sort(
        (a, b) => a - b
      );
    },
    filteredData() {
      let filters = this.filters;
      let fData = this.products;
      for (let type in filters) {
        if (filters[type]) {
          switch (type) {
            case "priceMin":
              fData = fData.filter((item) => item.price >= +filters[type]);
              break;
            case "priceMax":
              fData = fData.filter((item) => item.price <= +filters[type]);
              break;
            default:
              fData = fData.filter((item) => item[type] == filters[type]);
          }
        }
      }
      if (this.sortParam) {
        return fData.sort(this.sortedFunc);
      }
      return fData;
    },
    productsTotal() {
      return this.filteredData.length;
    },
  },
  methods: {
    sortedFunc(a, b) {
      let sort = this.sortParam.split("-")[0];
      let order = this.sortParam.split("-")[1];
      let comparison = 0;
      const productA = a[sort];
      const productB = b[sort];
      if (order === "asc") {
        if (productA > productB) {
          comparison = 1;
        } else if (productA < productB) {
          comparison = -1;
        }
      } else {
        if (productA < productB) {
          comparison = 1;
        } else if (productA > productB) {
          comparison = -1;
        }
      }
      return comparison;
    },
    getProducts() {
      fetch("/data/products.json")
        .then((response) => response.json())
        .then((data) =>
          data.map((product) => {
            product.price = +product.price.slice(1);
            return product;
          })
        )
        .then((products) => {
          this.products = products;
          this.status = "No products found";
        })
        .catch((error) => {
          console.log(error);
          this.status = "Something went wrong... Please try again later";
        })
        .finally((this.loading = false));
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
