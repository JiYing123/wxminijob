let WebIM = require("../../webim/utils/WebIM")["default"];
let msgType = require("msgtype");


module.exports = function (sendableMsg, type, myName) {
  // console.log(sendableMsg)
  // console.log('sendableMsg')
  var userdata = wx.getStorageSync(sendableMsg.body.from+"_");
  // console.log(userdata)
  // console.log(sendableMsg.body.from)
  var time = WebIM.time();
  var renderableMsg = {
    info: {
      from: sendableMsg.body.from,
      to: sendableMsg.body.to
    },
    username: sendableMsg.body.from == myName ? sendableMsg.body.to : sendableMsg.body.from,
    yourname: userdata.nick == "" || userdata.nick == null ? sendableMsg.body.from : userdata.nick,
    avatarurl: userdata.avatarurl == "" || userdata.avatarurl == null ? "" : userdata.avatarurl,
    msg: {
      type: type,
      url: sendableMsg.body.body.url,
      data: getMsgData(sendableMsg, type),
    },
    style: sendableMsg.body.from == myName ? "self" : "",
    time: time,
    mid: sendableMsg.type + sendableMsg.id
  };
  if (type == msgType.IMAGE) {
    renderableMsg.msg.size = {
      width: sendableMsg.body.body.size.width,
      height: sendableMsg.body.body.size.height,
    };
  }
  return renderableMsg;

  function getMsgData(sendableMsg, type) {
    if (type == msgType.TEXT) {
      return WebIM.parseEmoji(sendableMsg.value.replace(/\n/mg, ""));
    }
    else if (type == msgType.EMOJI) {
      return sendableMsg.value;
    }
    else if (type == msgType.IMAGE || type == msgType.VIDEO || type == msgType.AUDIO) {
      return sendableMsg.body.body.url;
    }
    return "";
  }
};
