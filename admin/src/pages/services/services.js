import tinymce from 'vue-tinymce-editor'
import VueBarcode from '@chenfengyuan/vue-barcode'
import { ApiUrl, onview, generateId, dateToUS } from '../../boot/tools'
import DeleteItem from '../../components/DeleteItem'
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
      tool: 'formatselect | bold italic strikethrough forecolor backcolor' +
        ' | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat' +
        '| table preview print',
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
        barcode: '',
        barcode_quantity: 1,
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
        barcode: '',
        barcode_quantity: 1,
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
        price: 0
      },
      itemDetailClear: {
        id: null,
        analysis_id: null,
        description: '',
        price: 0
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
        this.getList({
          pagination: this.pagination
        })
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
        this.$noty.positive('Se guardo la información!')
      })
    },
    printQr (item) {
      let name = item.client.replace(/ /g, '-').substring(0, 22)
      for (let i = 0; i < item.barcode_quantity; i++) {
        /* eslint-disable */
        let template = `^XA
        ^FO30,0^ADN,11,7^FD`+ name + `^FS
        ^FO30,25^BY2^BCN,60,N,N
        ^FT30,90^A0N,23,26^FH\^FD`+item.barcode+`^FS
        ^PQ1,0,1,Y^XZ
        ^XZ`
        /* eslint-enable */
        let printWindow = window.open('', 'print', 'height:100,width:100')
        printWindow.document.open('text/plain')
        printWindow.document.write(template)
        printWindow.document.close()
        printWindow.focus()
        printWindow.print()
        printWindow.close()
      }
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
        this.item.analysis = []
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
      /* let code = this.itemDetail.barcode !== ''
      let cant = parseInt(this.itemDetail.barcode_quantity) > 0 */
      let price = parseInt(this.itemDetail.price) > 0
      let isSelect = this.analysis_aux !== null
      return isSelect && price
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
