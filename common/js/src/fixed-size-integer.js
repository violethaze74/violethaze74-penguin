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

goog.provide('GoogleSmartCard.FixedSizeInteger');

goog.require('goog.math.Integer');

goog.scope(function() {

/** @const */
var GSC = GoogleSmartCard;

/**
 * Casts the passed value to the signed 32-bit integer.
 * @param {number} value
 * @return {number}
 */
GSC.FixedSizeInteger.castToInt32 = function(value) {
  return goog.math.Integer.fromNumber(value).toInt();
};

});  // goog.scope
