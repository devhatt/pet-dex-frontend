import { MONTHS } from '../../../utils/months';

export function monthArrayGenerator(month) {
  const monthArray = new Array(7);
  for (let i = 0; i < monthArray.length; i += 1) {
    const monthIndex = (month - (3 - i) + 12) % 12;
    monthArray[i] = MONTHS[monthIndex];
  }
  return monthArray;
}

export function yearArrayGenerator(year) {
  const yearArray = new Array(101);
  for (let i = 0; i < yearArray.length; i += 1) {
    yearArray[i] = year - (50 - i);
  }
  return yearArray;
}
