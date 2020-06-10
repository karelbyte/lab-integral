<template>
  <q-page class=" q-pa-md">
    <div class="gt-xs row flex">
      <q-breadcrumbs class="text-grey">
        <q-breadcrumbs-el label="Almacen" />
        <q-breadcrumbs-el label="Categorias" />
      </q-breadcrumbs>
    </div>
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
                  <q-btn dense color="secondary"  class="q-mr-xs" icon="fa fa-edit" @click="editItem(props.row)"/>
                  <q-btn dense color="negative" icon="fa fa-eraser" @click="eraserShow(props.row)"/>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <delete-item
      :showFormDelete="showFormDelete"
      :item="item"
      title="Eliminar Categoria"
      url="/categories/eraser"
      targets="description"
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
          <q-input outlined autofocus v-model="item.description" label="Introduce la unidad de medida"/>
        </q-card-section>
        <q-separator/>
        <q-card-actions align="right">
          <q-btn v-if="item.description !== ''" dense label="Guardar" color="positive" v-close-popup  @click="saveItem"/>
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
  name: 'Categories',
  components: {
    DeleteItem
  },
  data () {
    return {
      pagination: {
        sortBy: 'description',
        descending: true,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
      datas: [],
      columns: [
        {
          name: 'description',
          required: true,
          label: 'DESCRIPCION',
          align: 'left',
          field: 'description',
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
          value: 'description',
          label: 'Descripcion',
          type: 'text'
        },
        val: ''
      },
      filerOptions: [
        {
          value: 'description',
          label: 'Descripcion',
          type: 'text'
        }
      ],
      loading: false,
      item: {
        id: 0,
        description: ''
      },
      itemClear: {
        id: 0,
        description: ''
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
  methods: {
    getList (props) {
      let toServer = {
        pagination: props.pagination,
        filter: this.filter
      }
      this.dataLabel = 'Cargando datos...'
      this.loading = true
      this.$axios.post(ApiUrl + '/categories/list', toServer).then(res => {
        this.datas = res.data.list
        this.dataLabel = this.datas.length >= 0 ? '' : 'No hay datos que mostrar...'
        this.pagination = props.pagination
        this.pagination.rowsNumber = res.data.total
        this.loading = false
      })
    },
    newItem () {
      this.act = 'post'
      this.titleForm = 'Añadir categoria'
      this.item = { ...this.itemClear }
      this.showForm = true
    },
    editItem (itm) {
      this.act = 'update'
      this.titleForm = 'Editar categoria'
      this.item = { ...itm }
      this.showForm = true
    },
    saveItem () {
      this.$axios({
        method: 'post',
        url: ApiUrl + '/categories/' + this.act,
        data: this.item
      }).then(res => {
        this.$noty.positive(res.data)
        this.getList({
          pagination: this.pagination
        })
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
