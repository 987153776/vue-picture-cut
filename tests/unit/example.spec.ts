import { shallowMount } from '@vue/test-utils'
import VuePictureCut from '@/lib/vue-picture-cut.vue'

describe('VuePictureCut.vue', () => {
  it('renders props.msg when passed', () => {
    const show = true
    const wrapper = shallowMount(VuePictureCut, {
      propsData: { show }
    })
    expect(wrapper.text()).toBe(show)
  })
})
