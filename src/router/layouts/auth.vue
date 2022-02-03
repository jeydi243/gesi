<script>
export default {
  name: "layout-auth",
};
</script>

<template>
  <div v-bind="$attrs">
    <div class="h-full">
      <slot />
    </div>
  </div>
</template>
