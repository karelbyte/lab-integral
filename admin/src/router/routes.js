
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/clientes',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Clients.vue') }
    ]
  },
  {
    path: '/doctores',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Doctors.vue') }
    ]
  },
  {
    path: '/services',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/services/Services.vue') }
    ]
  },
  {
    path: '/analisis',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Analysis.vue') }
    ]
  },
  {
    path: '/existencias',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Inventories.vue') }
    ]
  },
  {
    path: '/recepcion',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Reception.vue') }
    ]
  },
  {
    path: '/productos',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Products.vue') }
    ]
  },
  {
    path: '/proveedores',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Providers.vue') }
    ]
  },
  {
    path: '/medidas',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Measures.vue') }
    ]
  },
  {
    path: '/categorias',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Categories.vue') }
    ]
  },
  {
    path: '/test',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/test.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
