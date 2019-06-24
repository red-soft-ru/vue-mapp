
export default {
  data: () => ({
    os: '',
    devType: '',
  }),
  created() {
    this.setAgentInfo()
  },
  methods: {
    setAgentInfo() {
      const agent = navigator.userAgent || navigator.vendor
      let devType, os

      if (agent.match(/Android/i)) {
        os = 'android'
        devType = 'mobile'
      } else if (agent.match(/iPhone|iPad|iPod/i)) {
        os = 'ios'
        devType = 'mobile'
      } else if (agent.match(/BlackBerry/i)) {
        os = 'blackberry'
        devType = 'mobile'
      } else if (agent.match(/Windows Phone/i)) {
        os = 'windowsphone'
        devType = 'mobile'
      } else if (agent.match(/webOS/i)) {
        os = 'webos'
        devType = 'media'
      } else if (agent.match(/Mac/)) {
        os = 'mac'
        devType = 'desktop'
      } else if (agent.match(/Linux/i)) {
        os = 'linux'
        devType = 'desktop'
      } else if (agent.match(/Windows/i)) {
        os = 'windows'
        devType = 'desktop'
      }

      this.os = os
      this.devType = devType
    },
  },
}
