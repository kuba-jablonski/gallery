<template>
  <button v-on="$listeners" :class="btnClasses">
    <slot/>
  </button>
</template>

<script>
export default {
  props: ["color"],
  computed: {
    btnClasses() {
      return {
        btn: true,
        "btn--success": this.color === "success",
        "btn--error": this.color === "error"
      };
    }
  }
};
</script>


<style lang="scss" scoped>
.btn {
  padding: 1rem 3rem;
  position: relative;
  font-family: inherit;
  font-size: 1.6rem;
  border: none;
  outline: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  min-width: 20rem;
  height: 4.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;

  &--success {
    background-color: $color-success;

    &:hover {
      background-color: $color-success-light;
    }
  }

  &--error {
    background-color: $color-error;

    &:hover {
      background-color: $color-error-light;
    }
  }
}
</style>
