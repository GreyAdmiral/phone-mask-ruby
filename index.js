// @ts-check
module.exports = function phoneMaskBYRU(sel) {
	document.addEventListener("DOMContentLoaded", function() {
		const selector = sel || "input[data-phone-input]",
			phoneInputs = document.querySelectorAll(selector);
		phoneInputs.forEach((it) => {
			it.addEventListener("keydown", onPhoneKeyDown);
			it.addEventListener("input", onPhoneInput);
			it.addEventListener("paste", onPhonePaste);
		});
	});
};
function getInputNumbersValue(input) {
	return input.value.replace(/\D/g, "");
}
function onPhonePaste(e) {
	const input = e.target,
		pasted = e.clipboardData;
	let inputNumbersValue = getInputNumbersValue(input);
	if (pasted) {
		const pastedText = pasted.getData("Text");
		if (/\D/g.test(pastedText)) {
			input.value = inputNumbersValue;
			return;
		}
	}
}
function onPhoneInput(e) {
	const input = e.target,
		selectionStart = input.selectionStart;
	let inputNumbersValue = getInputNumbersValue(input),
		formattedInputValue = "";
	if (!inputNumbersValue) {
		input.value = "";
		return;
	}
	if (input.value.length != selectionStart) {
		if (e.data && isNaN(+e.data)) {
			input.setSelectionRange(input.selectionStart - 1, input.selectionStart, "backward");
			input.setRangeText("");
		}
		return;
	}
	if (~["7", "8", "9"].indexOf(inputNumbersValue[0])) {
		if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
		const firstSymbols = inputNumbersValue[0] == "8" ? "8" : "+7";
		formattedInputValue = input.value = firstSymbols;
		if (inputNumbersValue.length > 1) {
			formattedInputValue += " (" + inputNumbersValue.substring(1, 4);
		}
		if (inputNumbersValue.length > 4) {
			formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
		}
		if (inputNumbersValue.length > 7) {
			formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
		}
		if (inputNumbersValue.length > 9) {
			formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
		}
	} else if (inputNumbersValue.startsWith("375")) {
		const firstSymbols = "+375";
		formattedInputValue = input.value = firstSymbols;
		if (inputNumbersValue.length > 3) {
			formattedInputValue += " (" + inputNumbersValue.substring(3, 5);
		}
		if (inputNumbersValue.length > 5) {
			formattedInputValue += ") " + inputNumbersValue.substring(5, 8);
		}
		if (inputNumbersValue.length > 8) {
			formattedInputValue += "-" + inputNumbersValue.substring(8, 10);
		}
		if (inputNumbersValue.length > 10) {
			formattedInputValue += "-" + inputNumbersValue.substring(10, 12);
		}
	} else {
		if (inputNumbersValue) {
			formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
		}
	}
	input.value = formattedInputValue;
}

function onPhoneKeyDown(e) {
	const inputValue = e.target.value.replace(/\D/g, "");
	if (e.keyCode == 8 && inputValue.length == 1) {
		e.target.value = "";
	}
}
