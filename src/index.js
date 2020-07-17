const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./classes/App.js');

ReactDOM.render(
  React.createElement(App, null),
  document.getElementById('root')
);