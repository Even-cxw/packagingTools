!function (e, o) { "object" == typeof exports && "object" == typeof module ? module.exports = o() : "function" == typeof define && define.amd ? define([], o) : "object" == typeof exports ? exports.even = o() : e.even = o() }(self, (function () { return console.log("我是a模块"), console.log("我是b模块"), {} }));