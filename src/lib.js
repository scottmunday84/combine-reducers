/**
 * Combine reducers in an immutable fashion.
 * @param {object} reducers - A map representing the reducers
 */
const combineReducers = reducers =>
  (reducers =>
    (state, action) =>
      reducers.reduce((state, [key, reducer]) => {
        return {...state, [key]: reducer(state[key], action)};
      }, state))(Object.entries(reducers));

export default combineReducers;