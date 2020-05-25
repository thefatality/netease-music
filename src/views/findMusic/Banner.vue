<template>
  <div id="find-music-banner">
    <swiper ref="swiper" :options="swiperOptions" class="swiper-box">
      <swiper-slide
        class="swiper-slide"
        v-for="banner in banners"
        :key="banner.scm"
      >
        <img
          :src="banner.imageUrl"
          class="slide-img"
          @click="bannerClickHandler(banner.targetId)"
        >
      </swiper-slide>
    </swiper>
    <div
      class="swiper-pagination"
      slot="pagination"
      @click="pageClickHandler"
      ref="pagination"
    />
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { mapMutations } from 'vuex'

export default {
  name: 'Banner',
  data () {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'bullet',
          bulletActiveClass: 'bullet-active'
        },
        autoplay: {
          disableOnInteraction: false,
          delay: 1500
        },
        initialSlide: 2,
        speed: 500,
        loop: true,
        slidesPerView: 1.4,
        effect: 'coverflow', // 可以实现3D效果的轮播,
        centeredSlides: true, // 设定为true时，active slide会居中，而不是默认状态下的居左。
        coverflowEffect: {
          rotate: 0,
          stretch: 1,
          depth: 150,
          slideShadows: true
        }
      },
      banners: []
    }
  },
  mounted () {
    this._getBanners()
  },
  components: {
    Swiper,
    SwiperSlide
  },
  methods: {
    ...mapMutations([
      'setCurrentSong'
    ]),
    bannerClickHandler (targetId) {
      if (targetId === 0) {
        return
      }
      this._getSongUrl(targetId)
        .then(res => {
          const song = res.data[0]
          this.setCurrentSong(song)
        })
    },
    pageClickHandler (e) {
      if (e.target.tagName.toLowerCase() !== 'span') {
        return
      }
      let index = -1
      Array.from(this.$refs.pagination.children).every((dom, i) => {
        if (dom === e.target) {
          index = i
          return false
        }
        return true
      })
      if (index !== -1) {
        this.$refs.swiper.$swiper.slideToLoop(index, this.swiperOptions.speed)
      }
    },
    _getBanners () {
      this.axios.get('/banner?type=0')
        .then((res) => {
          this.banners = res.banners
        })
        .catch((err) => {
          console.log(err)
        })
    },
    _getSongUrl (targetId) {
      return this.axios.get(`/song/url?id=${targetId}`)
    }
  }
}
</script>

<style scoped lang="less">
  #find-music-banner {
    position: relative;
    padding-bottom: 16px;

    .swiper-box {
      .swiper-slide {
        .slide-img {
          width: 540px;
          height: 200px;
          cursor: pointer;
        }
      }
    }
    .swiper-pagination{
      width: 100%;
      text-align: center;
    }
  }
</style>

<style lang="less">
  .swiper-pagination {
    .bullet{
      margin-right: 6px;
      display: inline-block;
      width: 17px;
      height: 2px;
      background: rgb(200,200,200);
      cursor: pointer;
    }
  }
</style>
