<template>
  <div class="container">
    <div class="products-bar">
      <div class="total">{{ total }} results</div>
      <div class="filters">
        <div class="filter-field">
          <label>Filter by:</label>
          <vue-picker
            @input="filterType = 'size'"
            v-model="filterOption"
            placeholder="Size"
          >
            <vue-picker-option
              v-for="(size, index) in allSizes"
              :value="size"
              :key="index"
              >{{ size }}</vue-picker-option
            >
          </vue-picker>
          <vue-picker
            @input="filterType = 'rating'"
            v-model="filterOption"
            placeholder="Rating"
          >
            <vue-picker-option
              v-for="(rating, index) in allRates"
              :value="rating.toString()"
              :key="index"
              >{{ rating }} stars</vue-picker-option
            >
          </vue-picker>
        </div>
      </div>
      <div class="vert-align-center">
        <div @click="gridView = !gridView" class="grid-toggle">
          <span v-if="!gridView">
            <font-awesome-icon icon="th" />
          </span>
          <span v-else>
            <font-awesome-icon icon="bars" />
          </span>
        </div>
        <div class="dropdown">
          <vue-picker
            @input="sortArray()"
            v-model="sortedOption"
            value=""
            placeholder="Sorted by"
          >
            <template #opener="{ opener }">
              <span>
                <b>{{ opener.text }}</b>
                <i>{{ opener.value }}</i>
              </span>
            </template>
            <!-- <vue-picker-option text="Sort by: Most Relevant" value=""
              >Most Relevant</vue-picker-option
            > -->
            <vue-picker-option text="Sort by:" value="price"
              >Price</vue-picker-option
            >
            <vue-picker-option text="Sort by:" value="name"
              >Name</vue-picker-option
            >
          </vue-picker>
        </div>
      </div>
    </div>
    <div :class="gridView ? 'grid-view' : 'list-view'" class="products-wrapper">
      <product-item
        v-for="product in filteredData"
        :key="product._id"
        :product="product"
      ></product-item>
    </div>
  </div>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";
import data from "../../data/products.json";

export default {
  name: "ProductList",
  components: {
    ProductItem,
  },
  data() {
    return {
      products: data,
      gridView: true,
      filterValue: "1",
      filterBy: "1",
      sortedOption: "",
      sizes: [],
      filterOption: "",
      filterType: "",
      filter: {
        type: "",
        value: "",
      },
    };
  },
  computed: {
    countProducts: function() {
      return this.products.slice(0, 9);
    },
    total() {
      return this.products.length;
    },
    allSizes() {
      return [...new Set(this.products.map((item) => item.size))].sort();
    },
    allRates() {
      return [...new Set(this.products.map((item) => item.rating))].sort(
        (a, b) => a - b
      );
    },
    filteredData() {
      let type = this.filterType;
      let option = this.filterOption;

      if (type && option) {
        return this.products.filter((item) => item[type] == option);
      }
      return this.products;
    },
  },
  methods: {
    setFilterType(type) {
      this.filterType = type;
    },
    sortArray() {
      this.products.sort((a, b) => {
        a.name - b.name;
      });
    },
    // getPosts() {
    //   fetch("data/products.json");
    //   fetch("https://jsonplaceholder.typicode.com/todos")
    //     .then((response) => response.json())
    //     .then((json) => console.log(json))
    //     .catch((error) => console.log(error));
    // },
  },
  mounted() {
    // this.getPosts();
  },
};
</script>
