<template>
  <section class="section">
    <div class="columns is-centered is-multiline is-mobile">
      <div class="column is-half" style="text-align: center">
        <strong class="is-size-2">Pricing:</strong>
        <ul>
          <li v-for="(price, tier) in tiers" :key="tier" class="is-size-3">
            <b-radio :native-value="tier" v-model="selected" name="pricing">
              Tier {{ tier }}: £{{ price }} per month
            </b-radio>
          </li>
        </ul>
        <br>
        <b-button :disabled="selected === null" type="is-primary is-large" icon-left="cart">
          Add to Cart
        </b-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Pricing',
  data () {
    return {
      tiers: {
        1: 3,
        2: 5,
        3: 10,
        4: 100
      },
      selected: null
    }
  }
}
</script>

<style scoped>

</style>
