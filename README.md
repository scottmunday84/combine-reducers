# combine-reducers [![npm version](https://badge.fury.io/js/%40scottmunday84%2Fcombine-reducers.svg)](https://badge.fury.io/js/%40scottmunday84%2Fcombine-reducers) 

A simple shim for combining reducers. Built for React, but it doesn't have to be.

### Installation and use

Install npm packages:

```
yarn install -S @scottmunday84/combine-reducers
```

If you want to use this with React hooks, you should install my react-consumer package too:

```
yarn install -S @scottmunday84/react-consumer
```

And to use:
```jsx harmony
import combineReducers from '@scottmunday84/combine-reducers';
import React, {createContext, useReducer} from 'react';

/* First Reducer */
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

/* Second Reducer */
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

// Context is empty; will be replaced by initialState later
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
  // Use useReducer hook with combineReducers() function
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
import Layout from "./components/Layout";
import StoreProvider from "./reducers/store";
import React from 'react';

let App = () => {
  // Wrap component with StoreProvider
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
import {store} from "../reducers/store";
import Consumer from '@scottmunday84/react-consumer';
import React from 'react';

const Layout = () => {
  const map = ({state, dispatch}) => {
    const {firstReducer, secondReducer} = state;

    return {
      foo: firstReducer.foo,
      bar: secondReducer.bar,
      dispatchFoo: payload => dispatch('ACTION_FOO', payload),
      dispatchBar: payload => dispatch('ACTION_BAR', payload)
    };
  };
  
  return (
    <Consumer store={store} map={map}>
      {({foo, bar, dispatchFoo, dispatchBar}) => [
          <button onClick={() => dispatchFoo(!foo)}>Cal Foo</button>,
          <button onClick={() => dispatchBar(!bar)}>Call Bar</button>]}
    </Consumer>);
};


export default Layout;
```

It really is THAT easy!
