const routes = [
  {
    path: '/',
    redirect: {
      name: 'findMusic'
    }
  },
  {
    path: '/findmusic',
    name: 'findMusic',
    component: () => import('../views/findMusic/Index.vue')
    // children: [{}]
  },
  {
    path: '/searchres',
    name: 'searchRes',
    component: () => import('../views/SearchRes/Index.vue')
  }
]

export default routes
