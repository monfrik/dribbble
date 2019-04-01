
import { shallowMount } from '@vue/test-utils'
import MessageToggle from '@/components/MessageToggle.vue'

describe('MessageToggle.vue', () => {
  it('displays default message', () => {
    const wrapper = shallowMount(MessageToggle)
    expect(wrapper.text()).toContain('default message')
  })
})