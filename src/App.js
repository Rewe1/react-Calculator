import Calculator from 'Calculator';

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

export default App;