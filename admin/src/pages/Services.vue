<template>
  <q-page class=" q-pa-md">
    <div class="gt-xs row flex q-mb-md">
      <q-breadcrumbs class="text-grey">
        <q-breadcrumbs-el label="Servicios" />
        <q-breadcrumbs-el label="Listado" />
        <q-breadcrumbs-el v-if="views.news" label="Nueva" />
      </q-breadcrumbs>
    </div>
    <div id="print" hidden>
      <span style="font-size: 8px; margin-left: 25px">{{toPrint.name.substr(0, 17)}}</span><br>
      <span style="writing-mode: vertical-lr; transform: translateY(-40px)  rotate(180deg); font-size: 12px;">{{toPrint.codeAnalysis}}</span>
      <barcode :value="toPrint.barcode" :options="qbOptions2" tag="svg"/>
    </div>
    <!-- LISTADO DE SERVICIOS -->
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
                <template v-slot:body-cell-balance="props">
                  <q-td :props="props">
                    <div v-if="props.value > 0">
                      <q-badge color="red" class="text-black" :label="props.value" />
                    </div>
                    <div v-else>
                      <span>--</span>
                    </div>
                  </q-td>
                </template>
                <template v-slot:body-cell-actions="props">
                  <q-td :props="props">
                    <div v-if="props.row.status_id === 1" >
                      <q-btn dense color="secondary"  class="q-mr-xs" icon="fa fa-edit" @click="editItem(props.row)"/>
                      <q-btn dense color="negative"  class="q-mr-xs" icon="fa fa-eraser" @click="eraserShow(props.row)"/>
                      <q-btn dense color="blue"  class="q-mr-xs" icon="fa fa-barcode" @click="printQr(props.row)"/>
                    </div>
                    <q-btn dense color="purple" icon="fa fa-vial" class="q-mr-xs" >
                      <q-menu :content-style="{ backgroundColor: '#eee', color: 'black'}" anchor="bottom left" self="top right">
                        <q-list style="min-width: 100px">
                          <div v-for="des in props.row.analysis" :key="des.id">
                            <q-item  clickable v-close-popup @click="showEditorAnalysis(des.id, props.row.status_id)">
                              <q-item-section> {{des.description.substr(0, 20)}}...</q-item-section>
                            </q-item>
                            <q-separator />
                          </div>
                        </q-list>
                      </q-menu>
                    </q-btn>
                    <q-btn v-if="props.row.status_id === 1" dense color="info" class="text-black" label="ENTREGAR" @click="changeStatusService(props.row)"/>
                  </q-td>
                </template>
              </q-table>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <!-- CREAR SERVICIO -->
    <div v-if="views.news">
      <q-card style="width: 100%">
        <q-card-section>
          {{titleForm}}
        </q-card-section><q-separator/>
        <div class="row">
          <div class="col-lg-2 col-md-3 col-sm-12 col-xs-12 q-pa-sm">
            <q-input dense outlined autofocus type="date" v-model="item.moment" class="q-mb-sm"/>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 q-pa-sm">
            <q-select
              v-model="client"
              use-input
              :disable="isItemEdit"
              input-debounce="0"
              dense outlined
              :options="clientsSearch"
              option-label="names"
              option-value="id"
              map-options
              @filter="filterFnClients"
              class="q-mb-sm"
              autofocus
              label="Cliente"
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
                    Sin resultados
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 q-pa-sm">
            <q-input dense outlined v-model="item.doctor" label="Doctor" class="q-mb-sm"/>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-12 col-xs-12 q-pa-sm">
            <q-input dense outlined v-only-numbers v-model.number="item.discount" label="Descuento" class="q-mb-sm"/>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12 q-pa-sm">
            <q-btn label="Analisis +" @click="newItemDetail"/>
          </div>
          <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12 q-pa-sm">
            <q-input dense outlined v-only-numbers v-model.number="item.advance" label="Pagado" class="q-mb-sm"/>
          </div>
        </div>
        <q-card-section class="section-fix">
          <q-table
            flat
            square
            :data="item.analysis"
            :columns="productsColumns"
            row-key="id"
            :loading="loading"
            :no-data-label="dataLabel"
            @request="getList"
          >
            <template v-slot:body-cell-img="props">
              <q-td :props="props">
                <span style="font-size: 10px; margin-left: 10px">{{client.names.substr(0, 16)}}</span><br>
                <span class="texto-vertical">{{props.row.code}}</span>
                <barcode :value="props.row.barcode" :options="qbOptions" tag="img"/>
              </q-td>
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <q-btn dense color="secondary"  class="q-mr-xs" icon="fa fa-edit" @click="editItemDetail(props.row)"/>
                <q-btn dense color="negative" icon="fa fa-eraser" @click="eraserShowItemDetail(props.row)"/>
              </q-td>
            </template>
            <template v-slot:bottom-row>
              <q-tr>
                <q-td class="text-right">
                  Subtotal
                </q-td>
                <q-td class="text-left">
                  <span>{{getSubTotal}}</span>
                </q-td>
                <q-td class="text-right">
                  <span style="font-size: 18px">Total</span>
                </q-td>
                <q-td class="text-left">
                  <b><span style="font-size: 18px" class="text-black">{{getTotal}}</span></b>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
        <q-separator/>
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-sm">
          <q-input dense outlined autogrow type="textarea" v-model="item.note" label="Nota"/>
        </div>
        <q-separator/>
        <q-card-section>
          <q-btn v-if="IsSaveWard()" dense label="Guardar servicio" class="q-mr-xs" color="positive" @click="saveItem()"/>
          <q-btn dense flat label="Cerrar" v-close-popup @click="close()" />
        </q-card-section>
      </q-card>
    </div>
    <!-- FORMA DE AÑADIR DETALLE Al SERVICIO / EDITAR -->
    <q-dialog v-model="showFormDetail" persistent transition-show="scale" transition-hide="scale">
      <q-card  style="width: 700px; max-width: 80vw;">
        <q-card-section>
          Añadir analisis
        </q-card-section>
        <q-separator/>
        <q-card-section>
          <div class="row">
            <div class="col-lg-12 col-xs-12">
              <q-select
                v-model="analysis_aux"
                use-input
                :disable="isItemDetailEdit"
                input-debounce="0"
                dense outlined
                :options="analysisSearch"
                option-label="description"
                option-value="id"
                map-options
                @filter="filterFn"
                class="q-mb-sm"
                autofocus
                @input="setItemDet"
              >
                <template v-slot:option="scope">
                  <q-item
                    v-bind="scope.itemProps"
                    v-on="scope.itemEvents"
                  >
                    <q-item-section>
                      <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      Sin resultados!
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
              <q-input dense outlined v-model="itemDetail.price" label="Precio" class="q-mb-md"/>
              <q-separator class="q-mb-md"/>
              <q-input dense outlined v-model="itemDetail.barcode" label="Codigo de barra" class="q-mb-md"/>
              <q-input dense outlined v-model.number="itemDetail.barcode_quantity" label="Cantidad de etiquetas" class="q-mb-md"/>
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
    <!--  FORM PLASMAR RESULTADOS -->
    <q-dialog v-model="showEditResult" persistent transition-show="scale" transition-hide="scale">
      <q-card  style="width: 900px; max-width: 80vw;">
        <q-card-section class="bg-purple-5">
          Resultados
        </q-card-section>
        <q-separator/>
        <q-card-section>
          <tinymce  id="d1" v-model="dataResult.content" :other_options="tinyOptions"/>
        </q-card-section>
        <q-separator/>
        <q-card-actions align="right">
          <q-btn v-if="statusEditResult === 1" dense label="Guardar" color="positive" v-close-popup  @click="saveContentResult"/>
          <q-btn dense flat label="Cerrar" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--  ELIMINAR DETALLE DEL SERVICIO -->
    <q-dialog v-model="showFormDeleteItem" persistent transition-show="scale" transition-hide="scale">
      <q-card  style="width: 700px; max-width: 80vw;">
        <q-card-section class="bg-red-5">
          Eliminar detalle
        </q-card-section>
        <q-separator/>
        <q-card-section>
          <p>Seguro que desea eliminar: <b> {{this.itemDetail.description}}</b> ?</p>
          <p>Esta operación es irrevercible!</p>
        </q-card-section>
        <q-separator/>
        <q-card-actions align="right">
          <q-btn dense label="Eliminar" color="negative" v-close-popup  @click="eraserItemDetail"/>
          <q-btn dense flat label="Cerrar" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- COMP ELIMINAR -->
    <delete-item
      :showFormDelete="showFormDelete"
      :item="item"
      title="Eliminar servicio"
      url="/services/eraser"
      targets="client,analysis_description"
      @updateList="updateOfEraser"
    />
  </q-page>
