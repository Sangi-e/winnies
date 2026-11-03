import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateAppointmentReference,
  getAvailableTimeSlots,
  triagePatientSymptom,
  calculateBmiAndCategory,
  formatCurrency,
  getNextSlideIndex,
  getPrevSlideIndex,
  calculateSlideProgress
} from './clinicLogic';

test('generateAppointmentReference creates expected format', () => {
  const ref = generateAppointmentReference('cardiology', '2026-11-05');
  assert.match(ref, /^WIN-CAR-1105-\d{4}$/);
});

test('getAvailableTimeSlots filters out already booked slots', () => {
  const allSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'];
  const booked = ['10:00 AM', '02:00 PM'];
  const available = getAvailableTimeSlots(allSlots, booked);
  assert.deepEqual(available, ['09:00 AM', '11:00 AM', '03:00 PM']);
});

test('triagePatientSymptom correctly flags urgent symptoms as emergency', () => {
  const result = triagePatientSymptom('severe chest pain', 'urgent');
  assert.equal(result.priority, 'Emergency');
  assert.equal(result.recommendedDepartment, '24/7 Emergency & Acute Care');
});

test('triagePatientSymptom routes pediatric concerns properly', () => {
  const result = triagePatientSymptom('child persistent fever', 'moderate');
  assert.equal(result.priority, 'Priority');
  assert.equal(result.recommendedDepartment, 'Pediatrics & Child Wellness');
});

test('calculateBmiAndCategory evaluates values accurately', () => {
  // 70kg, 175cm -> 70 / (1.75^2) = 22.86 -> 22.9
  const res = calculateBmiAndCategory(70, 175);
  assert.equal(res.bmi, 22.9);
  assert.equal(res.category, 'Normal weight');

  const overweightRes = calculateBmiAndCategory(85, 175);
  assert.equal(overweightRes.bmi, 27.8);
  assert.equal(overweightRes.category, 'Overweight');
});

test('formatCurrency formats values properly', () => {
  assert.equal(formatCurrency(45, 'USD'), '$45');
  assert.equal(formatCurrency(35000, 'NGN'), '₦35,000');
});

test('getNextSlideIndex cycles forward smoothly across 3 slides', () => {
  assert.equal(getNextSlideIndex(0, 3), 1);
  assert.equal(getNextSlideIndex(1, 3), 2);
  assert.equal(getNextSlideIndex(2, 3), 0);
});

test('getPrevSlideIndex cycles backwards smoothly across 3 slides', () => {
  assert.equal(getPrevSlideIndex(0, 3), 2);
  assert.equal(getPrevSlideIndex(2, 3), 1);
  assert.equal(getPrevSlideIndex(1, 3), 0);
});

test('calculateSlideProgress clamps percentage between 0 and 100', () => {
  assert.equal(calculateSlideProgress(0, 6000), 0);
  assert.equal(calculateSlideProgress(3000, 6000), 50);
  assert.equal(calculateSlideProgress(6000, 6000), 100);
  assert.equal(calculateSlideProgress(7500, 6000), 100);
});
