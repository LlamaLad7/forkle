<template>
  <section class="section">
    <div class="columns is-mobile is-centered">
      <div v-if="done.length === countries.length" class="column center">
        <strong class="is-size-3" style="margin-right: 1.15em">Congratulations! You got them all! :D</strong>
      </div>
      <div v-else class="column is-half">
        <strong class="is-size-3">How many countries can you name?</strong>
      </div>
    </div>
    <div class="columns is-mobile is-centered is-multiline">
      <div class="column is-half" style="margin-top: -1em; padding-right: 3em">
        <b-autocomplete ref="input" :data="this.$store.state.settings.autocomplete ? filteredCountries : []" @keyup.native="checkInput" @select="function(option) {if (option !== null) country = option; checkInputWithTick();}" v-model="country" />
      </div>
    </div>
    <div class="columns is-desktop is-centered" style="margin-right: 3.1vw; margin-left: 1vw">
      <div v-if="correct" class="column center">
        <strong class="is-size-3">That is correct! Well done!</strong>
      </div>
      <div v-else class="column">
        <strong class="is-size-4">Completed:</strong>
        <strong class="is-size-4 is-pulled-right">{{ done.length }}/{{ countries.length }}</strong>
        <table class="table" style="width: 100%">
          <tbody id="completed">
            <tr v-for="countryChunk in chunkArray(countries, 5)" :key="countryChunk[0]">
              <td v-for="country in countryChunk" :id="countries.indexOf(country)" :key="country">
                <span v-if="done.includes(country)">{{ capitalize(country) }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style>
  tr {
    height: 2.5em;
  }
  table {
    margin-top: 1vw;
    table-layout: fixed;
  }
  td {
    border: 1px solid #dbdbdb !important;
    width: initial !important;
  }
  .center {
    text-align: center;
  }
</style>
<script>
// const countries = ['afghanistan', 'albania', 'algeria', 'american samoa', 'andorra', 'angola', 'anguilla', 'antarctica', 'antigua and barbuda', 'argentina', 'armenia', 'aruba', 'australia', 'austria', 'azerbaijan', 'bahamas', 'bahrain', 'bangladesh', 'barbados', 'belarus', 'belgium', 'belize', 'benin', 'bermuda', 'bhutan', 'bolivia', 'bosnia and herzegovina', 'botswana', 'bouvet island', 'brazil', 'british antarctic territory', 'british indian ocean territory', 'british virgin islands', 'brunei', 'bulgaria', 'burkina faso', 'burundi', 'cambodia', 'cameroon', 'canada', 'canton and enderbury islands', 'cape verde', 'cayman islands', 'central african republic', 'chad', 'chile', 'china', 'christmas island', 'cocos [keeling] islands', 'colombia', 'comoros', 'congo - brazzaville', 'congo - kinshasa', 'cook islands', 'costa rica', 'croatia', 'cuba', 'cyprus', 'czech republic', 'côte d’ivoire', 'denmark', 'djibouti', 'dominica', 'dominican republic', 'dronning maud land', 'east germany', 'ecuador', 'egypt', 'el salvador', 'equatorial guinea', 'eritrea', 'estonia', 'ethiopia', 'falkland islands', 'faroe islands', 'fiji', 'finland', 'france', 'french guiana', 'french polynesia', 'french southern territories', 'french southern and antarctic territories', 'gabon', 'gambia', 'georgia', 'germany', 'ghana', 'gibraltar', 'greece', 'greenland', 'grenada', 'guadeloupe', 'guam', 'guatemala', 'guernsey', 'guinea', 'guinea-bissau', 'guyana', 'haiti', 'heard island and mcdonald islands', 'honduras', 'hong kong sar china', 'hungary', 'iceland', 'india', 'indonesia', 'iran', 'iraq', 'ireland', 'isle of man', 'israel', 'italy', 'jamaica', 'japan', 'jersey', 'johnston island', 'jordan', 'kazakhstan', 'kenya', 'kiribati', 'kuwait', 'kyrgyzstan', 'laos', 'latvia', 'lebanon', 'lesotho', 'liberia', 'libya', 'liechtenstein', 'lithuania', 'luxembourg', 'macau sar china', 'macedonia', 'madagascar', 'malawi', 'malaysia', 'maldives', 'mali', 'malta', 'marshall islands', 'martinique', 'mauritania', 'mauritius', 'mayotte', 'metropolitan france', 'mexico', 'micronesia', 'midway islands', 'moldova', 'monaco', 'mongolia', 'montenegro', 'montserrat', 'morocco', 'mozambique', 'myanmar [burma]', 'namibia', 'nauru', 'nepal', 'netherlands', 'netherlands antilles', 'neutral zone', 'new caledonia', 'new zealand', 'nicaragua', 'niger', 'nigeria', 'niue', 'norfolk island', 'north korea', 'north vietnam', 'northern mariana islands', 'norway', 'oman', 'pacific islands trust territory', 'pakistan', 'palau', 'palestinian territories', 'panama', 'panama canal zone', 'papua new guinea', 'paraguay', "people's democratic republic of yemen", 'peru', 'philippines', 'pitcairn islands', 'poland', 'portugal', 'puerto rico', 'qatar', 'romania', 'russia', 'rwanda', 'réunion', 'saint barthélemy', 'saint helena', 'saint kitts and nevis', 'saint lucia', 'saint martin', 'saint pierre and miquelon', 'saint vincent and the grenadines', 'samoa', 'san marino', 'saudi arabia', 'senegal', 'serbia', 'serbia and montenegro', 'seychelles', 'sierra leone', 'singapore', 'slovakia', 'slovenia', 'solomon islands', 'somalia', 'south africa', 'south georgia and the south sandwich islands', 'south korea', 'spain', 'sri lanka', 'sudan', 'suriname', 'svalbard and jan mayen', 'swaziland', 'sweden', 'switzerland', 'syria', 'são tomé and príncipe', 'taiwan', 'tajikistan', 'tanzania', 'thailand', 'timor-leste', 'togo', 'tokelau', 'tonga', 'trinidad and tobago', 'tunisia', 'turkey', 'turkmenistan', 'turks and caicos islands', 'tuvalu', 'u.s. minor outlying islands', 'u.s. miscellaneous pacific islands', 'u.s. virgin islands', 'uganda', 'ukraine', 'union of soviet socialist republics', 'united arab emirates', 'united kingdom', 'united states', 'unknown or invalid region', 'uruguay', 'uzbekistan', 'vanuatu', 'vatican city', 'venezuela', 'vietnam', 'wake island', 'wallis and futuna', 'western sahara', 'yemen', 'zambia', 'zimbabwe']
// const countries = ['afghanistan', 'albania', 'algeria', 'andorra', 'angola', 'antigua and barbuda', 'argentina', 'armenia', 'australia', 'austria', 'azerbaijan', 'the bahamas', 'bahrain', 'bangladesh', 'barbados', 'belarus', 'belgium', 'belize', 'benin', 'bhutan', 'bolivia', 'bosnia and herzegovina', 'botswana', 'brazil', 'brunei', 'bulgaria', 'burkina faso', 'burundi', 'cabo verde', 'cambodia', 'cameroon', 'canada', 'central african republic', 'chad', 'chile', 'china', 'colombia', 'comoros', 'congo, democratic republic of the', 'congo, republic of the', 'costa rica', 'côte d’ivoire', 'croatia', 'cuba', 'cyprus', 'czech republic', 'denmark', 'djibouti', 'dominica', 'dominican republic', 'east timor', 'ecuador', 'egypt', 'el salvador', 'equatorial guinea', 'eritrea', 'estonia', 'eswatini', 'ethiopia', 'fiji', 'finland', 'france', 'gabon', 'the gambia', 'georgia', 'germany', 'ghana', 'greece', 'grenada', 'guatemala', 'guinea', 'guinea-bissau', 'guyana', 'haiti', 'honduras', 'hungary', 'iceland', 'india', 'indonesia', 'iran', 'iraq', 'ireland', 'israel', 'italy', 'jamaica', 'japan', 'jordan', 'kazakhstan', 'kenya', 'kiribati', 'korea, north', 'korea, south', 'kosovo', 'kuwait', 'kyrgyzstan', 'laos', 'latvia', 'lebanon', 'lesotho', 'liberia', 'libya', 'liechtenstein', 'lithuania', 'luxembourg', 'madagascar', 'malawi', 'malaysia', 'maldives', 'mali', 'malta', 'marshall islands', 'mauritania', 'mauritius', 'mexico', 'micronesia, federated states of', 'moldova', 'monaco', 'mongolia', 'montenegro', 'morocco', 'mozambique', 'myanmar', 'namibia', 'nauru', 'nepal', 'netherlands', 'new zealand', 'nicaragua', 'niger', 'nigeria', 'north macedonia', 'norway', 'oman', 'pakistan', 'palau', 'panama', 'papua new guinea', 'paraguay', 'peru', 'philippines', 'poland', 'portugal', 'qatar', 'romania', 'russia', 'rwanda', 'saint kitts and nevis', 'saint lucia', 'saint vincent and the grenadines', 'samoa', 'san marino', 'sao tome and principe', 'saudi arabia', 'senegal', 'serbia', 'seychelles', 'sierra leone', 'singapore', 'slovakia', 'slovenia', 'solomon islands', 'somalia', 'south africa', 'spain', 'sri lanka', 'sudan', 'sudan, south', 'suriname', 'sweden', 'switzerland', 'syria', 'taiwan', 'tajikistan', 'tanzania', 'thailand', 'togo', 'tonga', 'trinidad and tobago', 'tunisia', 'turkey', 'turkmenistan', 'tuvalu', 'uganda', 'ukraine', 'united arab emirates', 'united kingdom', 'united states', 'uruguay', 'uzbekistan', 'vanuatu', 'vatican city', 'venezuela', 'vietnam', 'yemen', 'zambia', 'zimbabwe']
const countries = ['afghanistan', 'albania', 'algeria', 'andorra', 'angola', 'antigua and barbuda', 'argentina', 'armenia', 'australia', 'austria', 'azerbaijan', 'bahrain', 'bangladesh', 'barbados', 'belarus', 'belgium', 'belize', 'benin', 'bhutan', 'bolivia', 'bosnia and herzegovina', 'botswana', 'brazil', 'brunei', 'bulgaria', 'burkina faso', 'burundi', 'cabo verde', 'cambodia', 'cameroon', 'canada', 'central african republic', 'chad', 'chile', 'china', 'colombia', 'comoros', 'costa rica', 'croatia', 'cuba', 'cyprus', 'czech republic', 'côte d’ivoire', 'democratic republic of the congo', 'denmark', 'djibouti', 'dominica', 'dominican republic', 'east timor', 'ecuador', 'egypt', 'el salvador', 'equatorial guinea', 'eritrea', 'estonia', 'eswatini', 'ethiopia', 'federated states of micronesia', 'fiji', 'finland', 'france', 'gabon', 'georgia', 'germany', 'ghana', 'greece', 'grenada', 'guatemala', 'guinea', 'guinea-bissau', 'guyana', 'haiti', 'honduras', 'hungary', 'iceland', 'india', 'indonesia', 'iran', 'iraq', 'ireland', 'israel', 'italy', 'jamaica', 'japan', 'jordan', 'kazakhstan', 'kenya', 'kiribati', 'kosovo', 'kuwait', 'kyrgyzstan', 'laos', 'latvia', 'lebanon', 'lesotho', 'liberia', 'libya', 'liechtenstein', 'lithuania', 'luxembourg', 'madagascar', 'malawi', 'malaysia', 'maldives', 'mali', 'malta', 'marshall islands', 'mauritania', 'mauritius', 'mexico', 'moldova', 'monaco', 'mongolia', 'montenegro', 'morocco', 'mozambique', 'myanmar', 'namibia', 'nauru', 'nepal', 'netherlands', 'new zealand', 'nicaragua', 'niger', 'nigeria', 'north korea', 'north macedonia', 'norway', 'oman', 'pakistan', 'palau', 'panama', 'papua new guinea', 'paraguay', 'peru', 'philippines', 'poland', 'portugal', 'qatar', 'republic of the congo', 'romania', 'russia', 'rwanda', 'saint kitts and nevis', 'saint lucia', 'saint vincent and the grenadines', 'samoa', 'san marino', 'sao tome and principe', 'saudi arabia', 'senegal', 'serbia', 'seychelles', 'sierra leone', 'singapore', 'slovakia', 'slovenia', 'solomon islands', 'somalia', 'south africa', 'south korea', 'south sudan', 'spain', 'sri lanka', 'sudan', 'suriname', 'sweden', 'switzerland', 'syria', 'taiwan', 'tajikistan', 'tanzania', 'thailand', 'the bahamas', 'the gambia', 'togo', 'tonga', 'trinidad and tobago', 'tunisia', 'turkey', 'turkmenistan', 'tuvalu', 'uganda', 'ukraine', 'united arab emirates', 'united kingdom', 'united states', 'uruguay', 'uzbekistan', 'vanuatu', 'vatican city', 'venezuela', 'vietnam', 'yemen', 'zambia', 'zimbabwe']
export default {
  name: 'HomePage',
  components: {},
  data () {
    return {
      countries,
      done: [],
      correct: false,
      country: '',
      completed: false
    }
  },
  beforeRouteLeave (to, from, next) {
    confetti.stop()
    next()
  },
  computed: {
    filteredCountries () {
      return this.countries.filter((option) => {
        return option
          .toString()
          .includes(this.country.toLowerCase()) && !this.done.includes(option)
      })
    }
  },
  watch: {
    done () {
      confetti.start()
      if (this.done.length === this.countries.length && !this.completed) {
        this.completed = true
        confetti.start()
      }
    }
  },
  methods: {
    checkInput (event) {
      this.$refs.input.focus()
      this.correct = (this.country === 'none' && this.done.length === 0) || parseInt(this.country) === this.done.length
      const text = this.country.toLowerCase()
      if (this.countries.includes(text) && !(this.done.includes(text))) {
        this.done.push(text)
        this.country = ''
      }
    },
    checkInputWithTick (event) {
      this.$nextTick(function () {
        this.$nextTick(function () {
          this.checkInput(event)
        })
      })
    },
    chunkArray (myArray, chunkSize) {
      let index = 0
      const arrayLength = myArray.length
      const tempArray = []
      let myChunk

      for (index = 0; index < arrayLength; index += chunkSize) {
        myChunk = myArray.slice(index, index + chunkSize)
        // Do something if you want with the group
        tempArray.push(myChunk)
      }

      return tempArray
    },
    capitalize (str) {
      str = str.split(' ')

      for (let i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1)
      }

      return str.join(' ')
    }
  }
}
</script>
