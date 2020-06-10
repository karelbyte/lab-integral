<template>
  <q-page class=" q-pa-md">
    <div class="gt-xs row flex">
      <q-breadcrumbs class="text-grey">
        <q-breadcrumbs-el label="Almacen" />
        <q-breadcrumbs-el label="Proveedores" />
      </q-breadcrumbs>
    </div>
    <div class="row">
      <div class="col-lg-8 col-xs-12"><q-btn color="primary" label="Nuevo" @click="newItem"/></div>
      <div class="col-lg-4 col-xs-12 flex flex-inline">
        <q-input dense autofocus v-model="filter.val" label="filtro..." style="width: 49%"/>
        <q-select dense v-model="filter.field" :options="filerOptions" label="filtro por..."
                  style="width: 50%"
        >
          <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              v-on="scope.itemEvents"
            ><q-item-section>
              <q-item-label caption>{{ scope.opt.label }}</q-item-label>
            </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
    <div class="row flex">
      <div class="col-lg-12 col-xs-12 q-mt-xs">
        <q-card>
          <q-separator/>
          <q-card-section class="section-fix">
            <q-table
              flat
              :data="datas"
              :columns="columns"
              row-key="id"
              :loading="loading"
              :pagination.sync="pagination"
              :no-data-label="dataLabel"
              @request="getList"
              binary-state-sort
            >
              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-btn dense color="secondary"  class="q-mr-xs" icon="fa fa-edit" @click="editItem(props.row)"/>
                  <q-btn dense color="negative" icon="fa fa-eraser" @click="eraserShow(props.row)"/>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- COMP ELIMINAR -->
    <delete-item
      :showFormDelete="showFormDelete"
      :item="item"
      title="Eliminar proveedor"
      url="/providers/eraser"
      targets="names"
      @updateList="updateOfEraser"
    />
    <!-- FORMA DE AÑADIR / EDITAR -->
    <q-dialog v-model="showForm" persistent transition-show="scale" transition-hide="scale">
      <q-card  style="width: 700px; max-width: 80vw;">
        <q-card-section>
          {{titleForm}}
        </q-card-section>
        <q-separator/>
        <q-card-section>
          <q-input dense outlined autofocus v-model="item.names" label="Nombres" class="q-mb-xs"/>
          <q-input dense outlined v-model="item.address" label="Direccion" class="q-mb-xs"/>
          <q-input dense outlined v-model="item.email" label="Correo" class="q-mb-xs"/>
          <q-input v-only-int-numbers dense outlined v-model="item.tel" label="Telefono"/>
        </q-card-section>
        <q-separator/>
        <q-card-actions align="right">
          <q-btn v-if="validateSave" dense label="Guardar" color="positive" @click="saveItem"/>
          <q-btn dense flat label="Cerrar" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ApiUrl } from '../boot/tools'
import DeleteItem from '../components/DeleteItem'
export default {
  name: 'Providers',
  components: {
    DeleteItem
  },
  data () {
    return {
      pagination: {
        sortBy: 'names',
        descending: true,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
      datas: [],
      columns: [
        {
          name: 'names',
          required: true,
          label: 'NOMBRES',
          align: 'left',
          field: 'names',
          headerClasses: 'bg-primary text-white',
          sortable: true
        },
        {
          name: 'address',
          required: true,
          label: 'DIRECCION',
          align: 'left',
          field: 'address',
          headerClasses: 'bg-primary text-white',
          sortable: true
        },
        {
          name: 'email',
          required: true,
          label: 'CORREO',
          align: 'left',
          field: 'email',
          headerClasses: 'bg-primary text-white',
          sortable: true
        },
        {
          name: 'tel',
          required: true,
          label: 'TELEFONO',
          align: 'left',
          field: 'tel',
          headerClasses: 'bg-primary text-white',
          sortable: true
        },
        { name: 'actions', label: 'ACCIONES', field: '', align: 'center', headerClasses: 'bg-primary text-white' }
      ],
      act: 'post',
      dataLabel: 'Cargando datos...',
      showForm: false,
      showFormDelete: false,
      titleForm: '',
      filter: {
        field: {
          value: 'names',
          label: 'Nombres',
          type: 'text'
        },
        val: ''
      },
      filerOptions: [
        {
          value: 'names',
          label: 'Nombres',
          type: 'text'
        },
        {
          value: 'address',
          label: 'Direccion',
          type: 'text'
        }
      ],
      loading: false,
      item: {
        id: 0,
        names: '',
        address: '',
        email: '',
        tel: ''
      },
      itemClear: {
        id: 0,
        names: '',
        address: '',
        email: '',
        tel: ''
      }
    }
  },
  watch: {
    'filter.field.value': function () {
      this.getList({
        pagination: this.pagination
      })
    },
    'filter.val': function () {
      this.getList({
        pagination: this.pagination
      })
    }
  },
  mounted () {
    this.getList(
      {
        pagination: this.pagination
      }
    )
  },
  computed: {
    validateSave () {
      return this.item.names !== '' && this.item.address !== '' && this.item.email !== ''
    }
  },
  methods: {
    getList (props) {
      let toServer = {
        pagination: props.pagination,
        filter: this.filter
      }
      this.dataLabel = 'Cargando datos...'
      this.loading = true
      this.$axios.post(ApiUrl + '/providers/list', toServer).then(res => {
        this.datas = res.data.list
        this.dataLabel = this.datas.length >= 0 ? '' : 'No hay datos que mostrar...'
        this.pagination = props.pagination
        this.pagination.rowsNumber = res.data.total
        this.loading = false
      })
    },
    newItem () {
      this.act = 'post'
      this.titleForm = 'Añadir proveedor'
      this.item = { ...this.itemClear }
      this.showForm = true
    },
    editItem (itm) {
      this.act = 'update'
      this.titleForm = 'Editar proveedor'
      this.item = { ...itm }
      this.showForm = true
    },
    saveItem () {
      this.$axios({
        method: 'post',
        url: ApiUrl + '/providers/' + this.act,
        data: this.item
      }).then(res => {
        this.$noty.positive(res.data)
        this.getList({
          pagination: this.pagination
        })
        this.showForm = false
      }).catch(er => {
        this.$noty.positive(er.response.data)
      })
    },
    eraserShow (itm) {
      this.item = { ...itm }
      this.showFormDelete = true
    },
    updateOfEraser () {
      this.showFormDelete = false
      this.getList({
        pagination: this.pagination
      })
    }
  }
}
</script>

<style scoped>

  .filter-input > div {
    width: 60px;
  }
  .section-fix {
    padding: 0 !important;
  }

</style>
