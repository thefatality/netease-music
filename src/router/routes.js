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
  }
]

export default routes
