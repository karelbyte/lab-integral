<template>
  <q-page class=" q-pa-md">
    <div class="gt-xs row flex">
      <q-breadcrumbs class="text-grey">
        <q-breadcrumbs-el label="Almacen" />
        <q-breadcrumbs-el label="Inventarios" />
      </q-breadcrumbs>
    </div>
    <div class="row">
      <div class="col-lg-8 col-xs-12"></div>
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
                  <q-btn dense color="secondary"  class="q-mr-xs" icon="fa fa-file-pdf" @click="editItem(props.row)"/>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ApiUrl } from '../boot/tools'
export default {
  name: 'inventories',
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
        {
          name: 'cant',
          required: true,
          label: 'Existencia',
          align: 'left',
          field: 'cant',
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
          value: 'products.names',
          label: 'Nombres',
          type: 'text'
        },
        val: ''
      },
      filerOptions: [
        {
          value: 'products.names',
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
      this.$axios.post(ApiUrl + '/inventories/list', toServer).then(res => {
        this.datas = res.data.list
        this.dataLabel = this.datas.length >= 0 ? '' : 'No hay datos que mostrar...'
        this.pagination = props.pagination
        this.pagination.rowsNumber = res.data.total
        this.loading = false
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
