<template>
  <a :href="product.url" class="product-item">
    <div class="inner">
      <div class="favourite-icon">
        <span v-if="product.isFav">
          <font-awesome-icon :icon="{ prefix: 'fas', iconName: 'heart' }" />
        </span>
        <span v-else>
          <font-awesome-icon :icon="{ prefix: 'far', iconName: 'heart' }"
        /></span>
      </div>
      <div class="thumbnail">
        <img :src="product.picture" alt="" />
      </div>
      <div class="info">
        <div class="inner-wrap">
          <h4 class="product-title">{{ product.name }}</h4>
          <div class="vert-align-center">
            <span class="product-size"> {{ product.size }}</span>

            <span class="product-rating">
              <span v-for="(n, index) in product.rating" :key="index"
                ><font-awesome-icon icon="star"/></span
            ></span>
          </div>
          <div class="product-price">
            <span class="price">{{ product.price }}</span>
            <span v-if="product.oldPrice">
              <span class="old-price">{{ product.oldPrice }} </span>
              <span class="savings">You save {{ product.savings }} </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: "ProductItem",
  props: ["product"],
};
</script>
