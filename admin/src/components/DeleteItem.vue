<template>
  <q-dialog v-model="showForm" persistent transition-show="scale" transition-hide="scale">
    <q-card  style="width: 700px; max-width: 80vw;">
      <q-card-section class="bg-red-5">
        {{title}}
      </q-card-section>
      <q-separator/>
      <q-card-section>
        <p>Seguro que desea eliminar: <b v-for="t in targets_" :key="t" > {{item[t]}} </b> ?</p>
        <p>Esta operación es irrevercible!</p>
      </q-card-section>
      <q-separator/>
      <q-card-actions align="right">
        <q-btn v-if="item.description !== ''" dense label="Eliminar" color="negative"  @click="eraser"/>
        <q-btn dense flat label="Cerrar" @click="close" v-close-popup  />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ApiUrl } from '../boot/tools'

export default {
  name: 'DeleteItem',
  props: ['showFormDelete', 'url', 'item', 'title', 'targets'],
  data () {
    return {
      showForm: false
    }
  },
  computed: {
    targets_: function () {
      return this.targets.indexOf(',') > 0 ? this.targets.split(',') : [this.targets]
    }
  },
  watch: {
    showFormDelete: function () {
      this.showForm = this.showFormDelete
    }
  },
  methods: {
    eraser () {
      console.log('entro')
      this.$axios.post(ApiUrl + this.url, { id: this.item.id }).then(res => {
        this.$noty.positive(res.data)
        this.$emit('updateList')
      }).catch(er => {
        this.$emit('updateList')
        this.$noty.negative(er.response.data)
      })
    },
    close () {
      this.$emit('updateList')
    }
  }
}
</script>
