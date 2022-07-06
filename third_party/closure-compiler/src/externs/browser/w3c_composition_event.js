/*
 * Copyright 2018 The Closure Compiler Authors.
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
 * @fileoverview Definitions for W3C's Composition Events specification.
 * @externs
 */

/**
 * The `CompositionEvent` interface provides specific contextual information
 * associated with Composition Events.
 * @see https://www.w3.org/TR/uievents/#interface-compositionevent
 * @record
 * @extends {UIEventInit}
 */
function CompositionEventInit() {}

/**
 * `data` holds the value of the characters generated by an input method. This
 * MAY be a single Unicode character or a non-empty sequence of Unicode
 * characters. This attribute MAY be the empty string. The un-initialized value
 * of this attribute MUST be "" (the empty string).
 * @type {string}
 */
CompositionEventInit.prototype.data;

/**
 * Composition Events provide a means for inputing text in a supplementary or
 * alternate manner than by Keyboard Events, in order to allow the use of
 * characters that might not be commonly available on keyboard. For example,
 * Composition Events might be used to add accents to characters despite their
 * absence from standard US keyboards, to build up logograms of many Asian
 * languages from their base components or categories, to select word choices
 * from a combination of key presses on a mobile device keyboard, or to convert
 * voice commands into text using a speech recognition processor.
 *
 * Conceptually, a composition session consists of one `compositionstart` event,
 * one or more `compositionupdate` events, and one `compositionend` event, with
 * the value of the data attribute persisting between each stage of this event
 * chain during each session.
 *
 * Not all IME systems or devices expose the necessary data to the DOM, so the
 * active composition string (the "Reading Window" or "candidate selection" menu
 * option) might not be available through this interface, in which case the
 * selection MAY be represented by the empty string.
 *
 * @see https://www.w3.org/TR/uievents/#events-compositionevents
 * @param {string} type
 * @param {!CompositionEventInit=} opt_eventInitDict
 * @extends {UIEvent}
 * @constructor
 */
function CompositionEvent(type, opt_eventInitDict) {}

/**
 * Initializes attributes of a `CompositionEvent` object. This method has the
 * same behavior as `UIEvent.initUIEvent()`. The value of `detail` remains
 * undefined.
 *
 * @see https://www.w3.org/TR/uievents/#idl-interface-CompositionEvent-initializers
 * @param {string} typeArg
 * @param {boolean} canBubbleArg
 * @param {boolean} cancelableArg
 * @param {?Window} viewArg
 * @param {string} dataArg
 * @param {string} localeArg
 * @return {undefined}
 */
CompositionEvent.prototype.initCompositionEvent = function(
    typeArg, canBubbleArg, cancelableArg, viewArg, dataArg, localeArg) {};

/**
 * @type {string}
 */
CompositionEvent.prototype.data;

/**
 * @type {string}
 */
CompositionEvent.prototype.locale;