</template>

<script>
import tinymce from 'vue-tinymce-editor'
import VueBarcode from '@chenfengyuan/vue-barcode'
import { ApiUrl, onview, generateId, dateToUS } from '../boot/tools'
import DeleteItem from '../components/DeleteItem'
export default {
  name: 'services',
  components: {
    DeleteItem, 'barcode': VueBarcode, tinymce
  },
  data () {
    return {
      statusEditResult: 1,
      showEditResult: false,
      dataResult: {
        id: 0,
        content: ''
      },
      tinyOptions: {
        height: '40vh',
        language_url: '../statics/es.js',
        menubar: false
      },
      client: null,
      analysis_aux: null,
      toPrint: {
        name: '',
        codeAnalysis: '',
        barcode: '12345'
      },
      qbOptions: {
        width: 1,
        height: 70,
        margin: 1,
        fontSize: 15,
        format: 'CODE128'
      },
      qbOptions2: {
        width: 1,
        height: 60,
        margin: 1,
        fontSize: 12,
        format: 'CODE128'
      },
      pagination: {
        sortBy: 'status_id',
        descending: false,
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
          name: 'moment',
          required: true,
          label: 'FECHA',
          align: 'left',
          field: 'moment',
          format: val => new Date(val.replace(/-/g, '/')).toLocaleDateString(),
          headerClasses: 'bg-primary text-white',
          sortable: true
        },
        {
          name: 'client_id',
          required: true,
          label: 'Cliente',
          align: 'left',
          field: 'client',
          headerClasses: 'bg-primary text-white',
          sortable: true
        },
        {
          name: 'analysis_description',
          required: true,
          label: 'ANALISIS',
          align: 'left',
          field: 'analysis_description',
          headerClasses: 'bg-primary text-white'
        },
        {
          name: 'doctor',
          required: true,
          label: 'DOCTOR',
          align: 'left',
          field: 'doctor',
          headerClasses: 'bg-primary text-white',
          sortable: true
        },
        {
          name: 'price',
          required: true,
          label: 'PRECIO',
          align: 'left',
          field: 'price',
          headerClasses: 'bg-primary text-white',
          sortable: true
        },
        {
          name: 'advance',
          required: true,
          label: 'PAGADO',
          align: 'left',
          field: 'advance',
          headerClasses: 'bg-primary text-white'
        },
        {
          name: 'balance',
          required: true,
          label: 'SALDO',
          align: 'left',
          field: 'balance',
          headerClasses: 'bg-primary text-white'
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
          value: 'moment',
          label: 'Fecha',
          type: 'int'
        },
        val: ''
      },
      filerOptions: [
        {
          value: 'moment',
          label: 'Fecha',
          type: 'int'
        }
      ],
      loading: false,
      item: {
        id: 0,
        moment: '',
        client_id: '',
        status_id: 1,
        doctor: '',
        price: 0,
        discount: 0,
        advance: 0,
        analysis: []
      },
      itemClear: {
        id: 0,
        moment: '',
        client_id: '',
        doctor: '',
        price: 0,
        discount: 0,
        advance: 0,
        status_id: 1,
        analysis: []
      },
      clients: [],
      clientsSearch: [],
      analysis: [],
      analysisSearch: [],
      isItemEdit: false,
      isItemDetailEdit: false,
      itemDetail: {
        id: null,
        analysis_id: null,
        description: '',
        barcode: '',
        barcode_quantity: '',
        price: 0
      },
      itemDetailClear: {
        id: null,
        analysis_id: null,
        description: '',
        barcode: '',
        barcode_quantity: '',
        price: 0
      },
      productsColumns: [
        {
          name: 'description',
          required: true,
          label: 'Analisis',
          align: 'left',
          field: 'description',
          headerClasses: 'bg-primary text-white',
          sortable: true
        },
        {
          name: 'price',
          required: true,
          label: 'PRECIO',
          align: 'left',
          field: 'price',
          headerClasses: 'bg-primary text-white',
          sortable: true
        },
        {
          name: 'barcode',
          required: true,
          label: 'CODIGO',
          align: 'left',
          field: 'barcode',
          headerClasses: 'bg-primary text-white',
          sortable: true
        },
        {
          name: 'barcode_quantity',
          required: true,
          label: 'CANTIDAD ETIQUETAS',
          align: 'left',
          field: 'barcode_quantity',
          headerClasses: 'bg-primary text-white',
          sortable: true
        },
        { name: 'img', label: 'ETIQUETA', field: '', align: 'center', headerClasses: 'bg-primary text-white' },
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
  computed: {
    getSubTotal: function () {
      let total = 0
      if (this.item.analysis.length > 0) {
        total = this.item.analysis.reduce((ret, item) => {
          return ret + parseFloat(item.price)
        }, 0)
      } else {
        total = 0
      }
      return total
    },
    getTotal: function () {
      if (this.item.analysis.length > 0) {
        const dis = this.item.discount === '' ? 0 : this.item.discount
        const total = this.item.analysis.reduce((a, b) => {
          return a + parseFloat(b.price)
        }, 0)
        return (total - parseFloat(dis)).toFixed(2)
      } else {
        return 0
      }
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
    changeStatusService (itm) {
      this.$axios.post(ApiUrl + '/services/set-status', { id: itm.id }).then(res => {
        this.$noty.positive(res.data)
      })
    },
    showEditorAnalysis (analysisId, status) {
      this.dataResult.id = analysisId
      this.showEditResult = true
      this.statusEditResult = status
      setTimeout(() => {
        this.$axios.get(ApiUrl + '/services/get-content/' + analysisId).then(res => {
          this.dataResult.content = res.data
        })
      }, 1000)
    },
    saveContentResult () {
      this.$axios.post(ApiUrl + '/services/store-content', this.dataResult).then(() => {
        this.showEditResult = false
      })
    },
    printQr (itm) {
      itm.analysis.forEach(item => {
        for (let i = 0; i < item.barcode_quantity; i++) {
          this.toPrint.name = itm.client
          this.toPrint.codeAnalysis = item.code
          this.toPrint.barcode = item.barcode
          let ficha = document.getElementById('print')
          let ventimp = window.open('', 'PRINT', 'height=100,width=100')
          ventimp.document.write(`<style> body {height:472px; width:354px;}  @page {size:auto; margin: 0;}</style>`)
          ventimp.document.write(ficha.innerHTML)
          ventimp.print()
          ventimp.close()
        }
      })
    },
    setItemDet (value) {
      this.itemDetail.price = value.price
      this.itemDetail.description = value.description
      this.itemDetail.code = value.code
    },
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
          this.analysisSearch = this.analysis
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.analysisSearch = this.analysis.filter(v => v.description.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterFnClients (val, update) {
      if (val === '') {
        update(() => {
          this.clientsSearch = this.clients
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.clientsSearch = this.clients.filter(v => v.names.toLowerCase().indexOf(needle) > -1)
      })
    },
    getList (props) {
      let toServer = {
        pagination: props.pagination,
        filter: this.filter
      }
      this.dataLabel = 'Cargando datos...'
      this.loading = true
      this.$axios.post(ApiUrl + '/services/list', toServer).then(res => {
        this.datas = res.data.list
        this.dataLabel = this.datas.length >= 0 ? '' : 'No hay datos que mostrar...'
        this.pagination = props.pagination
        this.pagination.rowsNumber = res.data.total
        this.loading = false
      })
    },
    // BUSQUEDA Y AÑADIR DETALLES AL SERVICIO
    newItemDetail () {
      this.itemDetail = { ...this.itemDetailClear }
      this.isItemDetailEdit = false
      this.showFormDetail = true
    },
    addItemDetail () {
      let item = this.item.analysis.find(it => it.analysis_id === this.itemDetail.analysis_id)
      if (item === undefined) {
        this.itemDetail.id = generateId(5)
        this.itemDetail.analysis_id = this.analysis_aux.id
        this.item.analysis.push({ ...this.itemDetail })
        this.itemDetail = { ...this.itemDetailClear }
        this.showFormDetail = false
      } else {
        this.item.analysis.forEach(it => {
          if (it.id === this.itemDetail.id) {
            it.analysis_id = this.analysis_aux.id
            it.price = this.itemDetail.price
            it.code = this.itemDetail.code
            it.barcode = this.itemDetail.barcode
            it.barcode_quantity = this.itemDetail.barcode_quantity
            this.showFormDetail = false
          }
        })
      }
      this.isItemDetailEdit = false
    },
    newItem () {
      this.$axios.get(ApiUrl + '/services/resources').then(res => {
        this.act = 'post'
        this.clients = res.data.clients
        this.analysis = res.data.analysis
        this.client = null
        this.titleForm = 'Añadir servicio a cliente.'
        this.item = { ...this.itemClear }
        this.item.moment = dateToUS(new Date())
        this.isItemEdit = false
        onview('news', this.views)
      })
    },
    editItem (itm) {
      this.$axios.get(ApiUrl + '/services/resources').then(res => {
        this.clients = res.data.clients
        this.analysis = res.data.analysis
        this.titleForm = 'Editar servicio a cliente.'
        this.isItemEdit = true
        this.act = 'update'
        this.item = { ...itm }
        this.client = this.clients.find(it => it.id === itm.client_id)
        onview('news', this.views)
      })
    },
    saveItem () {
      this.item.client_id = this.client.id
      this.$axios({
        method: 'post',
        url: ApiUrl + '/services/' + this.act,
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
      let code = this.itemDetail.barcode !== ''
      let cant = parseInt(this.itemDetail.barcode_quantity) > 0
      let price = parseInt(this.itemDetail.price) > 0
      let isSelect = this.analysis_aux !== null
      return cant && isSelect && code && price
    },
    IsSaveWard () {
      let client = this.client !== null
      let moment = this.item.moment !== ''
      let doc = this.item.doctor
      let data = this.item.analysis.length > 0
      return client && moment && doc && data
    },
    eraserShowItemDetail (it) {
      this.itemDetail = { ...it }
      this.showFormDeleteItem = true
    },
    eraserItemDetail () {
      this.item.analysis = this.item.analysis.filter(it => it.id !== this.itemDetail.id)
      this.showFormDeleteItem = true
    },
    editItemDetail (it) {
      this.itemDetail = { ...it }
      this.analysis_aux = this.analysis.find(its => its.id === it.analysis_id)
      this.isItemDetailEdit = true
      this.showFormDetail = true
    },
    applyShow (it) {
      this.item = { ...it }
      this.showApplyForm = true
    },
    applyToInventory () {
      this.$axios.post(ApiUrl + '/services/apply', { id: this.item.id }).then(res => {
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

  .texto-vertical {
    writing-mode: vertical-lr;
    transform: translateY(-40px)  rotate(180deg);
    font-size: 12px;
  }

</style>
