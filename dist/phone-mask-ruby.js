var one = {
	fb: {
		from: "1",
		to: "4"
	},
	sb: {
		from: "4",
		to: "7"
	},
	fn: {
		from: "7",
		to: "9"
	},
	sn: {
		from: "9",
		to: "11"
	}
};
var two = {
	fb: {
		from: "2",
		to: "4"
	},
	sb: {
		from: "4",
		to: "7"
	},
	fn: {
		from: "7",
		to: "9"
	},
	sn: {
		from: "9",
		to: "11"
	}
};
var three = {
	fb: {
		from: "3",
		to: "5"
	},
	sb: {
		from: "5",
		to: "8"
	},
	fn: {
		from: "8",
		to: "10"
	},
	sn: {
		from: "10",
		to: "12"
	}
};
var options = {
	one: one,
	two: two,
	three: three
};

var oneSymbols = [
	"7",
	"8",
	"9"
];
var threeSymbols = [
	"375",
	"380"
];

/**
 * @param {string} [selector='input[data-phone-input]']
 */
function main (selector = 'input[data-phone-input]') {
   const init = () => {
      const phoneInputs = document.querySelectorAll(selector);

      options['handleEvent'] = onPhoneInput;

      for (const input of phoneInputs) {
         const isInput = input instanceof HTMLInputElement;

         if (!isInput) {
            console.error('phoneMaskNative: Элемент быть полем ввода! Элемент: ', input);
            continue;
         }

         const { type } = input;
         const isValidation = type === 'tel' || type === 'text';

         if (!isValidation) {
            console.error('phoneMaskNative: Поле ввода должно иметь атрибут type со значениями tel либо text! Поле: ', input);
            continue;
         }

         input.addEventListener('keydown', onPhoneKeyDown);
         input.addEventListener('input', options);
         input.addEventListener('paste', onPhonePaste);
      }
   };

   if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init, { once: true });
   } else {
      init();
   }
}

/**
 * @param {HTMLInputElement} input
 * @returns {string}
 */
function getInputNumbersValue(input) {
   return input.value.replace(/\D/g, '');
}

/**
 * @param {ClipboardEventInit} e
 */
function onPhonePaste(e) {
   const input = e.target;
   const pasted = e.clipboardData;
   let inputNumbersValue = getInputNumbersValue(input);

   if (pasted) {
      const pastedText = pasted.getData('Text');

      if (/\D/g.test(pastedText)) {
         input.value = inputNumbersValue;
         return;
      }
   }
}

function onPhoneInput(e) {
   const input = e.target;
   const selectionStart = input.selectionStart;
   let inputNumbersValue = getInputNumbersValue(input);
   let formattedInputValue = '';

   if (!inputNumbersValue) {
      input.value = '';
      return;
   }

   if (input.value.length != selectionStart) {
      if (e.data && isNaN(+e.data)) {
         input.setSelectionRange(input.selectionStart - 1, input.selectionStart, 'backward');
         input.setRangeText('');
      }
      return;
   }

   if (oneSymbols.includes(inputNumbersValue[0])) {
      if (inputNumbersValue[0] == '9') {
         inputNumbersValue = '7' + inputNumbersValue;
      }

      const firstSymbols = inputNumbersValue[0] == '8' ? '8' : '+7';
      renderMask(firstSymbols, this.one);
   } else if (isHasInArray(inputNumbersValue, threeSymbols)) {
      const firstSymbols = `+${inputNumbersValue.substring(0, 3)}`;
      renderMask(firstSymbols, this.three);
   } else {
      if (inputNumbersValue) {
         formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
      }
   }

   input.value = formattedInputValue;

   function renderMask(firstSymbols, opt) {
      formattedInputValue = input.value = firstSymbols;

      if (inputNumbersValue.length > +opt.fb.from) {
         formattedInputValue += ' (' + inputNumbersValue.substring(+opt.fb.from, +opt.fb.to);
      }

      if (inputNumbersValue.length > +opt.sb.from) {
         formattedInputValue += ') ' + inputNumbersValue.substring(+opt.sb.from, +opt.sb.to);
      }

      if (inputNumbersValue.length > +opt.fn.from) {
         formattedInputValue += '-' + inputNumbersValue.substring(+opt.fn.from, +opt.fn.to);
      }

      if (inputNumbersValue.length > +opt.sn.from) {
         formattedInputValue += '-' + inputNumbersValue.substring(+opt.sn.from, +opt.sn.to);
      }
   }
}

function onPhoneKeyDown(e) {
   const inputValue = e.target.value.replace(/\D/g, '');

   if (e.keyCode == 8 && inputValue.length == 1) {
      e.target.value = '';
   }
}

/**
 * @param {string} value
 * @param {string[]} array
 * @returns {boolean}
 */
function isHasInArray(value, array) {
   return array.some((num) => value.startsWith(num));
}

export { main as default };
