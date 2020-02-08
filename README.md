# combineReducers (v1.0.0)

A simple shim for combining reducers. Built for React, but it doesn't have to be.

### Installation and use

Install npm packages:

```
yarn install -S @scottmunday84/combineReducers
```

If you want to use this with React hooks, install my react-connect package too:

```
yarn install -S @scottmunday84/react-connect
```

You can also use this in tandem with consumers. Use what you feel is more appropriate.

And to use:
```jsx harmony
import combineReducers from 'combineReducers';
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

export const store = createContext(null);  // Create an empty context; will be replaced with the 
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
import {connect} from 'react-connect';
import React, {useContext} from 'react';

const Layout = () => {
  const mapState = state => {
    return {
      foo: state.firstReducer.foo,
      bar: state.secondReducer.bar
    };
  };
  const mapActions = (state, dispatch) => {
    return {
      foo: payload => dispatch({type: 'ACTION_FOO', payload}),
      bar: payload => dispatch({type: 'ACTION_BAR', payload}) 
    };
  };
  const [props, actions] = connect(useContext(store))(mapState, mapActions);
  
  return (
    <div>
      <button onClick={actions.foo(!props.foo)}>Cal Foo</button>
      <button onClick={actions.bar(!props.bar)}>Call Bar</button>
    </div>
  );
};


export default Layout;
```

It really is THAT easy!
