/*
 * Copyright 2017 The Closure Compiler Authors.
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
 * @fileoverview Test cases for array_prototype_slice_to_array_from RefasterJs
 * template.
 * @suppress {unusedLocalVariables}
 */

goog.provide('refactoring_testcase');

/**
 * @param {!IArrayLike} arrLike The array-like object.
 */
refactoring_testcase.slice_no_args = function(arrLike) {
  // Generic array-like object.
  Array.prototype.slice.call(arrLike);

  // HTMLCollection.
  Array.prototype.slice.call(document.forms);

  // NodeList.
  Array.prototype.slice.call(document.querySelectorAll('*'));

  // Array.
  Array.prototype.slice.call([1, 2]);

  // String.
  Array.prototype.slice.call('string');
};

/**
 * @param {!IArrayLike} arrLike The array-like object.
 */
refactoring_testcase.slice_zero = function(arrLike) {
  // Generic array-like object.
  Array.prototype.slice.call(arrLike, 0);

  // HTMLCollection.
  Array.prototype.slice.call(document.forms, 0);

  // NodeList.
  Array.prototype.slice.call(document.querySelectorAll('*'), 0);

  // Array.
  Array.prototype.slice.call([1, 2], 0);

  // String.
  Array.prototype.slice.call('string');
};

/**
 * Ignore other types that are not array-like objects.
 */
refactoring_testcase.ignore_other_types = function() {
  // null.
  Array.prototype.slice.call(null);
  Array.prototype.slice.call(null, 0);

  // undefined.
  Array.prototype.slice.call(undefined);
  Array.prototype.slice.call(undefined, 0);
};
