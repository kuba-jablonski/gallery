<template>
  <button v-on="$listeners" :class="btnClasses">
    <template v-if="!loading">
      <slot/>
    </template>
   <div v-if="loading" class="lds-ring"><div></div><div></div><div></div><div></div></div>
  </button>
</template>

<script>
export default {
  props: ["color", "loading"],
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

.lds-ring {
  display: inline-block;
  position: relative;
  width: 3rem;
  height: 3rem;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 3rem;
  height: 3rem;
  border: 2px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
