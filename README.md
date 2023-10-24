# phone-mask-ruby

> The plugin activates the mask when entering phone numbers. Belarusian and Russian numbers are supported, the rest are introduced without a mask.

## Install

```shell
npm i phone-mask-ruby
```

## Import

```javascript
const phoneMaskRUBY = require("phone-mask-ruby");
```
or

```javascript
import phoneMaskRUBY from 'phone-mask-ruby'
```

## Option (selector)

Type: `string`<br>
Default: `input[data-phone-input]`<br>

The selector of the input fields of telephone numbers (you can also use the text input field).

## Usage

```javascript
const phoneMaskRUBY = require("phone-mask-ruby");

phoneMaskRUBY("your-selector");
```

or

```javascript
const phoneMaskRUBY = require("phone-mask-ruby");

phoneMaskRUBY();
```

## Note

Many thanks for the main idea and help to the web-developer Alexei Goloburdin.