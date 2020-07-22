<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-blue-10">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          Laboratorio Clinico Integral
        </q-toolbar-title>
        <q-btn
          flat
          color="white"
          @click="$q.fullscreen.toggle()"
          :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      :width="220"
      v-model="leftDrawerOpen"
      show-if-above
      :content-style="labBgColor"
      elevated
    >
      <q-list dark>
        <q-item v-ripple clickable :active="isActiveItem(2)" @click="goToUrl('clientes', 2)"
                active-class="text-orange-5">
          <q-item-section avatar>
            <q-icon name="fa fa-users" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Clientes</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-ripple clickable :active="isActiveItem(11)" @click="goToUrl('doctores', 11)"
                active-class="text-orange-5">
          <q-item-section avatar>
            <q-icon name="fa fa-user-md" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Doctores</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator></q-separator>
        <q-item v-ripple clickable :active="isActiveItem(1)" @click="goToUrl('services', 1)"
                active-class="text-orange-5"
        >
          <q-item-section avatar>
            <q-icon name="fa fa-book-open" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Servicios</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator></q-separator>
        <q-expansion-item
          expand-separator
          icon="fa fa-tags"
          label="Catalogos"
        >
          <q-list dark class="q-pl-md">
            <q-item v-ripple clickable :active="isActiveItem(3)" @click="goToUrl('analisis', 3)"
                    active-class="text-orange-5">
              <q-item-section avatar>
                <q-icon name="fa fa-flask" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Analisis</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-separator></q-separator>
        <q-expansion-item
          expand-separator
          icon="fa fa-toolbox"
          label="Almacen"
        >
          <q-list dark class="q-pl-md">
            <q-item v-ripple clickable :active="isActiveItem(4)" @click="goToUrl('medidas', 4)"
                    active-class="text-orange-5">
              <q-item-section avatar>
                <q-icon name="fa fa-weight-hanging" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Medidas</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-ripple clickable :active="isActiveItem(5)" @click="goToUrl('categorias', 5)"
                    active-class="text-orange-5">
              <q-item-section avatar>
                <q-icon name="fa fa-th-large" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Categorias</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-ripple clickable :active="isActiveItem(6)" @click="goToUrl('proveedores', 6)"
                    active-class="text-orange-5">
              <q-item-section avatar>
                <q-icon name="fa fa-truck-loading" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Proveedores</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-ripple clickable :active="isActiveItem(7)" @click="goToUrl('productos', 7)"
                    active-class="text-orange-5">
              <q-item-section avatar>
                <q-icon name="fab fa-product-hunt" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Productos</q-item-label>
              </q-item-section>
            </q-item>
           <q-item v-ripple clickable :active="isActiveItem(8)" @click="goToUrl('recepcion', 8)"
            active-class="text-orange-5">
            <q-item-section avatar>
              <q-icon name="fa fa-plus-square" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Recepciones</q-item-label>
            </q-item-section>
            </q-item>
            <q-item v-ripple clickable :active="isActiveItem(9)" @click="goToUrl('existencias', 9)"
                    active-class="text-orange-5">
              <q-item-section avatar>
                <q-icon name="fa fa-th" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Existencias</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-separator></q-separator>
        <q-expansion-item
          expand-separator
          icon="fa fa-sliders-h"
          label="Configuración"
        >
          <q-list dark class="q-pl-md">
            <q-item v-ripple clickable :active="isActiveItem(10)" @click="goToUrl('test', 10)"
                    active-class="text-orange-5">
              <q-item-section avatar>
                <q-icon name="fa fa-flask" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Test</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Layout',

  data () {
    return {
      leftDrawerOpen: false,
      labBgColor: {
        'background-color': '#082B61'
      },
      active: 0
    }
  },
  methods: {
    isActiveItem (it) {
      return it === this.active
    },
    goToUrl (url, status) {
      this.active = status
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>
  .lab-bg-color {
   background-color: #0B3D87
  }
</style>
