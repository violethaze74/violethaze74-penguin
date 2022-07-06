/** @license
 * Copyright 2019 Google Inc. All Rights Reserved.
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

goog.require('GoogleSmartCard.PcscLiteServerClientsManagement.PermissionsChecking.KnownAppsRegistry');
goog.require('goog.Promise');
goog.require('goog.json');
goog.require('goog.net.HttpStatus');
goog.require('goog.testing');
goog.require('goog.testing.jsunit');
goog.require('goog.testing.net.XhrIo');

goog.setTestOnly();

goog.scope(function() {

/** @const */
var GSC = GoogleSmartCard;

/** @const */
var KnownAppsRegistry =
    GSC.PcscLiteServerClientsManagement.PermissionsChecking.KnownAppsRegistry;

/** @const */
var FAKE_APP_1_ID = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
/** @const */
var FAKE_APP_1_NAME = 'App Name 1';
/** @const */
var FAKE_APP_2_ID = 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';
/** @const */
var FAKE_KNOWN_CLIENT_APPS = {
  [FAKE_APP_1_ID]: {
    'name': FAKE_APP_1_NAME
  }
};

/**
 * Set up the mock for goog.net.XhrIo.
 *
 * This allows mocking out network requests.
 * @param {!goog.testing.PropertyReplacer} propertyReplacer
 */
function setUpXhrioMock(propertyReplacer) {
  propertyReplacer.setPath('goog.net.XhrIo.send', goog.testing.net.XhrIo.send);
}

/**
 * Simulates the response delivery for a previously created mock Xhrio request.
 *
 * The response contains a fake known client apps JSON.
 */
function simulateXhrioResponse() {
  var sentXhrios = goog.testing.net.XhrIo.getSendInstances();
  assertEquals(1, sentXhrios.length);
  var xhrio = sentXhrios[0];
  assertEquals(xhrio.getLastUri(),
               'pcsc_lite_server_clients_management/known_client_apps.json');
  var response = goog.json.serialize(FAKE_KNOWN_CLIENT_APPS);
  xhrio.simulateResponse(goog.net.HttpStatus.OK, response);
}

goog.exportSymbol('test_KnownAppsRegistry_GetById_Success', function() {
  var propertyReplacer = new goog.testing.PropertyReplacer;
  setUpXhrioMock(propertyReplacer);

  var registry = new KnownAppsRegistry;

  simulateXhrioResponse();

  var requestPromise = registry.getById(FAKE_APP_1_ID);
  var testAssertionPromise = requestPromise.then(function(knownApp) {
    assertEquals(knownApp.id, FAKE_APP_1_ID);
    assertEquals(knownApp.name, FAKE_APP_1_NAME);
  });

  return testAssertionPromise.thenAlways(
      propertyReplacer.reset, propertyReplacer);
});

goog.exportSymbol('test_KnownAppsRegistry_GetById_Failure', function() {
  var propertyReplacer = new goog.testing.PropertyReplacer;
  setUpXhrioMock(propertyReplacer);

  var registry = new KnownAppsRegistry;

  simulateXhrioResponse();

  var requestPromise = registry.getById(FAKE_APP_2_ID);
  var testAssertionPromise = requestPromise.then(function() {
    fail('Unexpected successful response');
  }, function() {});

  return testAssertionPromise.thenAlways(
      propertyReplacer.reset, propertyReplacer);
});

goog.exportSymbol('test_KnownAppsRegistry_TryGetByIds', function() {
  var propertyReplacer = new goog.testing.PropertyReplacer;
  setUpXhrioMock(propertyReplacer);

  var registry = new KnownAppsRegistry;

  simulateXhrioResponse();

  var requestPromise = registry.tryGetByIds([FAKE_APP_1_ID, FAKE_APP_2_ID]);
  var testAssertionPromise = requestPromise.then(function(knownApps) {
    assertEquals(knownApps.length, 2);
    assertEquals(knownApps[0].id, FAKE_APP_1_ID);
    assertEquals(knownApps[0].name, FAKE_APP_1_NAME);
    assertNull(knownApps[1]);
  });

  return testAssertionPromise.thenAlways(
      propertyReplacer.reset, propertyReplacer);
});

});  // goog.scope
