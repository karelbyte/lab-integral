(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[9],{"129a":function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"d",(function(){return s})),a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return n}));a("5df3"),a("1c4c"),a("34ef"),a("6b54"),a("06db");var i="/api",s=function(e,t){for(var a in t)t[a]=a===e};function r(e){return("0"+e.toString(16)).substr(-2)}var o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"-",a=e.getMonth()<9?"0"+(e.getMonth()+1):e.getMonth()+1,i=e.getDate()<10?"0"+e.getDate():e.getDate();return e.getFullYear()+t+a+t+i},n=function(e){var t=new Uint8Array((e||40)/2);return window.crypto.getRandomValues(t),Array.from(t,r).join("")}},"18a9":function(e,t,a){"use strict";var i=a("8b22"),s=a.n(i);s.a},"474f":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-dialog",{attrs:{persistent:"","transition-show":"scale","transition-hide":"scale"},model:{value:e.showForm,callback:function(t){e.showForm=t},expression:"showForm"}},[a("q-card",{staticStyle:{width:"700px","max-width":"80vw"}},[a("q-card-section",{staticClass:"bg-red-5"},[e._v("\n      "+e._s(e.title)+"\n    ")]),a("q-separator"),a("q-card-section",[a("p",[e._v("Seguro que desea eliminar: "),e._l(e.targets_,(function(t){return a("b",{key:t},[e._v(" "+e._s(e.item[t])+" ")])})),e._v(" ?")],2),a("p",[e._v("Esta operación es irrevercible!")])]),a("q-separator"),a("q-card-actions",{attrs:{align:"right"}},[""!==e.item.description?a("q-btn",{attrs:{dense:"",label:"Eliminar",color:"negative"},on:{click:e.eraser}}):e._e(),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{dense:"",flat:"",label:"Cerrar"},on:{click:e.close}})],1)],1)],1)},s=[],r=(a("28a5"),a("129a")),o={name:"DeleteItem",props:["showFormDelete","url","item","title","targets"],data:function(){return{showForm:!1}},computed:{targets_:function(){return this.targets.indexOf(",")>0?this.targets.split(","):[this.targets]}},watch:{showFormDelete:function(){this.showForm=this.showFormDelete}},methods:{eraser:function(){var e=this;this.$axios.post(r["a"]+this.url,{id:this.item.id}).then((function(t){e.$noty.positive(t.data),e.$emit("updateList")})).catch((function(t){e.$emit("updateList"),e.$noty.negative(t.response.data)}))},close:function(){this.$emit("updateList")}}},n=o,l=a("2877"),c=a("24e8"),d=a("f09f"),u=a("a370"),p=a("eb85"),m=a("4b7e"),h=a("9c40"),f=a("7f67"),b=a("eebe"),g=a.n(b),v=Object(l["a"])(n,i,s,!1,null,null,null);t["a"]=v.exports;g()(v,"components",{QDialog:c["a"],QCard:d["a"],QCardSection:u["a"],QSeparator:p["a"],QCardActions:m["a"],QBtn:h["a"]}),g()(v,"directives",{ClosePopup:f["a"]})},"6eb0":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{staticClass:" q-pa-md"},[a("div",{staticClass:"gt-xs row flex"},[a("q-breadcrumbs",{staticClass:"text-grey"},[a("q-breadcrumbs-el",{attrs:{label:"Almacen"}}),a("q-breadcrumbs-el",{attrs:{label:"Productos"}})],1)],1),a("div",{staticClass:"row"},[a("div",{staticClass:"col-lg-8 col-xs-12"},[a("q-btn",{attrs:{color:"primary",label:"Nuevo"},on:{click:e.newItem}})],1),a("div",{staticClass:"col-lg-4 col-xs-12 flex flex-inline"},[a("q-input",{staticStyle:{width:"49%"},attrs:{dense:"",autofocus:"",label:"filtro..."},model:{value:e.filter.val,callback:function(t){e.$set(e.filter,"val",t)},expression:"filter.val"}}),a("q-select",{staticStyle:{width:"50%"},attrs:{dense:"",options:e.filerOptions,label:"filtro por..."},scopedSlots:e._u([{key:"option",fn:function(t){return[a("q-item",e._g(e._b({},"q-item",t.itemProps,!1),t.itemEvents),[a("q-item-section",[a("q-item-label",{attrs:{caption:""}},[e._v(e._s(t.opt.label))])],1)],1)]}}]),model:{value:e.filter.field,callback:function(t){e.$set(e.filter,"field",t)},expression:"filter.field"}})],1)]),a("div",{staticClass:"row flex"},[a("div",{staticClass:"col-lg-12 col-xs-12 q-mt-xs"},[a("q-card",[a("q-separator"),a("q-card-section",{staticClass:"section-fix"},[a("q-table",{attrs:{flat:"",data:e.datas,columns:e.columns,"row-key":"id",loading:e.loading,pagination:e.pagination,"no-data-label":e.dataLabel,"binary-state-sort":""},on:{"update:pagination":function(t){e.pagination=t},request:e.getList},scopedSlots:e._u([{key:"body-cell-actions",fn:function(t){return[a("q-td",{attrs:{props:t}},[a("q-btn",{staticClass:"q-mr-xs",attrs:{dense:"",color:"secondary",icon:"fa fa-edit"},on:{click:function(a){return e.editItem(t.row)}}}),a("q-btn",{attrs:{dense:"",color:"negative",icon:"fa fa-eraser"},on:{click:function(a){return e.eraserShow(t.row)}}})],1)]}}])})],1)],1)],1)]),a("delete-item",{attrs:{showFormDelete:e.showFormDelete,item:e.item,title:"Eliminar producto",url:"/products/eraser",targets:"names"},on:{updateList:e.updateOfEraser}}),a("q-dialog",{attrs:{persistent:"","transition-show":"scale","transition-hide":"scale"},model:{value:e.showForm,callback:function(t){e.showForm=t},expression:"showForm"}},[a("q-card",{staticStyle:{width:"700px","max-width":"80vw"}},[a("q-card-section",[e._v("\n        "+e._s(e.titleForm)+"\n      ")]),a("q-separator"),a("q-card-section",[a("div",{staticClass:"row"},[a("div",{staticClass:"col-lg-6 col-xs-12"},[a("q-input",{staticClass:"q-mb-md",attrs:{dense:"",outlined:"",autofocus:"",label:"Codigo"},model:{value:e.item.code,callback:function(t){e.$set(e.item,"code",t)},expression:"item.code"}}),a("q-input",{staticClass:"q-mb-md",attrs:{dense:"",outlined:"",label:"Nombres"},model:{value:e.item.names,callback:function(t){e.$set(e.item,"names",t)},expression:"item.names"}}),a("q-select",{staticClass:"q-mb-md",attrs:{dense:"",outlined:"",options:e.measures,label:"Medida","emit-value":"","option-label":"description","option-value":"id","map-options":""},model:{value:e.item.measure_id,callback:function(t){e.$set(e.item,"measure_id",t)},expression:"item.measure_id"}}),a("q-select",{staticClass:"q-mb-md",attrs:{dense:"",outlined:"",options:e.categories,label:"Categoria","emit-value":"","option-label":"description","option-value":"id","map-options":""},model:{value:e.item.category_id,callback:function(t){e.$set(e.item,"category_id",t)},expression:"item.category_id"}}),a("q-input",{directives:[{name:"only-numbers",rawName:"v-only-numbers"}],staticClass:"q-mb-md",attrs:{dense:"",outlined:"",label:"Precio de compra"},model:{value:e.item.purchase_price,callback:function(t){e.$set(e.item,"purchase_price",t)},expression:"item.purchase_price"}}),a("q-input",{directives:[{name:"only-numbers",rawName:"v-only-numbers"}],staticClass:"q-mb-md",attrs:{dense:"",outlined:"",label:"Precio de venta"},model:{value:e.item.sale_price,callback:function(t){e.$set(e.item,"sale_price",t)},expression:"item.sale_price"}})],1),a("div",{staticClass:"col-lg-6 col-xs-12 q-pl-sm"},[a("q-card",[a("q-card-section",[e._v("\n                Provedores\n              ")]),a("q-separator"),a("q-card-section",[a("q-scroll-area",{staticStyle:{height:"235px"}},[a("q-option-group",{attrs:{options:e.providers,label:"Proveedores",type:"checkbox"},model:{value:e.item.providers,callback:function(t){e.$set(e.item,"providers",t)},expression:"item.providers"}})],1)],1)],1)],1)]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-lg-12 col-xs-12"},["post"===e.act?a("q-checkbox",{attrs:{label:"Añadir cantidad a existencias"},model:{value:e.withCant,callback:function(t){e.withCant=t},expression:"withCant"}}):e._e(),e.withCant?a("q-input",{attrs:{dense:"",outlined:"",autofocus:"",label:"Cantidad a enviar"},model:{value:e.cantSendToInventory,callback:function(t){e.cantSendToInventory=t},expression:"cantSendToInventory"}}):e._e()],1)])]),a("q-separator"),a("q-card-actions",{attrs:{align:"right"}},[e.IsSaveWard()?a("q-btn",{attrs:{dense:"",label:"Guardar",color:"positive"},on:{click:function(t){return e.saveItem()}}}):e._e(),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{dense:"",flat:"",label:"Cerrar"}})],1)],1)],1)],1)},s=[],r=(a("8e6e"),a("8a81"),a("ac6a"),a("cadf"),a("06db"),a("456d"),a("c47a")),o=a.n(r),n=a("129a"),l=a("474f");function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function d(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(Object(a),!0).forEach((function(t){o()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var u={name:"products",components:{DeleteItem:l["a"]},data:function(){return{pagination:{sortBy:"names",descending:!0,page:1,rowsPerPage:10,rowsNumber:0},datas:[],errors:[],columns:[{name:"code",required:!0,label:"CODIGO",align:"left",field:"code",headerClasses:"bg-primary text-white",sortable:!0},{name:"names",required:!0,label:"NOMBRES",align:"left",field:"names",headerClasses:"bg-primary text-white",sortable:!0},{name:"measure_id",required:!0,label:"MEDIDA",align:"left",field:"measure",headerClasses:"bg-primary text-white",sortable:!0},{name:"category_id",required:!0,label:"CATEGORIA",align:"left",field:"category",headerClasses:"bg-primary text-white",sortable:!0},{name:"sale_price",required:!0,label:"PRECIO",align:"left",field:"sale_price",headerClasses:"bg-primary text-white",sortable:!0},{name:"actions",label:"ACCIONES",field:"",align:"center",headerClasses:"bg-primary text-white"}],act:"post",dataLabel:"Cargando datos...",withCant:!1,cantSendToInventory:0,showForm:!1,showFormDelete:!1,titleForm:"",filter:{field:{value:"names",label:"Nombres",type:"text"},val:""},filerOptions:[{value:"names",label:"Nombres",type:"text"},{value:"code",label:"Codigo",type:"text"}],loading:!1,item:{id:0,code:"",names:"",measure_id:null,category_id:null,sale_price:0,purchase_price:0,providers:[]},itemClear:{id:0,code:"",names:"",measure_id:null,category_id:null,sale_price:0,purchase_price:0,providers:[]},measures:[],categories:[],providers:[]}},watch:{"filter.field.value":function(){this.getList({pagination:this.pagination})},"filter.val":function(){this.getList({pagination:this.pagination})}},mounted:function(){this.getList({pagination:this.pagination})},methods:{getList:function(e){var t=this,a={pagination:e.pagination,filter:this.filter};this.dataLabel="Cargando datos...",this.loading=!0,this.$axios.post(n["a"]+"/products/list",a).then((function(a){t.datas=a.data.list,t.dataLabel=t.datas.length>=0?"":"No hay datos que mostrar...",t.pagination=e.pagination,t.pagination.rowsNumber=a.data.total,t.loading=!1}))},newItem:function(){var e=this;this.act="post",this.withCant=!1,this.cantSendToInventory=0,this.titleForm="Añadir producto",this.$axios.get(n["a"]+"/products/resources").then((function(t){e.item=d({},e.itemClear),e.providers=t.data.providers,e.categories=t.data.categories,e.measures=t.data.measures,e.showForm=!0}))},editItem:function(e){var t=this;this.act="update",this.withCant=!1,this.titleForm="Editar producto",this.$axios.get(n["a"]+"/products/resources").then((function(a){t.item=d({},e),t.providers=a.data.providers,t.categories=a.data.categories,t.measures=a.data.measures,t.showForm=!0}))},saveItem:function(){var e=this;this.item.providers=this.item.providers.map((function(e){return{provider_id:e}})),this.withCant&&!isNaN(this.cantSendToInventory)&&(this.item.with_cant=this.withCant,this.item.cant=this.cantSendToInventory),this.$axios({method:"post",url:n["a"]+"/products/"+this.act,data:this.item}).then((function(t){e.$noty.positive(t.data),e.getList({pagination:e.pagination}),e.showForm=!1})).catch((function(t){t.response.data.hasOwnProperty("errors")?e.errors=t.response.data.errors:(e.$noty.negative(t.response.data),e.showForm=!1)}))},eraserShow:function(e){this.item=d({},e),this.showFormDelete=!0},updateOfEraser:function(){this.showFormDelete=!1,this.getList({pagination:this.pagination})},IsSaveWard:function(){var e=""!==this.item.names,t=""!==this.item.code,a=null!==this.item.measure_id,i=null!==this.item.category_id,s=0!==this.item.sale_price,r=this.item.providers.length>0;return e&&a&&t&&i&&s&&r}}},p=u,m=(a("18a9"),a("2877")),h=a("9989"),f=a("ead5"),b=a("079e"),g=a("9c40"),v=a("27f9"),w=a("ddd8"),q=a("66e5"),y=a("4074"),C=a("0170"),_=a("f09f"),x=a("eb85"),O=a("a370"),S=a("eaac"),k=a("db86"),F=a("24e8"),I=a("4983"),Q=a("9f0a"),$=a("8f8e"),D=a("4b7e"),P=a("7f67"),E=a("eebe"),L=a.n(E),N=Object(m["a"])(p,i,s,!1,null,"61f7f3b7",null);t["default"]=N.exports;L()(N,"components",{QPage:h["a"],QBreadcrumbs:f["a"],QBreadcrumbsEl:b["a"],QBtn:g["a"],QInput:v["a"],QSelect:w["a"],QItem:q["a"],QItemSection:y["a"],QItemLabel:C["a"],QCard:_["a"],QSeparator:x["a"],QCardSection:O["a"],QTable:S["a"],QTd:k["a"],QDialog:F["a"],QScrollArea:I["a"],QOptionGroup:Q["a"],QCheckbox:$["a"],QCardActions:D["a"]}),L()(N,"directives",{ClosePopup:P["a"]})},"8b22":function(e,t,a){}}]);