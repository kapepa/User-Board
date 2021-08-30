import { createSelector } from 'reselect';

export const userSelector = createSelector(
  (state) => state.user,
  (state) => state.user
)

export const searchSelector = createSelector(
  (state) => state.user,
  (state) => state.search
)

export const loadsSelector = createSelector(
  (state) => state.user,
  (state) => state.loads
)

export const warningSelector = createSelector(
  (state) => state.user,
  (state) => state.warning
)

export const errorSelector = createSelector(
  (state) => state.user,
  (state) => state.error
)