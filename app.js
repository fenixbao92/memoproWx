import codeAuth from 'utils/codeAuth.js'
import net from 'utils/net.js'
//app.js
App({
  globalData: {
    bindinfo: null
  },
  onLaunch: function() {
    codeAuth()
      .then(res => {
        net.httpClient.get("/wxproxy/getbindinfo").then(res => {
          this.globalData.bindinfo = res;
          console.log(res);
          if (this.bindInfoSuccessCallback) {
            this.bindInfoSuccessCallback(res);
          }
        }).catch(res=>{console.log(1111)});
      });
  },

})