const ls = browser.storage.local
var rageMode = false

async function init() {
  const { isOn } = await ls.get("isOn")
  const { isRage } = await ls.get("isRage")
  rageMode = isRage
  if (isOn || isRage) {
    clickBuyBtn()
  }
}

init().then(console.log)

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function buy(n = 10) {
  if (n <= 0) return false;
  const buttons = [...document.getElementsByTagName("button")]
  for (const button of buttons) {
    if (button.textContent.includes("Buy")) {
      button.click()
    }
  }
  await sleep(100)
  console.log("Buy button is not available");
  if (buy(n - 1)) {
    console.log("FOUND!")
  }
}

function clickBuyBtn() {
  setTimeout(async () => await buy(50), 1000)
  window.onload = () => {
    console.log("Loading")
    buy(50)
  }
}
