<template>
  <div>
    <navbar />

      <section
      class="main-content columns"
    >
      <div class="container column is-10">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<style lang="scss">
  @import "~bulma/sass/utilities/_all";
  @import "~bulma-pricingtable";
  $primary: #00c58e;
  $link: $primary;
  .is-active {
    color: $primary !important;
  }
  ::-moz-selection, ::selection{
    color: white;
    background-color: $primary;
  }
  #settings:hover, #settings.rotated {
    color: $primary;
  }
  /*nuxt { overflow: -moz-scrollbars-none !important;}
  nuxt::-webkit-scrollbar { width: 0 !important }*/
  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>
<script>
import navbar from '../components/NavBar'
export default {
  components: {
    navbar
  },
  data () {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' }
        }
      ]
    }
  }
}
</script>
