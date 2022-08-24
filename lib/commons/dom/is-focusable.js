import focusDisabled from './focus-disabled';
import isNativelyFocusable from './is-natively-focusable';
import AbstractVirtualNode from '../../core/base/virtual-node/abstract-virtual-node';
import { getNodeFromTree } from '../../core/utils';
/**
 * Determines if an element is keyboard or programmatically focusable.
 * @method isFocusable
 * @memberof axe.commons.dom
 * @instance
 * @param {HTMLElement} el The HTMLElement
 * @param {object} options Optional. If set to {programatically: false}, will not return true for elements that are only focusable programmatically.
 * @return {Boolean} The element's focusability status
 */
export default function isFocusable(el, options = {}) {
  const vNode = el instanceof AbstractVirtualNode ? el : getNodeFromTree(el);
  const tabindex = vNode.attr('tabindex');

  if (vNode.props.nodeType !== 1) {
    return false;
  }

  if (focusDisabled(vNode)) {
    return false;
  }

  if (
    tabindex &&
    parseInt(tabindex, 10) < 0 &&
    options.programatically === false
  ) {
    return false;
  }

  if (isNativelyFocusable(vNode)) {
    return true;
  }

  if (tabindex && parsableTabindex(tabindex)) {
    return true;
  }

  return false;
}

function parsableTabindex(tabindex) {
  return !isNaN(parseInt(tabindex, 10));
}
