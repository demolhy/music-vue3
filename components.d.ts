// generated by unplugin-vue-components
// We suggest you to commit this file into source control
// Read more: https://github.com/vuejs/core/pull/3399
import '@vue/runtime-core'

export {}

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ElCarousel: typeof import('element-plus/es')['ElCarousel']
    ElCarouselItem: typeof import('element-plus/es')['ElCarouselItem']
    ElSlider: typeof import('element-plus/es')['ElSlider']
    Footer: typeof import('./src/components/Footer.vue')['default']
    LeftItem: typeof import('./src/components/LeftItem.vue')['default']
    Loading: typeof import('./src/components/Loading.vue')['default']
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
    TopItem: typeof import('./src/components/TopItem.vue')['default']
  }
  export interface ComponentCustomProperties {
    vInfiniteScroll: typeof import('element-plus/es')['ElInfiniteScroll']
    vLoading: typeof import('element-plus/es')['ElLoadingDirective']
  }
}
