const React = require('react');

const Calculator = require('./Calculator.js');

class App extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <div id='AppScreen'>

                <Calculator></Calculator>

            </div>
        );
    }
}

module.exports = App;