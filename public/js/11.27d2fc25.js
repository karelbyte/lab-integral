(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[11],{"129a":function(e,a,t){"use strict";t.d(a,"a",(function(){return i})),t.d(a,"c",(function(){return s})),t.d(a,"b",(function(){return r}));t("5df3"),t("1c4c"),t("34ef"),t("6b54"),t("06db");var i="/api",s=function(e,a){for(var t in a)a[t]=t===e};function n(e){return("0"+e.toString(16)).substr(-2)}var r=function(e){var a=new Uint8Array((e||40)/2);return window.crypto.getRandomValues(a),Array.from(a,n).join("")}},"97d6":function(e,a,t){"use strict";t.r(a);var i=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("q-page",{staticClass:" q-pa-md"},[t("div",{staticClass:"gt-xs row flex"},[t("q-breadcrumbs",{staticClass:"text-grey"},[t("q-breadcrumbs-el",{attrs:{label:"Almacen"}}),t("q-breadcrumbs-el",{attrs:{label:"Inventarios"}})],1)],1),t("div",{staticClass:"row"},[t("div",{staticClass:"col-lg-8 col-xs-12"}),t("div",{staticClass:"col-lg-4 col-xs-12 flex flex-inline"},[t("q-input",{staticStyle:{width:"49%"},attrs:{dense:"",autofocus:"",label:"filtro..."},model:{value:e.filter.val,callback:function(a){e.$set(e.filter,"val",a)},expression:"filter.val"}}),t("q-select",{staticStyle:{width:"50%"},attrs:{dense:"",options:e.filerOptions,label:"filtro por..."},scopedSlots:e._u([{key:"option",fn:function(a){return[t("q-item",e._g(e._b({},"q-item",a.itemProps,!1),a.itemEvents),[t("q-item-section",[t("q-item-label",{attrs:{caption:""}},[e._v(e._s(a.opt.label))])],1)],1)]}}]),model:{value:e.filter.field,callback:function(a){e.$set(e.filter,"field",a)},expression:"filter.field"}})],1)]),t("div",{staticClass:"row flex"},[t("div",{staticClass:"col-lg-12 col-xs-12 q-mt-xs"},[t("q-card",[t("q-separator"),t("q-card-section",{staticClass:"section-fix"},[t("q-table",{attrs:{flat:"",data:e.datas,columns:e.columns,"row-key":"id",loading:e.loading,pagination:e.pagination,"no-data-label":e.dataLabel,"binary-state-sort":""},on:{"update:pagination":function(a){e.pagination=a},request:e.getList},scopedSlots:e._u([{key:"body-cell-actions",fn:function(a){return[t("q-td",{attrs:{props:a}},[t("q-btn",{staticClass:"q-mr-xs",attrs:{dense:"",color:"secondary",icon:"fa fa-file-pdf"},on:{click:function(t){return e.editItem(a.row)}}})],1)]}}])})],1)],1)],1)])])},s=[],n=t("129a"),r={name:"inventories",data:function(){return{pagination:{sortBy:"names",descending:!0,page:1,rowsPerPage:10,rowsNumber:0},datas:[],errors:[],columns:[{name:"code",required:!0,label:"CODIGO",align:"left",field:"code",headerClasses:"bg-primary text-white",sortable:!0},{name:"names",required:!0,label:"NOMBRES",align:"left",field:"names",headerClasses:"bg-primary text-white",sortable:!0},{name:"measure_id",required:!0,label:"MEDIDA",align:"left",field:"measure",headerClasses:"bg-primary text-white",sortable:!0},{name:"category_id",required:!0,label:"CATEGORIA",align:"left",field:"category",headerClasses:"bg-primary text-white",sortable:!0},{name:"sale_price",required:!0,label:"PRECIO",align:"left",field:"sale_price",headerClasses:"bg-primary text-white",sortable:!0},{name:"cant",required:!0,label:"Existencia",align:"left",field:"cant",headerClasses:"bg-primary text-white",sortable:!0},{name:"actions",label:"ACCIONES",field:"",align:"center",headerClasses:"bg-primary text-white"}],act:"post",dataLabel:"Cargando datos...",withCant:!1,cantSendToInventory:0,showForm:!1,showFormDelete:!1,titleForm:"",filter:{field:{value:"products.names",label:"Nombres",type:"text"},val:""},filerOptions:[{value:"products.names",label:"Nombres",type:"text"},{value:"code",label:"Codigo",type:"text"}],loading:!1,item:{id:0,code:"",names:"",measure_id:null,category_id:null,sale_price:0,purchase_price:0,providers:[]},itemClear:{id:0,code:"",names:"",measure_id:null,category_id:null,sale_price:0,purchase_price:0,providers:[]},measures:[],categories:[],providers:[]}},watch:{"filter.field.value":function(){this.getList({pagination:this.pagination})},"filter.val":function(){this.getList({pagination:this.pagination})}},mounted:function(){this.getList({pagination:this.pagination})},methods:{getList:function(e){var a=this,t={pagination:e.pagination,filter:this.filter};this.dataLabel="Cargando datos...",this.loading=!0,this.$axios.post(n["a"]+"/inventories/list",t).then((function(t){a.datas=t.data.list,a.dataLabel=a.datas.length>=0?"":"No hay datos que mostrar...",a.pagination=e.pagination,a.pagination.rowsNumber=t.data.total,a.loading=!1}))}}},l=r,o=(t("acda"),t("2877")),d=t("eebe"),c=t.n(d),u=t("9989"),f=t("ead5"),p=t("079e"),m=t("27f9"),b=t("ddd8"),g=t("66e5"),h=t("4074"),v=t("0170"),w=t("f09f"),y=t("eb85"),C=t("a370"),q=t("eaac"),x=t("db86"),_=t("9c40"),Q=Object(o["a"])(l,i,s,!1,null,"7dc5b082",null);a["default"]=Q.exports;c()(Q,"components",{QPage:u["a"],QBreadcrumbs:f["a"],QBreadcrumbsEl:p["a"],QInput:m["a"],QSelect:b["a"],QItem:g["a"],QItemSection:h["a"],QItemLabel:v["a"],QCard:w["a"],QSeparator:y["a"],QCardSection:C["a"],QTable:q["a"],QTd:x["a"],QBtn:_["a"]})},acda:function(e,a,t){"use strict";var i=t("af56"),s=t.n(i);s.a},af56:function(e,a,t){}}]);