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