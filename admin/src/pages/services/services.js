import tinymce from 'vue-tinymce-editor'
import VueBarcode from '@chenfengyuan/vue-barcode'
import { ApiUrl, onview, generateId, dateToUS } from '../../boot/tools'
import DeleteItem from '../../components/DeleteItem'
import ClientAdd from '../../components/ClientAdd'
import DoctorAdd from '../../components/DoctorAdd'
import LocationAdd from '../../components/LocationAdd'
import FormChangeServiceStatus from '../../components/FormChangeServiceStatus'
export default {
  name: 'services',
  components: {
    DeleteItem, 'barcode': VueBarcode, ClientAdd, DoctorAdd, LocationAdd, FormChangeServiceStatus, tinymce
  },
  data () {
    return {
      config: {
        height: 300,
        language: 'es'
      },
      showFormLocation: false,
      showFormClient: false,
      showFormDoctor: false,
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
      doctor: null,
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
          name: 'barcode',
          required: true,
          label: 'QB',
          align: 'left',
          field: 'barcode',
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
          type: 'date'
        },
        val: ''
      },
      filerOptions: [
        {
          value: 'moment',
          label: 'Fecha',
          type: 'date',
          join: null
        },
        {
          value: 'barcode',
          label: 'CB',
          type: 'text',
          join: null
        },
        {
          value: 'clients.names',
          label: 'Cliente',
          type: 'text',
          join: 'clients'
        }
      ],
      loading: false,
      item: {
        id: 0,
        moment: '',
        client_id: '',
        status_id: 1,
        doctor_id: '',
        location_id: '',
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
        doctor_id: '',
        location_id: '',
        price: 0,
        barcode: '',
        barcode_quantity: 1,
        discount: 0,
        advance: 0,
        status_id: 1,
        analysis: []
      },
      clients: [],
      doctors: [],
      locations: [],
      location: null,
      clientsSearch: [],
      doctorsSearch: [],
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
      ],
      showFormChangeStatusService: false,
      locationsSearch: [],
      monthNames: ['E', 'F', 'MA', 'A', 'MY', 'J',
        'JL', 'AG', 'S', 'O', 'N', 'D'
      ],
      next: 0
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
    },
    'client': 'getCodeBar',
    'location': 'getCodeBar'
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
    getCodeBar () {
      if (this.location !== null && this.client !== null) {
        this.item.barcode = this.location.symbol + this.monthNames[new Date().getMonth()] + this.next + this.client.names.split(' ').reduce((a, b) => {
          return a + b.substr(0, 1)
        }, '')
      }
    },
    formChangeStatusService (item) {
      if (parseFloat(item.balance) > 0) {
        this.item = item
        this.showFormChangeStatusService = true
      } else {
        this.changeStatusService(item)
      }
    },
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
    filterFnDoctors (val, update) {
      if (val === '') {
        update(() => {
          this.doctorsSearch = this.doctors
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.doctorsSearch = this.doctors.filter(v => v.names.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterFnLocations (val, update) {
      if (val === '') {
        update(() => {
          this.locationsSearch = this.locations
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.locationsSearch = this.locations.filter(v => v.names.toLowerCase().indexOf(needle) > -1)
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
        this.doctors = res.data.doctors
        this.locations = res.data.locations
        this.next = res.data.next
        this.client = null
        this.doctor = null
        this.location = null
        this.titleForm = 'Añadir servicio a cliente.'
        this.item = { ...this.itemClear }
        this.item.analysis = []
        this.item.moment = dateToUS(new Date())
        this.item.barcode = this.monthNames[new Date().getMonth()]
        this.isItemEdit = false
        onview('news', this.views)
      })
    },
    getClientList () {
      this.$axios.get(ApiUrl + '/clients/resources').then(res => {
        this.clients = res.data.clients
        this.showFormClient = false
      })
    },
    closeFormClient () {
      this.showFormClient = false
    },
    getDoctorList () {
      this.$axios.get(ApiUrl + '/doctors/resources').then(res => {
        this.doctors = res.data.doctors
        this.showFormDoctor = false
      })
    },
    closeFormDoctor () {
      this.showFormDoctor = false
    },
    getLocationList () {
      this.$axios.get(ApiUrl + '/locations/resources').then(res => {
        this.locations = res.data
        this.showFormLocation = false
      })
    },
    closeFormLocation () {
      this.showFormLocation = false
    },
    editItem (itm) {
      this.$axios.get(ApiUrl + '/services/resources').then(res => {
        this.clients = res.data.clients
        this.analysis = res.data.analysis
        this.doctors = res.data.doctors
        this.locations = res.data.locations
        this.titleForm = 'Editar servicio a cliente.'
        this.isItemEdit = true
        this.act = 'update'
        this.item = { ...itm }
        this.client = this.clients.find(it => it.id === itm.client_id)
        this.doctor = this.doctors.find(doc => doc.id === itm.doctor_id)
        this.location = this.locations.find(loc => loc.id === itm.location_id)
        onview('news', this.views)
      })
    },
    saveItem () {
      this.item.client_id = this.client.id
      this.item.doctor_id = this.doctor.id
      this.item.location_id = this.location.id
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
    getListUpdate () {
      this.getList({
        pagination: this.pagination
      })
      this.showFormChangeStatusService = false
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
      let cb = this.item.barcode !== ''
      let doc = this.doctor !== null
      let data = this.item.analysis.length > 0
      return client && moment && doc && data && cb
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
