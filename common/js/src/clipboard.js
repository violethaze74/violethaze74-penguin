/** @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview This file contains helper definitions for operating with the
 * system clipboard.
 */

goog.provide('GoogleSmartCard.Clipboard');

goog.require('GoogleSmartCard.Logging');
goog.require('goog.dom');
goog.require('goog.log.Logger');

goog.scope(function() {

/** @const */
var GSC = GoogleSmartCard;

/**
 * @type {!goog.log.Logger}
 * @const
 */
var logger = GSC.Logging.getScopedLogger('Clipboard');

/**
 * Copies the passed text to the clipboard.
 *
 * The text may contain the \n characters as a delimiter for multiple lines.
 * @param {string} text
 * @return {boolean}
 */
GSC.Clipboard.copyToClipboard = function(text) {
  var element = goog.dom.createDom('textarea', {'textContent': text});
  document.body.appendChild(element);
  element.select();
  var success = document.execCommand('copy');
  document.body.removeChild(element);

  if (!success) {
    logger.severe(
        'Failed to copy the text of ' + text.length + ' bytes to clipboard');
    return false;
  }
  logger.fine('Copied text of ' + text.length + ' bytes to clipboard');
  return true;
};

});  // goog.scope
