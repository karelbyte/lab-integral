<template>
  <q-page class="q-ma-md">
    <froala id="edit" :tag="'textarea'" :config="config" v-model="model"></froala>
  </q-page>
</template>

<script>
export default {
  name: 'est',
  data () {
    return {
      config: {
        events: {
          initialized: function () {
            console.log('initialized')
          }
        }
      },
      model: 'Edit Your Content Here!'
    }
  }
}
</script>
