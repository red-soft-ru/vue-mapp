import throttle from 'lodash/throttle'
import { disablePageScroll, enablePageScroll } from 'scroll-lock'

const VIEWPORT_LOCK_CLASS = 'viewport-lock'

export default {
  data: () => ({
    width: 0,
    height: 0,
    screen: '',
    breakpoints: {
      sm: 768,
      md: 1024,
      lg: 1440,
      xl: 1920,
    },
  }),
  created() {
    this.onResize()
    window.addEventListener('resize', throttle(this.onResize, 100))
  },
  beforeDestroy() {
    window.removeEventListener('resize', throttle(this.onResize, 100))
  },
  methods: {
    onResize() {
      this.height = window.innerHeight
      this.width = window.innerWidth

      this.setScreenParams()
    },
    setScreenParams() {
      const bp = this.breakpoints
      let screenWidth = window.innerWidth
      let screenMarker = ''

      if (screenWidth < bp.sm) {
        screenMarker = 'xs'
      } else if (screenWidth >= bp.sm && screenWidth < bp.md) {
        screenMarker = 'sm'
      } else if (screenWidth >= bp.md && screenWidth < bp.lg) {
        screenMarker = 'md'
      } else if (screenWidth >= bp.lg && screenWidth < bp.xl) {
        screenMarker = 'lg'
      } else if (screenWidth >= bp.xl) {
        screenMarker = 'xl'
      }

      this.screen = screenMarker
    },
    lockViewport() {
      const { documentElement } = document
      const scrollbarWidth = window.innerWidth - documentElement.clientWidth
      documentElement.classList.add(VIEWPORT_LOCK_CLASS)
      documentElement.style.marginRight = scrollbarWidth + 'px'
      disablePageScroll()
    },
    unlockViewport() {
      document.documentElement.classList.remove(VIEWPORT_LOCK_CLASS)
      document.documentElement.style.marginRight = null
      enablePageScroll()
    },
  },
}
