const inputs = document.getElementsByTagName("input");

const otherChars = ["Delete", "Backspace", "ArrowLeft", "ArrowRight", "Home", "End"];
const numChars = otherChars.concat(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
const hexChars = numChars.concat(["a", "b", "c", "d", "e", "f", "A", "B", "C", "D", "E", "F"]);
const binChars = otherChars.concat(["0", "1"]);

// Iterate all <input> elements
for (let i = 0; i < inputs.length; i++) {
  let el = inputs[i];

  // When the <input> receives any input (typing & copy/paste)
  el.oninput = function(event) {

    if (this.value == "") {
      for (let j = 0; j < inputs.length; j++) {
        inputs[j].value = "";
      }

    } else {
      // Parse the value of the changed <input> to base 10
      switch(this.id) {
        case "int":
          value = parseInt(this.value, 10);
          break;
        case "bin":
          value = parseInt(this.value, 2);
          break;
        case "hex":
          value = parseInt(this.value, 16);
          break;
      }
    
      // Convert to other bases and put into other inputs
      for (let j = 0; j < inputs.length; j++) {
        let el2 = inputs[j];
        if (el2 != el) {
          switch(el2.id) {
            case "int":
              el2.value = value.toString(10);
              break;
            case "bin":
              el2.value = value.toString(2);
              break;
            case "hex":
              el2.value = value.toString(16).toUpperCase();
              break;
          }
        }
      }
    }
  }
}

// Array.includes() Polyfill
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {

      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        // c. Increase k by 1. 
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}