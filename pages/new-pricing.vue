<template>
  <section class="section">
    <div class="pricing-table">
      <div v-for="plan in plans" :key="plan.name" :class="plan.colorclass" class="pricing-plan">
        <div class="plan-header">
          {{ plan.name }}
        </div>
        <div class="plan-price">
          <span class="plan-price-amount"><span class="plan-price-currency">£</span>{{ plan.price }}</span>/month
        </div>
        <div class="plan-items">
          <div v-for="num in mostFeatures" class="plan-item">
            {{ (num-1) &lt; plan.features.length ? plan.features[num-1] : '-' }}
          </div>
        </div>
        <div class="plan-footer">
          <button :disabled="selected === plan.name" @click="selected = plan.name" class="button is-fullwidth">
            {{ selected === plan.name ? 'Selected' : 'Select' }}
          </button>
        </div>
      </div>
    </div>
    <br>
    <div class="columns is-centered">
      <div class="column is-half" style="text-align: center">
        <b-button :disabled="selected === null" @click="notify" type="is-secondary is-large" icon-left="cart">
          Add to Cart
        </b-button>
      </div>
    </div>
  </section>
</template>

<script>
function getMost (plans) {
  let most = 0
  for (const plan of plans) {
    if (plan.features.length > most) {
      most = plan.features.length
    }
  }
  return most
}
const plans = [{
  name: 'Starter',
  price: 3.99,
  colorclass: 'is-primary',
  features: [
    'Support the team!'
  ]
},
{
  name: 'Gold',
  price: 5.99,
  colorclass: 'is-gold',
  features: [
    'Support the team!',
    'Brag to your friends!'
  ]
},
{
  name: 'Diamond',
  price: 9.99,
  colorclass: 'is-diamond',
  features: [
    'Support the team!',
    'Brag to your friends!',
    'Feel rich!'
  ]
}]
export default {
  name: 'Pricing',
  data () {
    return {
      plans,
      mostFeatures: getMost(plans),
      selected: 'Starter',
      hello: false
    }
  },
  methods: {
    notify () {
      this.$buefy.notification.open({
        message: `Added ${this.selected} Plan To Cart`,
        queue: false,
        duration: 4000
      })
    }
  }
}
</script>

<style scoped lang="scss">
  $gold: #ffe51a;
  $gold-hover: adjust_color($gold, $lightness: -7%);
  $diamond: #22dde0;
  $diamond-hover: adjust_color($diamond, $lightness: -7%);
  .pricing-table .pricing-plan .plan-footer .button {
    border-color: transparent;
    color: #fff;
  }
  .pricing-table .pricing-plan.is-gold .plan-price .plan-price-amount {
    color: $gold;
  }
  .pricing-table .pricing-plan.is-gold .plan-footer .button {
    background-color: $gold;
  }
  .pricing-table .pricing-plan.is-gold .plan-footer .button:hover:not([disabled]) {
    background-color: $gold-hover;
  }
  .pricing-table .pricing-plan.is-diamond .plan-price .plan-price-amount {
    color: $diamond;
  }
  .pricing-table .pricing-plan.is-diamond .plan-footer .button {
    background-color: $diamond;
  }
  .pricing-table .pricing-plan.is-diamond .plan-footer .button:hover:not([disabled]) {
    background-color: $diamond-hover;
  }
</style>
