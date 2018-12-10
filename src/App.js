import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Form , Field } from 'react-final-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const required = value => (value ? undefined : 'Required')
const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
const minValue = min => value =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`
const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

const simpleMemoize = fn => {
  let lastArg
  let lastResult
  return arg => {
    if (arg !== lastArg) {
      lastArg = arg
      lastResult = fn(arg)
    }
    return lastResult
  }
}

const usernameAvailable = simpleMemoize(async value => {
  if (!value) {
    return 'Required'
  }
  await sleep(400)
  if (
    ~['john', 'paul', 'george', 'ringo'].indexOf(value && value.toLowerCase())
  ) {
    return 'Username taken!'
  }
})



class App extends Component {
  render() {
    return (
      <div className="App">
	<Form onSubmit={v=>console.log(v)} render={({ handleSubmit, form, submitting, pristine, values })=>(
      	  <div>
            <Field name="username" validate={usernameAvailable}>
              {({ input, meta }) => (
                <div>
                  <label>Username</label>
                  <input {...input} type="text" placeholder="Username" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
      	    <Field
              name={"name"}
              type={"text"}
              placeholder={"placeholder!"}
              required={true}
              component={"input"}
              className="contact-form__input"
            />
            <pre>{JSON.stringify(values, 0, 2)}</pre>
    	  </div>
	)} />
      </div>
    );
  }
}

export default App;
