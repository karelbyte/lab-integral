<template>
  <q-dialog v-model="show" persistent transition-show="scale" transition-hide="scale">
    <q-card  style="width: 700px; max-width: 80vw;">
      <q-card-section>
        Añadir Fuente
      </q-card-section>
      <q-separator/>
      <q-card-section>
        <q-input ref="name" dense outlined autofocus v-model="item.names" label="Lugar" class="q-mb-xs"/>
        <q-input dense outlined type="text" v-model="item.symbol" label="Nomenclatura" class="q-mb-sm"/>
        <q-input dense outlined type="text" v-model="item.address" label="Direccion" class="q-mb-sm"/>
        <q-input dense outlined v-model="item.email" label="Correo" class="q-mb-xs"/>
        <q-input v-only-int-numbers dense outlined v-model="item.telf" label="Telefono" class="q-mb-xs"/>
      </q-card-section>
      <q-separator/>
      <q-card-actions align="right">
        <q-btn v-if="validateSave" dense label="Guardar" color="positive"  @click="saveItem"/>
        <q-btn dense flat label="Cerrar"  @click="close" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ApiUrl } from '../boot/tools'

export default {
  name: 'LocationAdd',
  props: [
    'showFormLocation',
    'act'
  ],
  computed: {
    validateSave () {
      return this.item.names !== '' && this.item.symbol !== ''
    }
  },
  data () {
    return {
      show: false,
      item: {
        id: 0,
        names: '',
        address: '',
        symbol: '',
        email: '',
        telf: ''
      },
      itemClear: {
        id: 0,
        names: '',
        address: '',
        symbol: '',
        email: '',
        telf: ''
      }
    }
  },
  watch: {
    'showFormLocation': function () {
      this.show = this.showFormLocation
    }
  },
  methods: {
    close () {
      this.item = { ...this.itemClear }
      this.$emit('close')
    },
    saveItem () {
      this.$axios({
        method: 'post',
        url: ApiUrl + '/locations/' + this.act,
        data: this.item
      }).then(() => {
        this.$emit('update')
      })
    }
  }
}
</script>

<style scoped>

</style>
