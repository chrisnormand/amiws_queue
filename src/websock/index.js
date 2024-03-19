const WS = {}
WS.sock = null
WS.store = null

WS.install = function (Vue, store) {
  this.sock = new WebSocket(process.env.WS_URL)
  this.store = store

  this.sock.onopen = () => {
    store.commit('WS_CONNECTED', true)
    this.sock.send(JSON.stringify({ Action: 'CoreStatus' }))
    this.sock.send(JSON.stringify({ Action: 'QueueStatus' }))
  }

  this.sock.onmessage = (ev) => {
    this.store.dispatch('newMessage', ev.data)
  }

  this.sock.onclose = (ev) => {
    store.commit('WS_CONNECTED', false)
    setTimeout(() => { WS.install(Vue, this.store) }, 3000)
  }

  this.sock.onerror = (err) => {
    store.commit('ERROR_MSG', `Socket encountered error: ${err.message}. Closing socket`)
    this.sock.close()
  }

  // public method
  Vue.websockSend = (jsonMsg) => {
    this.sock.send(jsonMsg)
  }

  // instance methods
  Vue.prototype.$wsSend = function (msg) {}
}

export default WS
