import { createSelector } from 'reselect';

export const priorityCoefficientsSelector = state =>
  state.getIn(['priorityCoefficients']);

export const dataSelector = createSelector(
  priorityCoefficientsSelector,
  priorityCoefficients => priorityCoefficients.get('data').toJS(),
);

export const editableRecordSelector = createSelector(
  priorityCoefficientsSelector,
  priorityCoefficients => priorityCoefficients.getIn(['editableRecord']),
);