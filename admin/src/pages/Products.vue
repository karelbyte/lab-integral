<template>
  <q-page class=" q-pa-md">
    <div class="gt-xs row flex">
      <q-breadcrumbs class="text-grey">
        <q-breadcrumbs-el label="Almacen" />
        <q-breadcrumbs-el label="Productos" />
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
      title="Eliminar producto"
      url="/products/eraser"
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
          <div class="row">
            <div class="col-lg-6 col-xs-12">
              <q-input dense outlined autofocus v-model="item.code" label="Codigo" class="q-mb-md"/>
              <q-input dense outlined  v-model="item.names" label="Nombres" class="q-mb-md"/>
              <q-select dense outlined v-model="item.measure_id" :options="measures" label="Medida"
                        emit-value
                        option-label="description"
                        option-value="id"
                        map-options
                        class="q-mb-md"
              />
              <q-select dense outlined v-model="item.category_id" :options="categories" label="Categoria"
                        emit-value
                        option-label="description"
                        option-value="id"
                        map-options
                        class="q-mb-md"
              />
              <q-input v-only-numbers dense outlined v-model="item.purchase_price" label="Precio de compra" class="q-mb-md"/>
              <q-input v-only-numbers dense outlined v-model="item.sale_price" label="Precio de venta" class="q-mb-md"/>
            </div>
            <div class="col-lg-6 col-xs-12 q-pl-sm">
              <q-card>
                <q-card-section>
                  Provedores
                </q-card-section>
                <q-separator/>
                <q-card-section>
                  <q-scroll-area style="height: 235px;">
                    <q-option-group
                      :options="providers"
                      label="Proveedores"
                      type="checkbox"
                      v-model="item.providers"
                    />
                  </q-scroll-area>
                </q-card-section>
              </q-card>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 col-xs-12">
              <q-checkbox v-if="act === 'post'" v-model="withCant" label="Añadir cantidad a existencias" />
              <q-input v-if="withCant" dense outlined autofocus v-model="cantSendToInventory" label="Cantidad a enviar"/>
            </div>
          </div>
        </q-card-section>
        <q-separator/>
        <q-card-actions align="right">
          <q-btn v-if="IsSaveWard()" dense label="Guardar" color="positive" @click="saveItem()"/>
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
  name: 'products',
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
      errors: [],
      columns: [
        {
          name: 'code',
          required: true,
          label: 'CODIGO',
          align: 'left',
          field: 'code',
          headerClasses: 'bg-primary text-white',
          sortable: true
        },
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
          name: 'measure_id',
          required: true,
          label: 'MEDIDA',
          align: 'left',
          field: 'measure',
          headerClasses: 'bg-primary text-white',
          sortable: true
        },
        {
          name: 'category_id',
          required: true,
          label: 'CATEGORIA',
          align: 'left',
          field: 'category',
          headerClasses: 'bg-primary text-white',
          sortable: true
        },
        {
          name: 'sale_price',
          required: true,
          label: 'PRECIO',
          align: 'left',
          field: 'sale_price',
          headerClasses: 'bg-primary text-white',
          sortable: true
        },
        { name: 'actions', label: 'ACCIONES', field: '', align: 'center', headerClasses: 'bg-primary text-white' }
      ],
      act: 'post',
      dataLabel: 'Cargando datos...',
      withCant: false,
      cantSendToInventory: 0,
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
          value: 'code',
          label: 'Codigo',
          type: 'text'
        }
      ],
      loading: false,
      item: {
        id: 0,
        code: '',
        names: '',
        measure_id: null,
        category_id: null,
        sale_price: 0,
        purchase_price: 0,
        providers: []

      },
      itemClear: {
        id: 0,
        code: '',
        names: '',
        measure_id: null,
        category_id: null,
        sale_price: 0,
        purchase_price: 0,
        providers: []
      },
      measures: [],
      categories: [],
      providers: []
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
  methods: {
    getList (props) {
      let toServer = {
        pagination: props.pagination,
        filter: this.filter
      }
      this.dataLabel = 'Cargando datos...'
      this.loading = true
      this.$axios.post(ApiUrl + '/products/list', toServer).then(res => {
        this.datas = res.data.list
        this.dataLabel = this.datas.length >= 0 ? '' : 'No hay datos que mostrar...'
        this.pagination = props.pagination
        this.pagination.rowsNumber = res.data.total
        this.loading = false
      })
    },
    newItem () {
      this.act = 'post'
      this.withCant = false
      this.cantSendToInventory = 0
      this.titleForm = 'Añadir producto'
      this.$axios.get(ApiUrl + '/products/resources').then(res => {
        this.item = { ...this.itemClear }
        this.providers = res.data.providers
        this.categories = res.data.categories
        this.measures = res.data.measures
        this.showForm = true
      })
    },
    editItem (itm) {
      this.act = 'update'
      this.withCant = false
      this.titleForm = 'Editar producto'
      this.$axios.get(ApiUrl + '/products/resources').then(res => {
        this.item = { ...itm }
        this.providers = res.data.providers
        this.categories = res.data.categories
        this.measures = res.data.measures
        this.showForm = true
      })
    },
    saveItem () {
      this.item.providers = this.item.providers.map(it => {
        return { provider_id: it }
      })
      if (this.withCant && !isNaN(this.cantSendToInventory)) {
        this.item.with_cant = this.withCant
        this.item.cant = this.cantSendToInventory
      }
      this.$axios({
        method: 'post',
        url: ApiUrl + '/products/' + this.act,
        data: this.item
      }).then(res => {
        this.$noty.positive(res.data)
        this.getList({
          pagination: this.pagination
        })
        this.showForm = false
      }).catch(er => {
        if (er.response.data.hasOwnProperty('errors')) {
          this.errors = er.response.data.errors
        } else {
          this.$noty.negative(er.response.data)
          this.showForm = false
        }
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
    },
    // FUNCION PARA VALIDAD DATOS DE ENVIO AL BACK END
    IsSaveWard () {
      let name = this.item.names !== ''
      let code = this.item.code !== ''
      let measure = this.item.measure_id !== null
      let category = this.item.category_id !== null
      let salePrice = this.item.sale_price !== 0
      let providers = this.item.providers.length > 0
      return name && measure && code && category && salePrice && providers
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
