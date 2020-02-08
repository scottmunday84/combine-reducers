# combineReducers (v1.0.0)

A simple shim for combining reducers. Built for React, but it doesn't have to be.

### Installation and use

Install npm packages:

```
yarn install -S scottmunday84/combineReducers
```

And to use:
```jsx harmony
import combineReducers from 'combineReducers';
import React, {createContext, useReducer} from 'react';

const firstReducer = (state, action) => {
  switch (action.type) {
    case 'ACTION_FOO':
      return {
        ...state,
        foo: action.payload
      };
    default:
      return state;
  }
};

const secondReducer = (state, action) => {
  switch (action.type) {
    case 'ACTION_BAR':
      return {
        ...state,
        bar: action.payload
      };
    default:
      return state;
  }
};

export const store = createContext(null);
const {Provider} = store;

const initialState = {
  firstReducer: {
    foo: true
  },
  secondReducer: {
    bar: false
  }
};

const StoreProvider = ({children}) => {
  const [state, dispatch] = useReducer(combineReducers({
    firstReducer,
    secondReducer
  }), initialState);
  
  return (
    <Provider value={{state, dispatch}}>
      {children}
    </Provider>
  );
}

export default StoreProvider;
```

Use the StoreProvider (like normal): 
```jsx harmony
import React from 'react';
import StoreProvider from "./reducers/store";
import Layout from "./components/Layout";

let App = () => {
  return (
    <StoreProvider>
      <Layout />
    </StoreProvider>
  );
};

export default App;
```

And work from the combined context:
```jsx harmony
import React, {useContext} from 'react';
import {store} from "../reducers/store";

const Layout = () => {
  const {dispatch, ...context} = init(useContext(store));
  const _foo = payload => dispatch({type: 'ACTION_FOO', payload});
  const _bar = payload => dispatch({type: 'ACTION_BAR', payload});

  return (
    <div>
      <button onClick={_foo(!context.foo)}>Cal Foo</button>
      <button onClick={_foo(!context.bar)}>Call Bar</button>
    </div>
  );
};

const init = store => {
  const {dispatch, state: {...state}} = store;

  return {
    dispatch,
    foo: state.firstReducer.foo,
    bar: state.secondReducer.bar
  };
};

export default Layout;
```

It really is THAT easy!