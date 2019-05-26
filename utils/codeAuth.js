import net from "./net.js"

// function codeAuth() {
//   login()
//     .then(res => {
//       console.log("codeAuth1 get code:" + res);
//       return net.httpClient.post("/wxproxy/codeAuth", {
//         "code": res
//       });
//     })
//     .then(res => {
//       console.log("codeAuth2 get session:" + res);
//       wx.setStorageSync("sessionId", res);
//     });
// }

function codeAuth(){
  return new Promise((resolve, reject) => {
    login().
    then(res=>{
      console.log("codeAuth1 get code:" + res);
      return net.httpClient.post("/wxproxy/codeAuth", {"code":res});
    }).then(res=>{
      console.log("codeAuth2 get session:" + res);
      wx.setStorageSync("sessionId", res);
      resolve(res);
    })
  })
}

function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        if (res.code) {
          resolve(res.code);
        } else {
          reject();
        }
      }
    })
  })
}

module.exports = codeAuth;