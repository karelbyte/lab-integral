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
          <q-input dense autofocus :type="filter.field.type" v-model="filter.val" debounce="300"   stack-label label="filtro..." style="width: 49%"/>
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
                    <q-btn color="primary" flat icon="fa fa-ellipsis-h">
                      <q-menu transition-show="flip-right"
                              transition-hide="flip-left"
                              :offset="[-50, 0]"
                      >
                        <q-list style="min-width: 100px">
                          <q-item  v-if="props.row.status_id === 1" clickable v-close-popup @click="editItem(props.row)">
                            <q-item-section avatar>
                              <q-icon color="secondary" name="fa fa-edit" />
                            </q-item-section>
                            <q-item-section>Actualizar</q-item-section>
                          </q-item>
                          <q-item  v-if="props.row.status_id === 1" clickable v-close-popup @click="eraserShow(props.row)">
                            <q-item-section avatar>
                              <q-icon color="negative" name="fa fa-eraser" />
                            </q-item-section>
                            <q-item-section>Eliminar</q-item-section>
                          </q-item>
                          <q-separator />
                          <q-item  v-if="props.row.status_id === 1" clickable v-close-popup @click="printNote(props.row)">
                            <q-item-section avatar>
                              <q-icon color="brown" name="fa fa-file-invoice-dollar" />
                            </q-item-section>
                            <q-item-section>Nota de venta</q-item-section>
                          </q-item>
                          <q-item clickable v-close-popup @click="printQr(props.row)">
                            <q-item-section avatar>
                              <q-icon color="blue" name="fa fa-barcode" />
                            </q-item-section>
                            <q-item-section>Codigo Barra</q-item-section>
                          </q-item>
                          <q-item clickable>
                            <q-item-section avatar>
                              <q-icon color="purple" name="fa fa-vials" />
                            </q-item-section>
                            <q-item-section>Analisis</q-item-section>
                            <q-item-section side>
                              <q-icon name="keyboard_arrow_right" />
                            </q-item-section>
                            <q-menu  anchor="top right" self="top left">
                              <q-list style="min-width: 100px">
                                <div v-for="des in props.row.analysis" :key="des.id">
                                  <q-item  clickable v-close-popup @click="showEditorAnalysis(des.id, props.row.status_id)">
                                    <q-item-section> {{des.description.substr(0, 20)}}...</q-item-section>
                                  </q-item>
                                  <q-separator />
                                </div>
                              </q-list>
                            </q-menu>
                          </q-item>
                        </q-list>
                        <q-item  v-if="props.row.status_id === 1" clickable v-close-popup  @click="formChangeStatusService(props.row)">
                          <q-item-section avatar>
                            <q-icon color="green" name="fa fa-envelope" />
                          </q-item-section>
                          <q-item-section>Entregar</q-item-section>
                        </q-item>
                        <q-item  clickable v-close-popup>
                          <q-item-section avatar>
                            <q-icon color="brown" name="fa fa-at" />
                          </q-item-section>
                          <q-item-section>Enviar correo</q-item-section>
                        </q-item>
                        <q-item  clickable v-close-popup>
                          <q-item-section avatar>
                            <q-icon color="cyan" name="fa fa-globe" />
                          </q-item-section>
                          <q-item-section>Publicar a web</q-item-section>
                        </q-item>
                      </q-menu>
                    </q-btn>
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
            <q-input dense outlined  type="date" v-model="item.moment" class="q-mb-sm"/>
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
            <q-btn @click="showFormClient = true">+</q-btn>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 q-pa-sm">
            <q-select
              v-model="doctor"
              use-input
              input-debounce="0"
              dense outlined
              :options="doctorsSearch"
              option-label="names"
              option-value="id"
              map-options
              @filter="filterFnDoctors"
              class="q-mb-sm"
              label="Doctores"
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
            <q-btn @click="showFormDoctor = true">+</q-btn>
          </div>
          <div v-if="client !== null && item.barcode !== ''" style="position:absolute; left: calc(70vw - 80px)">
            <span style="font-size: 10px; margin-left: 10px">{{client.names.substr(0, 16)}}</span><br>
            <span class="texto-vertical">{{item.code}}</span>
            <barcode :value="item.barcode" :options="qbOptions" tag="img"/>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-2 col-md-1 col-sm-1 col-xs-1 q-pa-sm">
            <q-btn label="Analisis" style="background-color: brown; color:wheat" @click="newItemDetail"/>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 q-pa-sm">
            <q-select
              v-model="location"
              use-input
              input-debounce="0"
              dense outlined
              :options="locationsSearch"
              option-label="names"
              option-value="id"
              map-options
              @filter="filterFnLocations"
              class="q-mb-sm"
              label="Procedencia"
            >
              <template v-slot:option="scope">
                <q-item
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents"
                >
                  <q-item-section>
                    <q-item-label caption>{{ scope.opt.names  + ' (' + scope.opt.symbol + ')'  }}</q-item-label>
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
            <q-btn @click="showFormLocation = true">+</q-btn>
          </div>
          <div class="col-lg-1 col-md-3 col-sm-12 col-xs-12 q-pa-sm">
            <q-input dense outlined v-only-numbers v-model.number="item.discount" label="Descuento" class="q-mb-sm"/>
          </div>
          <div class="col-lg-1 col-md-12 col-sm-12 col-xs-12 q-pa-sm">
            <q-input dense outlined v-only-numbers v-model.number="item.advance" label="Pagado" class="q-mb-sm"/>
          </div>
          <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12 q-pa-sm">
            <q-input dense outlined v-model="item.barcode" label="Codigo de barra" class="q-mb-md"/>
          </div>
         <!-- <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12 q-pa-sm">
            <q-input dense outlined v-model.number="item.barcode_quantity" label="Cantidad de etiquetas" class="q-mb-md"/>
          </div> -->
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
          <tinymce  id="d1" v-model="dataResult.content" :toolbar1="tool" :other_options="tinyOptions"/>
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
    <!-- AÑADIR CLIENTES -->
    <ClientAdd :showFormClient="showFormClient" act="post" @update="getClientList" @close="closeFormClient"></ClientAdd>
    <!-- AÑADIR Doctor -->
    <DoctorAdd :showFormDoctor="showFormDoctor" act="post" @update="getDoctorList" @close="closeFormDoctor"></DoctorAdd>
    <!-- AÑADIR LOCACION -->
    <LocationAdd :showFormLocation="showFormLocation" act="post" @update="getLocationList" @close="closeFormLocation"></LocationAdd>
    <!--CAMBIAR ESTADO SERVICIO -->
    <form-change-service-status :show="showFormChangeStatusService" :item="item" @update="getListUpdate" @close="showFormChangeStatusService=false"></form-change-service-status>
    <delete-item
      :showFormDelete="showFormDelete"
      :item="item"
      title="Eliminar servicio"
      url="/services/eraser"
      targets="client,analysis_description"
      @updateList="updateOfEraser"
    />
    <q-dialog v-model="showPrintNote" persistent transition-show="scale" transition-hide="scale">
      <q-card  style="width:500px; max-width: 80vw;">
        <q-card-section>
          Imprimir nota
        </q-card-section>
        <q-separator/>
        <q-card-section v-html="iframe">
        </q-card-section>
        <q-separator/>
        <q-card-actions align="right">
          <q-btn dense flat label="Cerrar"  @click="showPrintNote = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script src="./services.js"></script>

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

  tr { cursor:pointer;
    &.selected {
      color:#fff;
      background:#0f0;
      td:after, td:before { background:none }
    }
  }

</style>
