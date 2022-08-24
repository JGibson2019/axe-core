import focusDisabled from './focus-disabled';
import isNativelyFocusable from './is-natively-focusable';
import AbstractVirtualNode from '../../core/base/virtual-node/abstract-virtual-node';
import { getNodeFromTree } from '../../core/utils';
/**
 * Determines if an element is keyboard or programmatically focusable.
 * @method isFocusable
 * @memberof axe.commons.dom
 * @instance
 * @param {HTMLElement} el - The HTMLElement
 * @param {Object} [options] - Options to control the behavior of this function
 * @param {Boolean} [options.programatically=true] - If false, will return false for elements that are only focusable programmatically. Defaults to true.
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
    options.ifProgrammatic
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
