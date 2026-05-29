'use strict';

const NativeDOMException = globalThis.DOMException;

if (!NativeDOMException) {
  class DOMException extends Error {
    constructor(message, name) {
      super(message);
      this.name = name || 'DOMException';
    }
  }
  module.exports = DOMException;
} else {
  module.exports = NativeDOMException;
}
