console.log("Enter content scripts");
var counter = 0;

myStorage = browser.storage.local;
myStorage.get("buttonOn").then((value) => {
  if (value.buttonOn.value) {
    setTimeout(() => clickBuyBtn(), 800);
  }
});
myStorage.get("rageOn").then((value) => {
  if (value.rageOn.value) {
    setTimeout(() => rageClickBuyBtn(), 800);
  }
});
instant().catch(console.log);

function instant() {
  browser.runtime.onMessage.addListener((request) => {
    console.log("Request: " + request.command);
    if (request.command === "buy") {
      clickBuyBtn();
    } else if ((request.command = "rage")) {
      setTimeout(() => rageClickBuyBtn(), 800);
    }
    return true;
  });
}

async function clickBuyBtn() {
  if (counter++ > 10) return;
  var buyBtn = await window.document.getElementsByClassName(
    "ButtonBase__StyledButton-sc-1qgxh2e-0 gjCpfL Button__StyledButton-ig3kkl-1 fXrqGh"
  );
  if (buyBtn[0] !== undefined) {
    buyBtn[0].click();
    clickConfirmBtn();
  } else {
    setTimeout(function () {
      clickBuyBtn();
    }, 0.0001 * 1000);

    console.log("Buy button is not available\nTrying again...");
  }
}

async function clickConfirmBtn() {
  var confirmBtn = await window.document.getElementsByClassName(
    "ButtonBase__StyledButton-sc-1qgxh2e-0 gjCpfL Button__StyledButton-ig3kkl-1 GJBBL"
  );
  if (confirmBtn[0] !== undefined) {
    confirmBtn[0].click();
  } else {
    setTimeout(clickConfirmBtn, 0.0001 * 1000);
    console.log("Confirm button is not available\nTrying again...");
  }
}

/**
 * Those functions work similar to the normal functions.
 * This workflow below works for the rage mode
 */

async function rageClickBuyBtn() {
  var buyBtn = await window.document.getElementsByClassName(
    "ButtonBase__StyledButton-sc-1qgxh2e-0 gjCpfL Button__StyledButton-ig3kkl-1 fXrqGh"
  );
  if (buyBtn[0] !== undefined) {
    buyBtn[0].click();
    rageClickConfirmBtn();
  } else {
    setTimeout(function () {
      rageClickBuyBtn();
    }, 0.0001 * 1000);

    console.log("Buy button is not available\nTrying again...");
  }
}

async function rageClickConfirmBtn() {
  var confirmBtn = await window.document.getElementsByClassName(
    "ButtonBase__StyledButton-sc-1qgxh2e-0 gjCpfL Button__StyledButton-ig3kkl-1 GJBBL"
  );
  if (confirmBtn[0] !== undefined) {
    confirmBtn[0].click();
    setTimeout(rageDapperBuyBtn, 14 * 1000);
  } else {
    setTimeout(rageClickConfirmBtn, 0.0001 * 1000);
    console.log("Confirm button is not available\nTrying again...");
  }
}

async function rageDapperBuyBtn() {
  console.log('Enter Dapper Function')
  var buyBtn = await window.document.getElementsByClassName("css-ftq8xn");
  if (buyBtn[0] !== undefined) {
    console.log('Dapper button found')
    buyBtn[0].click();
  } else {
    setTimeout(function () {
      rageDapperBuyBtn();
    }, 0.0001 * 1000);
    console.log("Dapper button is not available\nTrying again...");
  }
}
