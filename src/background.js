const ls = browser.storage.local
let rageMode = false

async function init() {
  const { isOn } = await ls.get("isOn")
  const { isRage } = await ls.get("isRage")
  rageMode = isRage
  console.log(document.location.host)
  if ((isOn || isRage) && document.location.host === "nbatopshot.com") {
    clickBuyBtn()
  } else if (rageMode) {
    clickDapperBtn(50)
    console.log("DAPPER")
  }
}

init().then(console.log)

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function buy(n = 10) {
  if (n <= 0) return;
  const buttons = [...document.getElementsByTagName("button")]
  for (const button of buttons) {
    if (button.textContent.includes("Buy")) {
      button.click()
    }
  }
  await sleep(100)
  buy(n - 1)
}

function clickBuyBtn() {
  setTimeout(async () => await buy(50), 1000)
  window.onload = () => {
    buy(50)
  }
}

async function clickDapperBtn(n = 10) {
  if (n <= 0) return;
  const buttons = [...document.getElementsByTagName("button")]
  for (const button of buttons) {
    console.log(button.dataset, button.dataset["testid"])
    if (button.dataset["testid"] === "confirm-button") {
      button.click()
    }
  }
  await sleep(100)
  clickDapperBtn(n - 1)
}