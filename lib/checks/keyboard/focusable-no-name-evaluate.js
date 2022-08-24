import { isFocusable } from '../../commons/dom';
import { accessibleTextVirtual } from '../../commons/text';

function focusableNoNameEvaluate(node, options, virtualNode) {
  const inFocusOrder = isFocusable(virtualNode, { ifProgrammatic: true });
  if (!inFocusOrder) {
    return false;
  }

  try {
    return !accessibleTextVirtual(virtualNode);
  } catch (e) {
    return undefined;
  }
}

export default focusableNoNameEvaluate;
