// @ts-check
const options = require("./phonemasks.json");
module.exports = function (sel) {
	document.addEventListener("DOMContentLoaded", function () {
		const selector = sel || "input[data-phone-input]",
			phoneInputs = document.querySelectorAll(selector);
		options["handleEvent"] = onPhoneInput;
		phoneInputs.forEach((it) => {
			it.addEventListener("keydown", onPhoneKeyDown);
			it.addEventListener("input", options);
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
		renderMask(firstSymbols, this.ru);
	} else if (inputNumbersValue.startsWith("375")) {
		const firstSymbols = "+375";
		renderMask(firstSymbols, this.by);
	} else {
		if (inputNumbersValue) {
			formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
		}
	}
	input.value = formattedInputValue;
	function renderMask(firstSymbols, opt) {
		formattedInputValue = input.value = firstSymbols;
		if (inputNumbersValue.length > +opt.fb.from) {
			formattedInputValue += " (" + inputNumbersValue.substring(+opt.fb.from, +opt.fb.to);
		}
		if (inputNumbersValue.length > +opt.sb.from) {
			formattedInputValue += ") " + inputNumbersValue.substring(+opt.sb.from, +opt.sb.to);
		}
		if (inputNumbersValue.length > +opt.fn.from) {
			formattedInputValue += "-" + inputNumbersValue.substring(+opt.fn.from, +opt.fn.to);
		}
		if (inputNumbersValue.length > +opt.sn.from) {
			formattedInputValue += "-" + inputNumbersValue.substring(+opt.sn.from, +opt.sn.to);
		}
	}
}
function onPhoneKeyDown(e) {
	const inputValue = e.target.value.replace(/\D/g, "");
	if (e.keyCode == 8 && inputValue.length == 1) {
		e.target.value = "";
	}
}
