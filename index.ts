/**
 *program calculates student mark
 * By:      Justin Lavoie
 * Version: 1.0
 * Since:   2024-09-19
 */

import { writeFileSync } from 'fs'

function generateGaussian (mean: number, std: number): number {
  // https://discourse.psychopy.org/t/javascript-gaussian-function/17724/2
  const _2PI = Math.PI * 2
  const u1 = Math.random()
  const u2 = Math.random()

  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(_2PI * u2)
  return z0 * std + mean
}

// Add first row
let array = 'Name,'
for (let counter = 1; counter < 9; counter++) {
  array += `Assignment${counter},`
}
array += '\n'

// Generate marks
let sum = 0
let listCount = 0
let studentCount = 1
for (let counter = 0; counter < 24; counter++) {
  const normalNumber = generateGaussian(75, 10)
  sum += normalNumber

  if (listCount === 0) {
    array += `Student${studentCount},`
    studentCount++
  }

  array += `${Math.floor(normalNumber)},`

  if (listCount === 7) {
    array += '\n'
    listCount = 0
  } else {
    listCount++
  }
}

// Calculate average
const average = sum / 24

console.log(`\nMark Average: ${average.toFixed(2)}\n`)
console.log(array)
writeFileSync('Marks.csv', array)

console.log('\nDone.')
