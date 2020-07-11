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
export default {
  name: 'FormChangeServiceStatus'
}
</script>

<style scoped>

</style>
