import { MONTHS } from '../../../utils/months';

export function monthArrayGenerator(month) {
  const monthArray = new Array(7);
  for (let i = 0; i < monthArray.length; i += 1) {
    const monthIndex = (month - (3 - i) + 12) % 12;
    monthArray[i] = MONTHS[monthIndex];
  }
  return monthArray;
}
