(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var isOn, isRage;
const ls = localStorage

function init() {
    setTrader(ls.getItem("isOn") === "true")
    setRage(ls.getItem("isRage") === "true")
}

function setTrader(value) {
    console.log("isOn", value)
    isOn = value;
    ls.setItem("isOn", isOn)
    document.querySelector("#traderCheckBox").checked = value;
    if (isOn) setRage(false);
}

function setRage(value) {
    console.log("isRage", value)
    isRage = value;
    ls.setItem("isRage", isRage)
    document.querySelector("#rageCheckBox").checked = value;
    if (isRage) setTrader(false);
}

document.getElementById("traderToggle").onchange = () => {
    setTrader(!isOn);
};

document.getElementById("rageToggle").onchange = () => {
    setRage(!isRage);
};


init()
},{}]},{},[1]);
