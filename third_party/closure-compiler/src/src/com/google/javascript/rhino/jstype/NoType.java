/*
 *
 * ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Rhino code, released
 * May 6, 1999.
 *
 * The Initial Developer of the Original Code is
 * Netscape Communications Corporation.
 * Portions created by the Initial Developer are Copyright (C) 1997-1999
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Bob Jervis
 *   Google Inc.
 *
 * Alternatively, the contents of this file may be used under the terms of
 * the GNU General Public License Version 2 or later (the "GPL"), in which
 * case the provisions of the GPL are applicable instead of those above. If
 * you wish to allow use of your version of this file only under the terms of
 * the GPL and not to allow others to use your version of this file under the
 * MPL, indicate your decision by deleting the provisions above and replacing
 * them with the notice and other provisions required by the GPL. If you do
 * not delete the provisions above, a recipient may use your version of this
 * file under either the MPL or the GPL.
 *
 * ***** END LICENSE BLOCK ***** */

package com.google.javascript.rhino.jstype;



/**
 * Bottom type, representing the subclass of any value or object.
 *
 * Although JavaScript programmers can't explicitly denote the bottom type,
 * it comes up in static analysis. For example, if we have:
 * <code>
 * var x = null;
 * if (x) {
 *   f(x);
 * }
 * </code>
 * We need to be able to assign {@code x} a type within the {@code f(x)}
 * call. Since it has no possible type, we assign {@code x} the NoType,
 * so that {@code f(x)} is legal no matter what the type of {@code f}'s
 * first argument is.
 *
 * @see <a href="http://en.wikipedia.org/wiki/Bottom_type">Bottom types</a>
 */
public class NoType extends NoObjectType {
  NoType(JSTypeRegistry registry) {
    super(registry);
  }

  @Override
  JSTypeClass getTypeClass() {
    return JSTypeClass.NO;
  }

  @Override
  public final boolean isNoObjectType() {
    return false;
  }

  @Override
  public boolean isNoType() {
    return true;
  }

  @Override
  public final boolean isNullable() {
    return true;
  }

  @Override
  public final boolean isVoidable() {
    return true;
  }

  @Override
  public final BooleanLiteralSet getPossibleToBooleanOutcomes() {
    return BooleanLiteralSet.BOTH;
  }

  @Override
  public final <T> T visit(Visitor<T> visitor) {
    return visitor.caseNoType(this);
  }

  @Override final <T> T visit(RelationshipVisitor<T> visitor, JSType that) {
    return visitor.caseNoType(that);
  }

  @Override
  void appendTo(TypeStringBuilder sb) {
    sb.append(sb.isForAnnotations() ? "?" : "None");
  }
}
