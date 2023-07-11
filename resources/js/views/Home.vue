<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <hero-bar :has-right-visible="false">
      Admin board   
    </hero-bar>
 
    <section class="section is-main-section"> 
      <card-component title="Teams" class="has-table has-mobile-sort-spaced">
        <clients-table-sample data-url=""/>
      </card-component>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
// import LineChart from '@/components/Charts/LineChart'
import ClientsTableSample from '@/components/ClientsTableSample'
import moment from 'moment'
export default {
  name: 'home',
  components: {
    ClientsTableSample,
    // LineChart,
    CardComponent,
    CardWidget,
    Tiles,
    HeroBar,
    TitleBar
  },
  
  data () {
    return {
 
    }
  },
  computed: {
    titleStack () {
      return [
        'Admin',
        'Dashboard'
      ]
    }
  },
  //getclientcount(){}
  mounted () {
 

    this.$buefy.snackbar.open({
      message: 'Welcome back',
      queue: false
    })
  },
  
  methods: {
 
  }
}
</script>
