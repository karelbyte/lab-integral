<template>
  <q-page class=" q-pa-md">
    <div class="gt-xs row flex q-mb-md">
      <q-breadcrumbs class="text-grey">
        <q-breadcrumbs-el label="Almacen" />
        <q-breadcrumbs-el label="Recepciones" />
        <q-breadcrumbs-el v-if="views.news" label="Nueva" />
      </q-breadcrumbs>
    </div>
    <!-- LISTADO DE RECEPCIONES -->
    <div v-if="views.list">
      <div class="row">
        <div class="col-lg-8 col-xs-12"><q-btn color="primary" label="Nueva" @click="newItem"/></div>
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
                    <q-btn v-if="props.row.status_id === 1" dense color="secondary"  class="q-mr-xs" icon="fa fa-edit" @click="editItem(props.row)"/>
                    <q-btn v-if="props.row.status_id === 1" dense color="negative"  class="q-mr-xs" icon="fa fa-eraser" @click="eraserShow(props.row)"/>
                    <q-btn v-if="props.row.status_id === 1" dense color="info" class="text-black" label="APLICAR" @click="applyShow(props.row)"/>
                    <q-btn v-if="props.row.status_id === 2" dense color="info" class="text-black" icon="fa fa-file-pdf" @click="applyShow(props.row)"/>
                  </q-td>
                </template>
              </q-table>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <!-- CREAR RECEPCION -->
    <div v-if="views.news">
        <q-card style="width: 100%">
          <q-card-section>
            {{titleForm}}
          </q-card-section><q-separator/>
          <div class="row">
            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 q-pa-sm">
              <q-input dense outlined autofocus v-model="item.code" label="Codigo" class="q-mb-sm"/>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 q-pa-sm">
              <q-input dense outlined  type="date" v-model="item.moment" class="q-mb-sm"/>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-sm">
              <q-btn label="Añadir Producto" @click="newItemDetail"/>
            </div>
            <q-separator/>
          </div>
          <q-card-section class="section-fix">
            <q-table
              flat
              square
              :data="item.products"
              :columns="productsColumns"
              row-key="id"
              :loading="loading"
              :no-data-label="dataLabel"
              @request="getList"
            >
              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-btn dense color="secondary"  class="q-mr-xs" icon="fa fa-edit" @click="editItemDetail(props.row)"/>
                  <q-btn dense color="negative" icon="fa fa-eraser" @click="eraserShowItemDetail(props.row)"/>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
          <q-separator/>
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-sm">
            <q-input dense outlined autogrow type="textarea" v-model="item.note" label="Nota"/>
          </div>
          <q-separator/>
          <q-card-section>
            <q-btn v-if="IsSaveWard()" dense label="Guardar RECEPCION" class="q-mr-xs" color="positive" @click="saveItem()"/>
            <q-btn dense flat label="Cerrar" v-close-popup @click="close()" />
          </q-card-section>
        </q-card>
    </div>
    <!-- FORMA DE AÑADIR DETALLE DE RECEPCION / EDITAR -->
    <q-dialog v-model="showFormDetail" persistent transition-show="scale" transition-hide="scale">
      <q-card  style="width: 700px; max-width: 80vw;">
        <q-card-section>
         Añadir producto a la recepción
        </q-card-section>
        <q-separator/>
        <q-card-section>
          <div class="row">
            <div class="col-lg-12 col-xs-12">
              <q-select
                v-model="itemDetail"
                use-input
                :disable="isItemEdit"
                input-debounce="0"
                dense outlined
                :options="productsSearch"
                option-label="names"
                option-value="product_id"
                @filter="filterFn"
                class="q-mb-sm"
                autofocus
              >
                <template v-slot:option="scope">
                  <q-item
                    v-bind="scope.itemProps"
                    v-on="scope.itemEvents"
                  >
                    <q-item-section>
                      <q-item-label caption>{{ scope.opt.names }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                     null
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
              <q-input v-only-numbers dense outlined v-model.number="itemDetail.cant" label="Cantidad" class="q-mb-md"/>
            </div>
          </div>
        </q-card-section>
        <q-separator/>
        <q-card-actions align="right">
          <q-btn v-if="IsSaveDetail()" dense label="Guardar" color="positive" @click="addItemDetail()"/>
          <q-btn dense flat label="Cerrar" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--  ELIMINAR DETALLE DE LA RECEPCION -->
    <q-dialog v-model="showFormDeleteItem" persistent transition-show="scale" transition-hide="scale">
      <q-card  style="width: 700px; max-width: 80vw;">
        <q-card-section class="bg-red-5">
          Eliminar detalle
        </q-card-section>
        <q-separator/>
        <q-card-section>
          <p>Seguro que desea eliminar: <b> {{this.itemDetail.names}}</b> ?</p>
          <p>Esta operación es irrevercible!</p>
        </q-card-section>
        <q-separator/>
        <q-card-actions align="right">
          <q-btn dense label="Eliminar" color="negative" v-close-popup  @click="eraserItemDetail"/>
          <q-btn dense flat label="Cerrar" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--  APLICAR RECEPCION AL INVENTARIO -->
    <q-dialog v-model="showApplyForm" persistent transition-show="scale" transition-hide="scale">
      <q-card  style="width: 700px; max-width: 80vw;">
        <q-card-section class="bg-red-5">
         APLICAR AL INVENTARIO
        </q-card-section>
        <q-separator/>
        <q-card-section>
          <p>Seguro que desea aplicar al inventario: <b> {{this.item.code}}</b> ?</p>
          <p>Se actulizaran las cantidades, esta operación es irrevercible!</p>
        </q-card-section>
        <q-separator/>
        <q-card-actions align="right">
          <q-btn dense label="Aplicar" color="negative" v-close-popup  @click="applyToInventory"/>
          <q-btn dense flat label="Cerrar" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- COMP ELIMINAR -->
    <delete-item
      :showFormDelete="showFormDelete"
      :item="item"
      title="Eliminar recepción"
      url="/receptions/eraser"
      targets="code"
      @updateList="updateOfEraser"
    />
  </q-page>
</template>

<script>
import { ApiUrl, onview, generateId } from '../boot/tools'
import DeleteItem from '../components/DeleteItem'
export default {
  name: 'reception',
  components: {
    DeleteItem
  },
  data () {
    return {
      pagination: {
        sortBy: 'code',
        descending: true,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
      datas: [],
      errors: [],
      views: {
        list: true,
        news: false
      },
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
          name: 'moment',
          required: true,
          label: 'Fecha',
          align: 'left',
          field: 'moment',
          format: val => new Date(val.replace(/-/g, '/')).toLocaleDateString(),
          headerClasses: 'bg-primary text-white',
          sortable: true
        },
        {
          name: 'status_id',
          required: true,
          label: 'ESTADO',
          align: 'left',
          field: 'status',
          headerClasses: 'bg-primary text-white',
          sortable: true
        },
        { name: 'actions', label: 'ACCIONES', field: '', align: 'center', headerClasses: 'bg-primary text-white' }
      ],
      act: 'post',
      dataLabel: 'Cargando datos...',
      withCant: false,
      cantSendToInventory: 0,
      showFormDetail: false,
      showFormDelete: false,
      showApplyForm: false,
      showFormDeleteItem: false,
      titleForm: '',
      filter: {
        field: {
          value: 'code',
          label: 'Codigo',
          type: 'text'
        },
        val: ''
      },
      filerOptions: [
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
        moment: '',
        note: '',
        status_id: 1,
        products: []
      },
      itemClear: {
        id: 0,
        code: '',
        moment: '',
        note: '',
        status_id: 1,
        products: []
      },
      products: [],
      productsSearch: [],
      isItemEdit: false,
      itemDetail: {
        id: null,
        product_id: null,
        code: '',
        names: '',
        cant: 0
      },
      itemDetailClear: {
        id: null,
        product_id: null,
        code: '',
        names: '',
        cant: 0
      },
      productsColumns: [
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
          label: 'NOMBRE',
          align: 'left',
          field: 'names',
          headerClasses: 'bg-primary text-white',
          sortable: true
        },
        {
          name: 'cant',
          required: true,
          label: 'CANTIDAD',
          align: 'left',
          field: 'cant',
          headerClasses: 'bg-primary text-white',
          sortable: true
        },
        { name: 'actions', label: 'ACCIONES', field: '', align: 'center', headerClasses: 'bg-primary text-white' }
      ]
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
    close () {
      onview('list', this.views)
      this.getList(
        {
          pagination: this.pagination
        }
      )
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.productsSearch = this.products
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.productsSearch = this.products.filter(v => v.names.toLowerCase().indexOf(needle) > -1)
      })
    },
    getList (props) {
      let toServer = {
        pagination: props.pagination,
        filter: this.filter
      }
      this.dataLabel = 'Cargando datos...'
      this.loading = true
      this.$axios.post(ApiUrl + '/receptions/list', toServer).then(res => {
        this.datas = res.data.list
        this.dataLabel = this.datas.length >= 0 ? '' : 'No hay datos que mostrar...'
        this.pagination = props.pagination
        this.pagination.rowsNumber = res.data.total
        this.loading = false
      })
    },
    // BUSQUEDA Y AÑADIR DETALLES A LA RECEPCION
    newItemDetail () {
      this.$axios.get(ApiUrl + '/receptions/resources').then(res => {
        this.products = res.data.products
        this.itemDetail = { ...this.itemDetailClear }
        this.isItemEdit = false
        this.showFormDetail = true
      })
    },
    addItemDetail () {
      let item = this.item.products.find(it => it.product_id === this.itemDetail.product_id)
      if (item === undefined) {
        this.itemDetail.id = generateId(5)
        this.item.products.push({ ...this.itemDetail })
        this.itemDetail = { ...this.itemDetailClear }
        this.$noty.info('Producto añadido!')
      } else {
        this.item.products.forEach(it => {
          if (it.product_id === this.itemDetail.product_id) {
            if (this.isItemEdit) {
              it.cant = this.itemDetail.cant
              this.itemDetail = { ...this.itemDetailClear }
              this.showFormDetail = false
              this.$noty.warning('Se actualizo la cantidad!')
            } else {
              it.cant += this.itemDetail.cant
              this.itemDetail = { ...this.itemDetailClear }
              this.$noty.warning('Producto añadido anteriormente, se actualizo la cantidad!')
            }
          }
        })
      }
    },
    newItem () {
      this.act = 'post'
      this.withCant = false
      this.cantSendToInventory = 0
      this.titleForm = 'Añadir recepción'
      this.item = { ...this.itemClear }
      onview('news', this.views)
    },
    editItem (itm) {
      this.act = 'update'
      this.item = { ...itm }
      onview('news', this.views)
    },
    saveItem () {
      this.$axios({
        method: 'post',
        url: ApiUrl + '/receptions/' + this.act,
        data: this.item
      }).then(res => {
        this.$noty.positive(res.data)
        this.getList({
          pagination: this.pagination
        })
        onview('list', this.views)
      }).catch(er => {
        if (er.response.data.hasOwnProperty('errors')) {
          this.errors = er.response.data.errors
        } else {
          this.$noty.negative(er.response.data)
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
    IsSaveDetail () {
      let cant = parseInt(this.itemDetail.cant) > 0
      let isSelect = this.itemDetail.product_id && this.itemDetail.product_id !== ''
      return cant && isSelect
    },
    IsSaveWard () {
      let code = this.item.code !== ''
      let moment = this.item.moment !== ''
      let data = this.item.products.length > 0
      return code && moment && data
    },
    eraserShowItemDetail (it) {
      this.itemDetail = { ...it }
      this.showFormDeleteItem = true
    },
    eraserItemDetail () {
      this.item.products = this.item.products.filter(it => it.id !== this.itemDetail.id)
      this.showFormDeleteItem = true
    },
    editItemDetail (it) {
      this.$axios.get(ApiUrl + '/receptions/resources').then(res => {
        this.products = res.data.products
        this.itemDetail = { ...it }
        this.isItemEdit = true
        this.showFormDetail = true
      })
    },
    applyShow (it) {
      this.item = { ...it }
      this.showApplyForm = true
    },
    applyToInventory () {
      this.$axios.post(ApiUrl + '/receptions/apply', { id: this.item.id }).then(res => {
        this.showApplyForm = false
        this.$noty.positive(res.data)
        this.getList({
          pagination: this.pagination
        })
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
