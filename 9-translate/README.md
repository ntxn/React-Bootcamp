# The Context System with React

## Intro

<img src="screenshots/props-vs-context.png" width="500">

.

<img src="screenshots/communicate-props.png" width="250">
<img src="screenshots/communicate-context.png" width="380">

## App Outline

<img src="screenshots/app-outline-1.png" width="320">
<img src="screenshots/app-outline-2.png" width="300">

<img src="screenshots/app-outline-3.png" width="500">

## App applies props vs context

<img src="screenshots/app-props.png" width="300">

<img src="screenshots/app-context.png" width="330">

# Context

We can create a context object by

```js
// LanguageContext.js
import React from 'react';
export default React.createContext('english');
```

<img src="screenshots/context-1.png" width="210">
<img src="screenshots/context-2.png" width="200">
<img src="screenshots/context-3.png" width="225">

<img src="screenshots/context-4.png" width="600">

<img src="screenshots/context-5.png" width="400">

## Gotcha in Context

<img src="screenshots/context-6.png" width="400">

<img src="screenshots/context-9.png" width="800">

<img src="screenshots/context-7.png" width="700">

<img src="screenshots/context-8.png" width="400">

## Get information IN the context pipeline

- ### Default Value

  We can set default value of a context obj by providing a parameter when first create the obj

  > React.createContext('english')

- ### Use Provider

  We can provide a value in the Provider to change the data in context obj

  ```js
  // in App.js
  import LanguageContext from '../contexts/LanguageContext';

  <LanguageContext.Provider value={this.state.language}>
    <UserCreate />
  </LanguageContext.Provider>;
  ```

## Accessing Data in the Context Pipeline

- ### this.context

  We first need to set the class property `contextType` to the Context Obj we need

  Then we can access context value by `this.context`

  ```js
  // in Field.js
  import LanguageContext from '../contexts/LanguageContext';

  class Field extends React.Component {
    static contextType = LanguageContext;

    render() {
      const text = this.context === 'english' ? 'Name' : 'Naam';
      return <label>{text}</label>;
    }
  }
  ```

- ### Consumer

  By using Consumer, a component can access to multiple Context objects.

  When using Consumer, we don't set `contextType` anymore b/c that links a class to only 1 Context. We also no longer can access the context value by `this.context` because the idea is we'd have multiple context values, if we do `this.context`, we wouldn't know which context we're refering to.

  ```js
  // in App.js
  <ColorContext.Provider value="red">
    <LanguageContext.Provider value={this.state.language}>
      <UserCreate />
    </LanguageContext.Provider>
  </ColorContext.Provider>;

  // in Button.js
  import LanguageContext from '../contexts/LanguageContext';
  import ColorContext from '../contexts/ColorContext';

  class Button extends React.Component {
    render() {
      return (
        <ColorContext.Consumer>
          {color => (
            <button className={`ui button ${color}`}>
              <LanguageContext.Consumer>
                {value => (value === 'english' ? 'Submit' : 'Voorleggen')}
              </LanguageContext.Consumer>
            </button>
          )}
        </ColorContext.Consumer>
      );
    }
  }
  ```
