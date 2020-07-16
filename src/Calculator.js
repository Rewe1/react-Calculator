class Calculator extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state =
        {
            'text': '0',
        }
        
        this.numbers = [];
        this.operators = [];
    }
    
    getCalcState()
    {
        let state = this.state;
        return state;
    }

    setCalcState(state)
    {
        let rawText = state.text;

        if (rawText.charAt(1) && rawText.charAt(0) == 0)
            rawText = rawText.slice(1);

            rawText = rawText.split('');

        if
        (
            rawText[rawText.length -1] == '+' ||
            rawText[rawText.length -1] == '-' ||
            rawText[rawText.length -1] == '*' ||
            rawText[rawText.length -1] == '/' ||
            rawText[rawText.length -1] == '^'
        )
        {
            this.operators.pop(rawText.splice(-1));
            console.log(rawText);
        }

        let text;

        if(rawText.length)
            for(let i = 0; i < rawText.length; i++)
            {
                if(!text)
                    text = rawText[i];
                else
                    text += rawText[i];
            }
        else
            text = '0';
        
        this.numbers.pop(Number(text));
        console.log(text, rawText);

        state.text = text;
        this.setState(state);
    }

    calculate()
    {
        let result;
        let numbers = this.numbers;
        let operators = this.operators;
        let state = this.getCalcState();

        for(let i = 0; i < operators.length; i++)
        {
            if(operators[i] == '^')
            {
                numbers[i -1] = Math.pow(numbers[i-1], numbers[i]);
                numbers.splice(i, i+1);
            }

        }

        for(let i = 0; i < operators.length; i++)
        {
            
            if(operators[i] == '*')
            {
                numbers[i -1] = numbers[i-1] * numbers[i];
                numbers.splice(i, i+1);
            }

            if(operators[i] == '/')
            {
                numbers[i -1] = numbers[i-1] / numbers[i];
                numbers.splice(i, i+1);
            }

        }

        for(let i = 0; i < operators.length; i++)
        {
            if(operators[i] == '+')
            {
                numbers[i -1] = numbers[i-1] + numbers[i];
                numbers.splice(i, i+1);
            }

            if(operators[i] == '-')
            {
                numbers[i -1] = numbers[i-1] - numbers[i];
                numbers.splice(i, i+1);
            }
        }
        

        if(result)
        {
            this.numbers = [];
            this.operators = [];
            state.text = result;
            this.setCalcState(state);
            console.log(result);
            return result;
        }
        else
        {
            // Throw error
            return -1;
        }
    }

    UNSAFE_componentWillUpdate()
    {
        return;
    }

    render()
    {
        return (
            <div id='Carcass'>

                <div className='Holder'>
                    <div id='Display'>
                        <span id='HigherLED'></span>
                        <span id='LED'>{this.state.text}</span>
                    </div>
                </div>

                <div className='Holder'>
                    <Key text={'^2'} getCalcState={() => this.getCalcState()} setCalcState={(state) => this.setCalcState(state)}></Key>
                    <Key text={'^1/2'} getCalcState={() => this.getCalcState()} setCalcState={(state) => this.setCalcState(state)}></Key>
                    <Key text={'e'} getCalcState={() => this.getCalcState()} setCalcState={(state) => this.setCalcState(state)}></Key>
                    <Key text={' *'} getCalcState={() => this.getCalcState()} setCalcState={(state) => this.setCalcState(state)}></Key>
                </div>

                <div className='Holder'>
                    <Key text={'7'} getCalcState={() => this.getCalcState()} setCalcState={(state) => this.setCalcState(state)}></Key>
                    <Key text={'8'} getCalcState={() => this.getCalcState()} setCalcState={(state) => this.setCalcState(state)}></Key>
                    <Key text={'9'} getCalcState={() => this.getCalcState()} setCalcState={(state) => this.setCalcState(state)}></Key>
                    <Key text={' /'} getCalcState={() => this.getCalcState()} setCalcState={(state) => this.setCalcState(state)}></Key>
                </div>

                <div className='Holder'>
                    <Key text={'4'} getCalcState={() => this.getCalcState()} setCalcState={(state) => this.setCalcState(state)}></Key>
                    <Key text={'5'} getCalcState={() => this.getCalcState()} setCalcState={(state) => this.setCalcState(state)}></Key>
                    <Key text={'6'} getCalcState={() => this.getCalcState()} setCalcState={(state) => this.setCalcState(state)}></Key>
                    <Key text={' +'} getCalcState={() => this.getCalcState()} setCalcState={(state) => this.setCalcState(state)}></Key>
                </div>

                <div className='Holder'>
                    <Key text={'1'} getCalcState={() => this.getCalcState()} setCalcState={(state) => this.setCalcState(state)}></Key>
                    <Key text={'2'} getCalcState={() => this.getCalcState()} setCalcState={(state) => this.setCalcState(state)}></Key>
                    <Key text={'3'} getCalcState={() => this.getCalcState()} setCalcState={(state) => this.setCalcState(state)}></Key>
                    <Key text={' -'} getCalcState={() => this.getCalcState()} setCalcState={(state) => this.setCalcState(state)}></Key>
                </div>

                <div className='Holder'>
                    <Key text={'.'} getCalcState={() => this.getCalcState()} setCalcState={(state) => this.setCalcState(state)}></Key>
                    <Key text={'0'} getCalcState={() => this.getCalcState()} setCalcState={(state) => this.setCalcState(state)}></Key>
                    <Key text={' ='} isHor={true} getCalcState={() => this.getCalcState()} setCalcState={(state) => this.calculate}></Key>
                </div>

            </div>
        );
    }
};

class Key extends React.Component
{
    constructor(props)
    {
        super(props);

        this.getCalcState = this.props.getCalcState;
        this.setCalcState = this.props.setCalcState;
    }

    addChar()
    {
        let state = this.getCalcState();
        state.text = state.text + this.props.text;
        this.setCalcState(state);
    }

    render()
    {
        return (
            <div className='Key' onClick={() => this.addChar()}>
                {/*

                    COLOCAR onClick em props.

                */}
                {
                    this.props.isHor == true &&
                        <span className='Horizontal'>{this.props.text}</span>
                }
                {
                    this.props.isHor == false || this.props.isHor == null &&
                        this.props.text
                }
            </div>
        )
    }
}

export default Calculator;