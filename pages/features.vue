<template>
  <section class="section">
    <div class="columns is-centered is-multiline is-mobile">
      <div class="column" style="text-align: center">
        <strong class="is-size-2">Features:</strong>
        <ul>
          <li v-for="feature in features" :key="features.indexOf(feature)" class="is-size-3">{{ feature }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Features',
  data () {
    return {
      features: [
        '1 extremely educational quiz!',
        'Endless fun!',
        'An eye-catching design!'
      ]
    }
  }
}
</script>

<style scoped>

</style>
