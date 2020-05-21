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
    component: () => import('../views/findMusic/FindMusic.vue')
    // children: [{}]
  }
]

export default routes
