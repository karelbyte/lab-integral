(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{"11cc":function(e,t,a){},afb8:function(e,t,a){"use strict";var i=a("11cc"),s=a.n(i);s.a},f5c3:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{staticClass:" q-pa-md"},[a("div",{staticClass:"gt-xs row flex"},[a("q-breadcrumbs",{staticClass:"text-grey"},[a("q-breadcrumbs-el",{attrs:{label:"Almacen"}}),a("q-breadcrumbs-el",{attrs:{label:"Proveedores"}})],1)],1),a("div",{staticClass:"row"},[a("div",{staticClass:"col-lg-8 col-xs-12"},[a("q-btn",{attrs:{color:"primary",label:"Nuevo"},on:{click:e.newItem}})],1),a("div",{staticClass:"col-lg-4 col-xs-12 flex flex-inline"},[a("q-input",{staticStyle:{width:"49%"},attrs:{dense:"",autofocus:"",label:"filtro..."},model:{value:e.filter.val,callback:function(t){e.$set(e.filter,"val",t)},expression:"filter.val"}}),a("q-select",{staticStyle:{width:"50%"},attrs:{dense:"",options:e.filerOptions,label:"filtro por..."},scopedSlots:e._u([{key:"option",fn:function(t){return[a("q-item",e._g(e._b({},"q-item",t.itemProps,!1),t.itemEvents),[a("q-item-section",[a("q-item-label",{attrs:{caption:""}},[e._v(e._s(t.opt.label))])],1)],1)]}}]),model:{value:e.filter.field,callback:function(t){e.$set(e.filter,"field",t)},expression:"filter.field"}})],1)]),a("div",{staticClass:"row flex"},[a("div",{staticClass:"col-lg-12 col-xs-12 q-mt-xs"},[a("q-card",[a("q-separator"),a("q-card-section",{staticClass:"section-fix"},[a("q-table",{attrs:{flat:"",data:e.datas,columns:e.columns,"row-key":"id",loading:e.loading,pagination:e.pagination,"no-data-label":e.dataLabel,"binary-state-sort":""},on:{"update:pagination":function(t){e.pagination=t},request:e.getList},scopedSlots:e._u([{key:"body-cell-actions",fn:function(t){return[a("q-td",{attrs:{props:t}},[a("q-btn",{staticClass:"q-mr-xs",attrs:{dense:"",color:"secondary",icon:"fa fa-edit"},on:{click:function(a){return e.editItem(t.row)}}}),a("q-btn",{attrs:{dense:"",color:"negative",icon:"fa fa-eraser"},on:{click:function(a){return e.eraserShow(t.row)}}})],1)]}}])})],1)],1)],1)]),a("delete-item",{attrs:{showFormDelete:e.showFormDelete,item:e.item,title:"Eliminar proveedor",url:"/providers/eraser",targets:"names"},on:{updateList:e.updateOfEraser}}),a("q-dialog",{attrs:{persistent:"","transition-show":"scale","transition-hide":"scale"},model:{value:e.showForm,callback:function(t){e.showForm=t},expression:"showForm"}},[a("q-card",{staticStyle:{width:"700px","max-width":"80vw"}},[a("q-card-section",[e._v("\n        "+e._s(e.titleForm)+"\n      ")]),a("q-separator"),a("q-card-section",[a("q-input",{staticClass:"q-mb-xs",attrs:{dense:"",outlined:"",autofocus:"",label:"Nombres"},model:{value:e.item.names,callback:function(t){e.$set(e.item,"names",t)},expression:"item.names"}}),a("q-input",{staticClass:"q-mb-xs",attrs:{dense:"",outlined:"",label:"Direccion"},model:{value:e.item.address,callback:function(t){e.$set(e.item,"address",t)},expression:"item.address"}}),a("q-input",{staticClass:"q-mb-xs",attrs:{dense:"",outlined:"",label:"Correo"},model:{value:e.item.email,callback:function(t){e.$set(e.item,"email",t)},expression:"item.email"}}),a("q-input",{directives:[{name:"only-int-numbers",rawName:"v-only-int-numbers"}],attrs:{dense:"",outlined:"",label:"Telefono"},model:{value:e.item.tel,callback:function(t){e.$set(e.item,"tel",t)},expression:"item.tel"}})],1),a("q-separator"),a("q-card-actions",{attrs:{align:"right"}},[e.validateSave?a("q-btn",{attrs:{dense:"",label:"Guardar",color:"positive"},on:{click:e.saveItem}}):e._e(),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{dense:"",flat:"",label:"Cerrar"}})],1)],1)],1)],1)},s=[],n=(a("8e6e"),a("8a81"),a("ac6a"),a("cadf"),a("06db"),a("456d"),a("c47a")),r=a.n(n),o=a("129a"),l=a("474f");function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function d(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(Object(a),!0).forEach((function(t){r()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var m={name:"Providers",components:{DeleteItem:l["a"]},data:function(){return{pagination:{sortBy:"names",descending:!0,page:1,rowsPerPage:10,rowsNumber:0},datas:[],columns:[{name:"names",required:!0,label:"NOMBRES",align:"left",field:"names",headerClasses:"bg-primary text-white",sortable:!0},{name:"address",required:!0,label:"DIRECCION",align:"left",field:"address",headerClasses:"bg-primary text-white",sortable:!0},{name:"email",required:!0,label:"CORREO",align:"left",field:"email",headerClasses:"bg-primary text-white",sortable:!0},{name:"tel",required:!0,label:"TELEFONO",align:"left",field:"tel",headerClasses:"bg-primary text-white",sortable:!0},{name:"actions",label:"ACCIONES",field:"",align:"center",headerClasses:"bg-primary text-white"}],act:"post",dataLabel:"Cargando datos...",showForm:!1,showFormDelete:!1,titleForm:"",filter:{field:{value:"names",label:"Nombres",type:"text"},val:""},filerOptions:[{value:"names",label:"Nombres",type:"text"},{value:"address",label:"Direccion",type:"text"}],loading:!1,item:{id:0,names:"",address:"",email:"",tel:""},itemClear:{id:0,names:"",address:"",email:"",tel:""}}},watch:{"filter.field.value":function(){this.getList({pagination:this.pagination})},"filter.val":function(){this.getList({pagination:this.pagination})}},mounted:function(){this.getList({pagination:this.pagination})},computed:{validateSave:function(){return""!==this.item.names&&""!==this.item.address&&""!==this.item.email}},methods:{getList:function(e){var t=this,a={pagination:e.pagination,filter:this.filter};this.dataLabel="Cargando datos...",this.loading=!0,this.$axios.post(o["a"]+"/providers/list",a).then((function(a){t.datas=a.data.list,t.dataLabel=t.datas.length>=0?"":"No hay datos que mostrar...",t.pagination=e.pagination,t.pagination.rowsNumber=a.data.total,t.loading=!1}))},newItem:function(){this.act="post",this.titleForm="Añadir proveedor",this.item=d({},this.itemClear),this.showForm=!0},editItem:function(e){this.act="update",this.titleForm="Editar proveedor",this.item=d({},e),this.showForm=!0},saveItem:function(){var e=this;this.$axios({method:"post",url:o["a"]+"/providers/"+this.act,data:this.item}).then((function(t){e.$noty.positive(t.data),e.getList({pagination:e.pagination}),e.showForm=!1})).catch((function(t){e.$noty.positive(t.response.data)}))},eraserShow:function(e){this.item=d({},e),this.showFormDelete=!0},updateOfEraser:function(){this.showFormDelete=!1,this.getList({pagination:this.pagination})}}},p=m,u=(a("afb8"),a("2877")),f=a("9989"),b=a("ead5"),h=a("079e"),g=a("9c40"),v=a("27f9"),w=a("ddd8"),q=a("66e5"),y=a("4074"),x=a("0170"),C=a("f09f"),O=a("eb85"),k=a("a370"),F=a("eaac"),S=a("db86"),Q=a("24e8"),E=a("4b7e"),P=a("7f67"),D=a("eebe"),I=a.n(D),L=Object(u["a"])(p,i,s,!1,null,"65ad0830",null);t["default"]=L.exports;I()(L,"components",{QPage:f["a"],QBreadcrumbs:b["a"],QBreadcrumbsEl:h["a"],QBtn:g["a"],QInput:v["a"],QSelect:w["a"],QItem:q["a"],QItemSection:y["a"],QItemLabel:x["a"],QCard:C["a"],QSeparator:O["a"],QCardSection:k["a"],QTable:F["a"],QTd:S["a"],QDialog:Q["a"],QCardActions:E["a"]}),I()(L,"directives",{ClosePopup:P["a"]})}}]);