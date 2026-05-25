# phone-mask-ruby

> The plugin activates the mask when entering phone numbers. Belarusian, Russian and Ukrainian numbers are supported, the rest are introduced without a mask.

## Install

#### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/phone-mask-ruby@2.1.0/dist/phone-mask-native.min.js"></script>
```

or

```html
<script src="https://unpkg.com/phone-mask-ruby@2.1.0/dist/phone-mask-native.min.js"></script>
```

#### Import

Run the command in the console

```shell
npm i phone-mask-ruby
```

Perform the import

```javascript
const phoneMaskRUBY = require('phone-mask-ruby');
```

or

```javascript
import phoneMaskRUBY from 'phone-mask-ruby';
```

## Option (selector)

Type: `string`<br>
Default: `input[data-phone-input]`<br>

The selector of the input fields of telephone numbers (you can also use the text input field).

## Usage

#### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/phone-mask-ruby@2.1.0/dist/phone-mask-native.min.js"></script>

...

<script>
   phoneMaskRUBY();
</script>
```

or

```html
<script src="https://unpkg.com/phone-mask-ruby@2.1.0/dist/phone-mask-native.min.js"></script>

...

<script>
   phoneMaskRUBY('your-selector');
</script>
```

#### Import

```javascript
const phoneMaskRUBY = require('phone-mask-ruby');

phoneMaskRUBY('your-selector');
```

or

```javascript
const phoneMaskRUBY = require('phone-mask-ruby');

phoneMaskRUBY();
```

## Note

Many thanks for the main idea and help to the web-developer Alexei Goloburdin.
