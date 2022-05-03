console.log("Enter content scripts");
var counter = 0;

const myStorage = browser.storage.local;
myStorage.get("buttonOn").then((value) => {
  console.log("Toggle")
  if (value.buttonOn.value) {
    setTimeout(() => clickBuyBtn(), 800);
  }
});
myStorage.get("rageOn").then((value) => {
  console.log("Toggle")
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

function clickBuyBtn() {
  if (counter++ > 10) return;
  const buyBtn = window.document.getElementsByClassName(
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

function clickConfirmBtn() {
  const confirmBtn = window.document.getElementsByClassName(
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

function rageClickBuyBtn() {
  const buyBtn = window.document.getElementsByClassName(
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

function rageClickConfirmBtn() {
  const confirmBtn = window.document.getElementsByClassName(
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

function rageDapperBuyBtn() {
  console.log('Enter Dapper Function')
  const buyBtn = window.document.getElementsByClassName("css-ftq8xn");
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
