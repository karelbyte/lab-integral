(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{"129a":function(t,e,a){"use strict";a.d(e,"a",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"b",(function(){return r}));a("5df3"),a("1c4c"),a("34ef"),a("6b54"),a("06db");var i="/api",o=function(t,e){for(var a in e)e[a]=a===t};function s(t){return("0"+t.toString(16)).substr(-2)}var r=function(t){var e=new Uint8Array((t||40)/2);return window.crypto.getRandomValues(e),Array.from(e,s).join("")}},"462c":function(t,e,a){"use strict";var i=a("f7e9"),o=a.n(i);o.a},"474f":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-dialog",{attrs:{persistent:"","transition-show":"scale","transition-hide":"scale"},model:{value:t.showForm,callback:function(e){t.showForm=e},expression:"showForm"}},[a("q-card",{staticStyle:{width:"700px","max-width":"80vw"}},[a("q-card-section",{staticClass:"bg-red-5"},[t._v("\n      "+t._s(t.title)+"\n    ")]),a("q-separator"),a("q-card-section",[a("p",[t._v("Seguro que desea eliminar: "),a("b",[t._v(" "+t._s(t.item[t.target]))]),t._v(" ?")]),a("p",[t._v("Esta operación es irrevercible!")])]),a("q-separator"),a("q-card-actions",{attrs:{align:"right"}},[""!==t.item.description?a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{dense:"",label:"Eliminar",color:"negative"},on:{click:t.eraser}}):t._e(),a("q-btn",{attrs:{dense:"",flat:"",label:"Cerrar"},on:{click:t.close}})],1)],1)],1)},o=[],s=a("129a"),r={name:"DeleteItem",props:["showFormDelete","url","item","title","target"],data:function(){return{showForm:!1}},watch:{showFormDelete:function(){this.showForm=this.showFormDelete}},methods:{eraser:function(){var t=this;this.$axios.post(s["a"]+this.url,{id:this.item.id}).then((function(e){t.$noty.positive(e.data),t.$emit("updateList")}))},close:function(){this.$emit("updateList")}}},n=r,c=a("2877"),l=a("eebe"),d=a.n(l),p=a("24e8"),u=a("f09f"),f=a("a370"),m=a("eb85"),h=a("4b7e"),b=a("9c40"),g=a("7f67"),w=Object(c["a"])(n,i,o,!1,null,null,null);e["a"]=w.exports;d()(w,"components",{QDialog:p["a"],QCard:u["a"],QCardSection:f["a"],QSeparator:m["a"],QCardActions:h["a"],QBtn:b["a"]}),d()(w,"directives",{ClosePopup:g["a"]})},c5d2:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:" q-pa-md"},[a("div",{staticClass:"gt-xs row flex"},[a("q-breadcrumbs",{staticClass:"text-grey"},[a("q-breadcrumbs-el",{attrs:{label:"Almacen"}}),a("q-breadcrumbs-el",{attrs:{label:"Categorias"}})],1)],1),a("div",{staticClass:"row"},[a("div",{staticClass:"col-lg-8 col-xs-12"},[a("q-btn",{attrs:{color:"primary",label:"Nueva"},on:{click:t.newItem}})],1),a("div",{staticClass:"col-lg-4 col-xs-12 flex flex-inline"},[a("q-input",{staticStyle:{width:"49%"},attrs:{dense:"",autofocus:"",label:"filtro..."},model:{value:t.filter.val,callback:function(e){t.$set(t.filter,"val",e)},expression:"filter.val"}}),a("q-select",{staticStyle:{width:"50%"},attrs:{dense:"",options:t.filerOptions,label:"filtro por..."},scopedSlots:t._u([{key:"option",fn:function(e){return[a("q-item",t._g(t._b({},"q-item",e.itemProps,!1),e.itemEvents),[a("q-item-section",[a("q-item-label",{attrs:{caption:""}},[t._v(t._s(e.opt.label))])],1)],1)]}}]),model:{value:t.filter.field,callback:function(e){t.$set(t.filter,"field",e)},expression:"filter.field"}})],1)]),a("div",{staticClass:"row flex"},[a("div",{staticClass:"col-lg-12 col-xs-12 q-mt-xs"},[a("q-card",[a("q-separator"),a("q-card-section",{staticClass:"section-fix"},[a("q-table",{attrs:{flat:"",data:t.datas,columns:t.columns,"row-key":"id",loading:t.loading,pagination:t.pagination,"no-data-label":t.dataLabel,"binary-state-sort":""},on:{"update:pagination":function(e){t.pagination=e},request:t.getList},scopedSlots:t._u([{key:"body-cell-actions",fn:function(e){return[a("q-td",{attrs:{props:e}},[a("q-btn",{staticClass:"q-mr-xs",attrs:{dense:"",color:"secondary",icon:"fa fa-edit"},on:{click:function(a){return t.editItem(e.row)}}}),a("q-btn",{attrs:{dense:"",color:"negative",icon:"fa fa-eraser"},on:{click:function(a){return t.eraserShow(e.row)}}})],1)]}}])})],1)],1)],1)]),a("delete-item",{attrs:{showFormDelete:t.showFormDelete,item:t.item,title:"Eliminar Categoria",url:"/categories/eraser",target:"description"},on:{updateList:t.updateOfEraser}}),a("q-dialog",{attrs:{persistent:"","transition-show":"scale","transition-hide":"scale"},model:{value:t.showForm,callback:function(e){t.showForm=e},expression:"showForm"}},[a("q-card",{staticStyle:{width:"700px","max-width":"80vw"}},[a("q-card-section",[t._v("\n        "+t._s(t.titleForm)+"\n      ")]),a("q-separator"),a("q-card-section",[a("q-input",{attrs:{outlined:"",autofocus:"",label:"Introduce la unidad de medida"},model:{value:t.item.description,callback:function(e){t.$set(t.item,"description",e)},expression:"item.description"}})],1),a("q-separator"),a("q-card-actions",{attrs:{align:"right"}},[""!==t.item.description?a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{dense:"",label:"Guardar",color:"positive"},on:{click:t.saveItem}}):t._e(),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{dense:"",flat:"",label:"Cerrar"}})],1)],1)],1)],1)},o=[],s=(a("8e6e"),a("8a81"),a("ac6a"),a("cadf"),a("06db"),a("456d"),a("c47a")),r=a.n(s),n=a("129a"),c=a("474f");function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function d(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){r()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var p={name:"Categories",components:{DeleteItem:c["a"]},data:function(){return{pagination:{sortBy:"description",descending:!0,page:1,rowsPerPage:10,rowsNumber:0},datas:[],columns:[{name:"description",required:!0,label:"DESCRIPCION",align:"left",field:"description",headerClasses:"bg-primary text-white",sortable:!0},{name:"actions",label:"ACCIONES",field:"",align:"center",headerClasses:"bg-primary text-white"}],act:"post",dataLabel:"Cargando datos...",showForm:!1,showFormDelete:!1,titleForm:"",filter:{field:{value:"description",label:"Descripcion",type:"text"},val:""},filerOptions:[{value:"description",label:"Descripcion",type:"text"}],loading:!1,item:{id:0,description:""},itemClear:{id:0,description:""}}},watch:{"filter.field.value":function(){this.getList({pagination:this.pagination})},"filter.val":function(){this.getList({pagination:this.pagination})}},mounted:function(){this.getList({pagination:this.pagination})},methods:{getList:function(t){var e=this,a={pagination:t.pagination,filter:this.filter};this.dataLabel="Cargando datos...",this.loading=!0,this.$axios.post(n["a"]+"/categories/list",a).then((function(a){e.datas=a.data.list,e.dataLabel=e.datas.length>=0?"":"No hay datos que mostrar...",e.pagination=t.pagination,e.pagination.rowsNumber=a.data.total,e.loading=!1}))},newItem:function(){this.act="post",this.titleForm="Añadir categoria",this.item=d({},this.itemClear),this.showForm=!0},editItem:function(t){this.act="update",this.titleForm="Editar categoria",this.item=d({},t),this.showForm=!0},saveItem:function(){var t=this;this.$axios({method:"post",url:n["a"]+"/categories/"+this.act,data:this.item}).then((function(e){t.$noty.positive(e.data),t.getList({pagination:t.pagination})}))},eraserShow:function(t){this.item=d({},t),this.showFormDelete=!0},updateOfEraser:function(){this.showFormDelete=!1,this.getList({pagination:this.pagination})}}},u=p,f=(a("462c"),a("2877")),m=a("eebe"),h=a.n(m),b=a("9989"),g=a("ead5"),w=a("079e"),v=a("9c40"),q=a("27f9"),y=a("ddd8"),C=a("66e5"),x=a("4074"),O=a("0170"),F=a("f09f"),Q=a("eb85"),_=a("a370"),S=a("eaac"),D=a("db86"),k=a("24e8"),I=a("4b7e"),L=a("7f67"),P=Object(f["a"])(u,i,o,!1,null,"71a4c1fc",null);e["default"]=P.exports;h()(P,"components",{QPage:b["a"],QBreadcrumbs:g["a"],QBreadcrumbsEl:w["a"],QBtn:v["a"],QInput:q["a"],QSelect:y["a"],QItem:C["a"],QItemSection:x["a"],QItemLabel:O["a"],QCard:F["a"],QSeparator:Q["a"],QCardSection:_["a"],QTable:S["a"],QTd:D["a"],QDialog:k["a"],QCardActions:I["a"]}),h()(P,"directives",{ClosePopup:L["a"]})},f7e9:function(t,e,a){}}]);