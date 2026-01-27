# Improve results matching

## Context

When many results match the filtering criteria with the same proximity, only some of them are displayed.
Also, they are ranked from 1 to 5 even if they all match equally.

## Goal

Get rid of the matching ambiguity by showing match quality as a percentage and using smart thresholds.

## Rules

### Percentage Score Calculation

The matching percentage is calculated as:

```
percentage = (score / maxPossibleScore) × 100
maxPossibleScore = 5 × numberOfSelectedCriteria
```

Example: If user selects 3 criteria and a process scores 12 points:

- `percentage = (12 / 15) × 100 = 80%`

### Display Rules

1. **Show percentage below rank**: Each result displays its matching percentage (rounded to nearest integer)

2. **Threshold-based filtering** (evaluated in order):
   - If **any** result has ≥90%: show **all** results with ≥90%
   - Else if **at least 2** results have ≥80%: show **all** results with ≥80%
   - Else if **at least 3** results have ≥60%: show **all** results with ≥60%
   - Else: show the **top 5** results regardless of score

3. **Rank handling for ties**: Use standard competition ranking (1, 1, 3 - not 1, 1, 2)
   - Equal scores get the same rank
   - Next rank skips accordingly

### Examples

**Example 1**: Results with scores 95%, 92%, 75%, 60%

- Threshold met: ≥90% (2 results)
- Display: Both 95% and 92% results, ranked 1 and 2

**Example 2**: Results with scores 85%, 85%, 70%, 50%

- Threshold met: ≥80% (2 results)
- Display: Both 85% results, both ranked 1

**Example 3**: Results with scores 65%, 62%, 61%, 55%, 40%

- Threshold met: ≥60% (3 results)
- Display: 65%, 62%, 61% results, ranked 1, 2, 3

**Example 4**: Results with scores 55%, 50%, 45%, 40%, 35%, 30%

- No threshold met
- Display: Top 5 results (55% to 35%), ranked 1 to 5

## Implementation Notes

1. **Update `ScoredProcess` interface**: Add `percentage: number` field
2. **Update `scoreProcess`**: Return both raw score and percentage
3. **Replace `selectTopProcesses`**: New function `filterByThreshold` implementing the threshold logic
4. **Update Results UI**: Display percentage below rank badge

## Data Structure Changes

```typescript
export interface ScoredProcess {
  name: string;
  score: number;
  percentage: number; // 0-100, rounded integer
}
```

## UI Changes

The rank badge should display:

- Rank number (large)
- Percentage below (smaller, e.g., "85%")

```
  ┌─────┐
  │  1  │
  │ 85% │
  └─────┘
```
