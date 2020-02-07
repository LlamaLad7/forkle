<template>
  <b-navbar fixed-top>
    <template slot="brand">
      <b-navbar-item :to="{ path: '/' }" exact-active-class="is-active" tag="nuxt-link">
        <span class="is-size-4"><strong>Forkle</strong></span>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item v-for="page in pages" :key="page.name" :to="'/' + page.path" exact-active-class="is-active" tag="nuxt-link">
        {{ page.name }}
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-dropdown @active-change="(active) => settingsVisible = active" position="is-bottom-left" aria-role="menu" trap-focus>
        <a
          class="navbar-item"
          :class="{rotated: settingsVisible}"
          id="settings"
          slot="trigger"
          role="button">
          <b-icon pack="mdi" icon="settings"></b-icon>
        </a>

        <b-dropdown-item
          aria-role="menu-item"
          :focusable="false"
          custom
          paddingless>
          <form action="">
            <div class="modal-card" style="width:300px;">
              <section class="modal-card-body" style="padding-top: 0.75em !important; ">
                <strong class="is-size-4" style="padding-top: -5em">Settings</strong>
                <br>
                <b-checkbox v-model="autocomplete" style="padding-top: 0.75em">Autocomplete</b-checkbox>
              </section>
            </div>
          </form>
        </b-dropdown-item>
      </b-dropdown>
    </template>
    </div>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      pages: [
        { name: 'Features', path: 'features' },
        { name: 'Pricing', path: 'new-pricing' }
      ],
      settingsVisible: false
    }
  },
  computed: {
    autocomplete: {
      get () {
        return this.$store.state.settings.autocomplete
      },
      set (value) {
        this.$store.commit('set', ['autocomplete', value])
      }
    }
  }
}
</script>

<style scoped lang="scss">
  $rotateThing: .2s ease-in-out;
  $rotation: -45deg;
  #settings:hover {
    background-color: initial;
  }
  #settings {
    -webkit-transition: -webkit-transform $rotateThing;
    -ms-transition: -ms-transform $rotateThing;
    transition: transform $rotateThing;
  }
  #settings.rotated {
    transform:rotate($rotation);
    -ms-transform:rotate($rotation);
    -webkit-transform:rotate($rotation);
  }
</style>
