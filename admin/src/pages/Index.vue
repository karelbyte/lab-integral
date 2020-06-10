<template>
  <q-page class="flex flex-center column ">
    <img alt="LACI" src="~assets/img/bal.png"  :style="SizeImg" class="icon-fix">
    <span :style="SizeLabel" class="text-black text-weight-regular text-blue-grey-10">LABORATORIO ANALISIS CLINICOS INTEGRALES</span>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  computed: {
    /**
     * @return {string}
     */
    SizeLabel: function () {
      return this.$q.screen.lt.sm ? 'font-size: 15px' : (this.$q.screen.lt.md ? 'font-size: 25px' : 'font-size: 35px')
    },
    /**
     * @return {string}
     */
    SizeImg: function () {
      return this.$q.screen.lt.sm ? 'height: 50px !important;' : (this.$q.screen.lt.md ? 'height: 100px !important;' : 'height: 150px !important;')
    }
  }
}
</script>

<style scoped>
  .icon-fix {
    margin-bottom: 50px;
  }
</style>
