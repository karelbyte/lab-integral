(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{"129a":function(t,e,a){"use strict";a.d(e,"a",(function(){return i})),a.d(e,"d",(function(){return n})),a.d(e,"b",(function(){return r})),a.d(e,"c",(function(){return o}));a("5df3"),a("1c4c"),a("34ef"),a("6b54"),a("06db");var i="/api",n=function(t,e){for(var a in e)e[a]=a===t};function s(t){return("0"+t.toString(16)).substr(-2)}var r=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"-",a=t.getMonth()<9?"0"+(t.getMonth()+1):t.getMonth()+1,i=t.getDate()<10?"0"+t.getDate():t.getDate();return t.getFullYear()+e+a+e+i},o=function(t){var e=new Uint8Array((t||40)/2);return window.crypto.getRandomValues(e),Array.from(e,s).join("")}},"474f":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-dialog",{attrs:{persistent:"","transition-show":"scale","transition-hide":"scale"},model:{value:t.showForm,callback:function(e){t.showForm=e},expression:"showForm"}},[a("q-card",{staticStyle:{width:"700px","max-width":"80vw"}},[a("q-card-section",{staticClass:"bg-red-5"},[t._v("\n      "+t._s(t.title)+"\n    ")]),a("q-separator"),a("q-card-section",[a("p",[t._v("Seguro que desea eliminar: "),t._l(t.targets_,(function(e){return a("b",{key:e},[t._v(" "+t._s(t.item[e])+" ")])})),t._v(" ?")],2),a("p",[t._v("Esta operación es irrevercible!")])]),a("q-separator"),a("q-card-actions",{attrs:{align:"right"}},[""!==t.item.description?a("q-btn",{attrs:{dense:"",label:"Eliminar",color:"negative"},on:{click:t.eraser}}):t._e(),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{dense:"",flat:"",label:"Cerrar"},on:{click:t.close}})],1)],1)],1)},n=[],s=(a("28a5"),a("129a")),r={name:"DeleteItem",props:["showFormDelete","url","item","title","targets"],data:function(){return{showForm:!1}},computed:{targets_:function(){return this.targets.indexOf(",")>0?this.targets.split(","):[this.targets]}},watch:{showFormDelete:function(){this.showForm=this.showFormDelete}},methods:{eraser:function(){var t=this;this.$axios.post(s["a"]+this.url,{id:this.item.id}).then((function(e){t.$noty.positive(e.data),t.$emit("updateList")})).catch((function(e){t.$emit("updateList"),t.$noty.negative(e.response.data)}))},close:function(){this.$emit("updateList")}}},o=r,l=a("2877"),c=a("24e8"),d=a("f09f"),u=a("a370"),p=a("eb85"),m=a("4b7e"),f=a("9c40"),h=a("7f67"),g=a("eebe"),b=a.n(g),v=Object(l["a"])(o,i,n,!1,null,null,null);e["a"]=v.exports;b()(v,"components",{QDialog:c["a"],QCard:d["a"],QCardSection:u["a"],QSeparator:p["a"],QCardActions:m["a"],QBtn:f["a"]}),b()(v,"directives",{ClosePopup:h["a"]})},"560a":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:" q-pa-md"},[a("div",{staticClass:"gt-xs row flex"},[a("q-breadcrumbs",{staticClass:"text-grey"},[a("q-breadcrumbs-el",{attrs:{label:"Almacen"}}),a("q-breadcrumbs-el",{attrs:{label:"Medidas"}})],1)],1),a("div",{staticClass:"row"},[a("div",{staticClass:"col-lg-8 col-xs-12"},[a("q-btn",{attrs:{color:"primary",label:"Nueva"},on:{click:t.newItem}})],1),a("div",{staticClass:"col-lg-4 col-xs-12 flex flex-inline"},[a("q-input",{staticStyle:{width:"49%"},attrs:{dense:"",autofocus:"",label:"filtro..."},model:{value:t.filter.val,callback:function(e){t.$set(t.filter,"val",e)},expression:"filter.val"}}),a("q-select",{staticStyle:{width:"50%"},attrs:{dense:"",options:t.filerOptions,label:"filtro por..."},scopedSlots:t._u([{key:"option",fn:function(e){return[a("q-item",t._g(t._b({},"q-item",e.itemProps,!1),e.itemEvents),[a("q-item-section",[a("q-item-label",{attrs:{caption:""}},[t._v(t._s(e.opt.label))])],1)],1)]}}]),model:{value:t.filter.field,callback:function(e){t.$set(t.filter,"field",e)},expression:"filter.field"}})],1)]),a("div",{staticClass:"row flex"},[a("div",{staticClass:"col-lg-12 col-xs-12 q-mt-xs"},[a("q-card",[a("q-separator"),a("q-card-section",{staticClass:"section-fix"},[a("q-table",{attrs:{flat:"",data:t.datas,columns:t.columns,"row-key":"id",loading:t.loading,pagination:t.pagination,"no-data-label":t.dataLabel,"binary-state-sort":""},on:{"update:pagination":function(e){t.pagination=e},request:t.getList},scopedSlots:t._u([{key:"body-cell-actions",fn:function(e){return[a("q-td",{attrs:{props:e}},[a("q-btn",{staticClass:"q-mr-xs",attrs:{dense:"",color:"secondary",icon:"fa fa-edit"},on:{click:function(a){return t.editItem(e.row)}}}),a("q-btn",{attrs:{dense:"",color:"negative",icon:"fa fa-eraser"},on:{click:function(a){return t.eraserShow(e.row)}}})],1)]}}])})],1)],1)],1)]),a("delete-item",{attrs:{showFormDelete:t.showFormDelete,item:t.item,title:"Eliminar Unidad de medida",url:"/measures/eraser",targets:"description"},on:{updateList:t.updateOfEraser}}),a("q-dialog",{attrs:{persistent:"","transition-show":"scale","transition-hide":"scale"},model:{value:t.showForm,callback:function(e){t.showForm=e},expression:"showForm"}},[a("q-card",{staticStyle:{width:"700px","max-width":"80vw"}},[a("q-card-section",[t._v("\n        "+t._s(t.titleForm)+"\n      ")]),a("q-separator"),a("q-card-section",[a("q-input",{attrs:{outlined:"",autofocus:"",label:"Introduce la unidad de medida"},model:{value:t.item.description,callback:function(e){t.$set(t.item,"description",e)},expression:"item.description"}})],1),a("q-separator"),a("q-card-actions",{attrs:{align:"right"}},[""!==t.item.description?a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{dense:"",label:"Guardar",color:"positive"},on:{click:t.saveItem}}):t._e(),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{dense:"",flat:"",label:"Cerrar"}})],1)],1)],1)],1)},n=[],s=(a("8e6e"),a("8a81"),a("ac6a"),a("cadf"),a("06db"),a("456d"),a("c47a")),r=a.n(s),o=a("129a"),l=a("474f");function c(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function d(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?c(Object(a),!0).forEach((function(e){r()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var u={name:"Measures",components:{DeleteItem:l["a"]},data:function(){return{pagination:{sortBy:"description",descending:!0,page:1,rowsPerPage:10,rowsNumber:0},datas:[],columns:[{name:"description",required:!0,label:"DESCRIPCION",align:"left",field:"description",headerClasses:"bg-primary text-white",sortable:!0},{name:"actions",label:"ACCIONES",field:"",align:"center",headerClasses:"bg-primary text-white"}],act:"post",dataLabel:"Cargando datos...",showForm:!1,showFormDelete:!1,titleForm:"",filter:{field:{value:"description",label:"Descripcion",type:"text"},val:""},filerOptions:[{value:"description",label:"Descripcion",type:"text"}],loading:!1,item:{id:0,description:""},itemClear:{id:0,description:""}}},watch:{"filter.field.value":function(){this.getList({pagination:this.pagination})},"filter.val":function(){this.getList({pagination:this.pagination})}},mounted:function(){this.getList({pagination:this.pagination})},methods:{getList:function(t){var e=this,a={pagination:t.pagination,filter:this.filter};this.dataLabel="Cargando datos...",this.loading=!0,this.$axios.post(o["a"]+"/measures/list",a).then((function(a){e.datas=a.data.list,e.dataLabel=e.datas.length>=0?"":"No hay datos que mostrar...",e.pagination=t.pagination,e.pagination.rowsNumber=a.data.total,e.loading=!1}))},newItem:function(){this.act="post",this.titleForm="Añadir unidad de medida",this.item=d({},this.itemClear),this.showForm=!0},editItem:function(t){this.act="update",this.titleForm="Editar unidad de medida",this.item=d({},t),this.showForm=!0},saveItem:function(){var t=this;this.$axios({method:"post",url:o["a"]+"/measures/"+this.act,data:this.item}).then((function(e){t.$noty.positive(e.data),t.getList({pagination:t.pagination})}))},eraserShow:function(t){this.item=d({},t),this.showFormDelete=!0},updateOfEraser:function(){this.showFormDelete=!1,this.getList({pagination:this.pagination})}}},p=u,m=(a("de85"),a("2877")),f=a("9989"),h=a("ead5"),g=a("079e"),b=a("9c40"),v=a("27f9"),w=a("ddd8"),q=a("66e5"),y=a("4074"),x=a("0170"),C=a("f09f"),O=a("eb85"),F=a("a370"),_=a("eaac"),D=a("db86"),Q=a("24e8"),S=a("4b7e"),k=a("7f67"),I=a("eebe"),L=a.n(I),P=Object(m["a"])(p,i,n,!1,null,"4f50205c",null);e["default"]=P.exports;L()(P,"components",{QPage:f["a"],QBreadcrumbs:h["a"],QBreadcrumbsEl:g["a"],QBtn:b["a"],QInput:v["a"],QSelect:w["a"],QItem:q["a"],QItemSection:y["a"],QItemLabel:x["a"],QCard:C["a"],QSeparator:O["a"],QCardSection:F["a"],QTable:_["a"],QTd:D["a"],QDialog:Q["a"],QCardActions:S["a"]}),L()(P,"directives",{ClosePopup:k["a"]})},"90c0":function(t,e,a){},de85:function(t,e,a){"use strict";var i=a("90c0"),n=a.n(i);n.a}}]);