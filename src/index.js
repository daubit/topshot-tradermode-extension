const $ = require("jquery");

const storage = browser.storage.local;
const API_URL = "https://api.waxsweden.org:443/v2/history/get_actions";

var body = {
    account_name: "yznbq.wam",
    skip: 0,
    limit: 100,
};

var buttonOn = {
    value: false,
};

var rageOn = {
    value: false,
};

var memo = {
    seed: "",
};

var timestamp = {
    date: -1,
};

var isOn, isRage;

const weekVal = 7 * 24 * 60 * 60 * 1000;

const random = (length = 10) => {
    return Math.random().toString(16).substring(2, length);
};

async function init() {
    storage.get("memo").then(initMemo).catch(console.log);
    const hasDonated = await checkDonation();
    if (!hasDonated) {
        disableButton(true);
        alertDonate();
        setTime(-1);
    } else {
        storage.get("timestamp").then(initTimestamp).catch(console.log);
        storage.get("buttonOn").then(initTradeButton).catch(console.log);
        storage.get("rageOn").then(initRageButton).catch(console.log);
        disableButton(false);
    }
}

function alertDonate() {
    $("#status").css("display", "visible").text("No donation found!")
}

function disableButton(state) {
    document.querySelector("#rageCheckBox").disabled = state;
    document.querySelector("#traderCheckBox").disabled = state;
}

function initTimestamp(time) {
    console.log(time)
    if (time.timestamp === undefined || time.timestamp.date === undefined) {
        alertDonate();
        setTime(-1);
    } else {
        setTime(time.timestamp.date);
    }
}

function initMemo(data) {
    if (data.memo === undefined || data.memo.seed === undefined) {
        setSeed(random());
    } else {
        setSeed(data.memo.seed);
    }
    $("#waxText").text(memo.seed)
}

function initTradeButton(item) {
    if (item.buttonOn === undefined) {
        setToggle(false);
    } else {
        value = item.buttonOn.value;
        document.querySelector("#traderCheckBox").checked = value;
        setToggle(value);
    }
}

function initRageButton(item) {
    if (item.rageOn === undefined) {
        setRage(false);
    } else {
        let value = item.rageOn.value;
        document.querySelector("#rageCheckBox").checked = value;
        setRage(value);
        if (value) {
            document.querySelector("#traderCheckBox").checked = !value;
            setToggle(false);
        }
    }
}

async function checkDonation() {
    if (new Date().getTime() - (await getTime()) < weekVal) return true;
    let skip = 0;
    let found = false;
    let next = true;
    let till = new Date();
    till.setTime(till.getTime() - weekVal)
    const memo = await getSeed();

    while (!found && next) {
        const account = body.account_name
        const limit = body.limit
        const request = `${API_URL}?skip=${skip}&limit=${limit}&account=${account}`
        var result = await fetch(request).then((val) => val.json())
            .catch((e) => {
                console.log(e);
                alertDonate();
                return null;
            });
        if (!result) {
            return false
        }
        console.log(result)
        const actionRes = getActions(result, memo, till);
        found = actionRes.found
        next = actionRes.next
        skip += 100;
    }
    console.log(found)
    return found;
}

function getActions(raw_actions, memo, till) {
    let actions = raw_actions.actions || [];
    if (actions.length === 0) return { found: false, next: false };
    for (const action of actions) {
        const { act, timestamp } = action;
        console.log(act, action,)
        const actionTime = new Date(timestamp).getTime()
        if (till.getTime() > actionTime) {
            return { found: false, next: false };
        }
        if (act !== undefined &&
            act.data !== null &&
            new String(act.data.memo)
                .replace("\n", "")
                .replace("\n", "") === memo.seed) {
            setTime(actionTime + 2 * 60 * 60 * 1000);
            return { found: true, next: false };
        }
    }
    return { found: false, next: true };
}

async function setSeed(seed) {
    memo.seed = seed;
    storage.set({ memo });
}

async function getSeed() {
    return await storage.get("memo").then((val) => {
        return val.memo;
    });
}

function setTime(time) {
    timestamp.date = time;
    storage.set({ timestamp });
}

async function getTime() {
    return await storage.get("timestamp").then((val) => {
        if (val.timestamp) return val.timestamp.date;
        return null;
    });
}

function setToggle(value) {
    isOn = value;
    buttonOn.value = value;
    storage.set({ buttonOn });
    document.querySelector("#traderCheckBox").checked = value;
    if (isOn) setRage(false);
}

function setRage(value) {
    isRage = value;
    rageOn.value = value;
    storage.set({ rageOn });
    document.querySelector("#rageCheckBox").checked = value;
    if (isRage) setToggle(false);
}

document.getElementById("traderToggle").onchange = () => {
    setToggle(!isOn);
};

document.getElementById("rageToggle").onchange = () => {
    setRage(!isRage);
};

// Update the count down every 1 second
setInterval(async function () {
    const now = new Date().getTime();
    const date = await getTime();
    const distance = weekVal - (now - date);
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
        alertDonate();
    } else {
        document.getElementById("status").textContent =
            days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
        document.getElementById("status").style.color = "#04df04";
    }
}, 1000);

init().catch(console.log);