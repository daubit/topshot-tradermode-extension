var isOn, isRage;
const ls = browser.storage.local

function init() {
    ls.get("isOn").then((item) => { setTrader(item.isOn) })
    ls.get("isRage").then((item) => { setRage(item.isRage) })
}

function setTrader(value) {
    if (value === undefined) value = false
    isOn = value;
    ls.set({ isOn })
    document.querySelector("#traderCheckBox").checked = value;
    if (isOn) setRage(false);
}

function setRage(value) {
    if (value === undefined) value = false
    isRage = value;
    ls.set({ isRage })
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