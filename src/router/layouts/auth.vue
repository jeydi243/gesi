<script>
export default {
  name: "layout-auth",
  components: {}
};
</script>

<template>
  <div v-bind="$attrs">
    <div class="my-5 pt-5">
      <div class="container bg-red-600">
        <slot />
      </div>
    </div>
  </div>
</template>
