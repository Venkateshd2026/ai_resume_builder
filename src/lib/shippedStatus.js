/**
 * Shipped status — only true when all criteria met
 */

import { allStepsComplete, allLinksValid } from './proofStorage';
import { isChecklistComplete } from './checklistStorage';

export function isShipped() {
  return allStepsComplete() && isChecklistComplete() && allLinksValid();
}
