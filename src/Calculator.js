class Calculator extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state =
        {
            'text': '0',
        }
    }
    
    getCalcState()
    {
        let state = this.state;
        return state;
    }

    setCalcState(state)
    {
        if(state.text == '')
            state.text = '0';
        this.setState(state);
    }

    addChar(char)
    {
        let state = this.getCalcState();
        let regExpN = /[0-9.]/;
        let regExpO = /[+*/^]|-/;

        if(char.match(regExpN))
        {
            if(state.text.length == 1 && state.text.charAt(0) == '0')
                state.text = char;
            else
                state.text += char;
        }
        else if(char.match(regExpO))
        {
            if(state.text.charAt(state.text.length -1) == '.')
                state.text = state.text.slice(0, -1);

            state.text += ` ${char} `;
        }

        if(char == '√')
            state.text += ` ^ 0.5`;
        this.setCalcState(state);
    }

    parseString()
    {
        let rawText = this.getCalcState().text;
        let numbers = [];
        let operators = [];
        let regExpN = /[0-9.]/;
        let regExpO = /[+*/^]|-/;
        console.log('parseString');
        console.log('rawText: ', rawText);

        rawText = rawText.split(' ');
        
        for(let i = 0; i < rawText.length; i++)
        {
            if(rawText[i].match(regExpN))
            {
                numbers.push(Number(rawText[i]));
            }
            
            if(rawText[i].match(regExpO))
            {
                operators.push(rawText[i]);
            }
        }
        console.log('rawText2', rawText);
        
        console.log('numbers: ',numbers);
        console.log('operators: ',operators);
        console.log('');

        return {numbers: numbers, operators: operators}
    }

    getResult()
    {
        console.log('calculate');
        let result;
        let parsedStr = this.parseString()
        let numbers = parsedStr.numbers;
        let operators = parsedStr.operators;

        console.log('numbers2: ', numbers);
        console.log('operators2: ', operators);

        for(let i = 0; i < operators.length; i++)
        {
            if(operators[i] == '^')
            {
                if(numbers[i] != 0 && numbers[i +1] != 0)
                {
                    numbers[i] = Math.pow(numbers[i], numbers[i +1]);
                    operators.splice(i, 1);
                    numbers.splice(i +1, 1);
                    i--;
                }
                else
                {
                    return 'Zero to the power of Zero is undefined';
                }
            }

        }

        for(let i = 0; i < operators.length; i++)
        {
            
            if(operators[i] == '*')
            {
                numbers[i] = numbers[i] * numbers[i +1];
                operators.splice(i, 1);
                numbers.splice(i +1, 1);
                i--;
            }

            if(operators[i] == '/')
            {
                if(numbers[i +1] != 0)
                {
                    numbers[i] = numbers[i] / numbers[i +1];
                    operators.splice(i, 1);
                    numbers.splice(i +1, 1);
                    i--;
                }
                else
                {
                    return 'Dividing by zero is undefined';
                }
            }

        }

        for(let i = 0; i < operators.length; i++)
        {
            
            console.log('numbers3: ', numbers);
            console.log('operators3: ', operators);
            if(operators[i] == '+')
            {
                numbers[i] = numbers[i] + numbers[i +1];
                operators.splice(i, 1);
                numbers.splice(i +1, 1);
                i--;
            }
            
            console.log('numbers4: ', numbers);
            console.log('operators4: ', operators);

            if(operators[i] == '-')
            {
                numbers[i] = numbers[i] - numbers[i +1];
                operators.splice(i, 1);
                numbers.splice(i +1, 1);
                i--;
            }
        }

        if(numbers.length == 1 && !operators.length)
        {
            if((numbers[0] || numbers[0] == 0) && typeof(numbers[0] == 'number'))
            {
                result = numbers[0];
                console.log('result: ', result);
                console.log('');
                return result;
            }
            else
            {
                if(numbers[0] == undefined)
                    console.log('Result is ', numbers[0]);

                return 'Error';
            }
        }
        else
        {
            if(!numbers.length)
                console.log('There are no numbers left');

            if(numbers.length > 1)
                console.log('There is more than one number left');

            if(operators.length)
                console.log('There still are operators left');

            return 'Error';
        }
    }

    calculate()
    {
        let result = this.getResult();

        if(result == 'Error')
            return -1;
        else
            this.changeText(String(result));
    }

    changeText(string)
    {
        let state = this.getCalcState();

        state.text = string;
        this.setCalcState(state);
    }

    clearText()
    {
        this.changeText('0');
    }

    backspace()
    {
        let text = this.getCalcState().text;

        if(text.charAt(text.length -1) == ' ')
            text = text.slice(0, -1);
        text = text.slice(0, -1);
        if(text.charAt(text.length -1) == ' ')
            text = text.slice(0, -1);

        this.changeText(text);
    }

    render()
    {
        return (
            <div id='Carcass'>

                <div className='Holder'>
                    <div id='Display'>
                        <span id='LED'>{this.state.text}</span>
                        <span id='LowerLED'>{`${this.getResult()}`}</span>
                    </div>
                </div>

                <div className='Holder'>
                    <Key text={'C'}  onClick={ () => this.clearText()}></Key>
                    <Key text={'^x'}  onClick={ () => this.addChar('^')}></Key>
                    <Key text={'2√'}  onClick={ () => this.addChar('√')}></Key>
                    <Key text={'←'}  onClick={ () => this.backspace()}></Key>
                </div>

                <div className='Holder'>
                    <Key text={'+'}  onClick={ () => this.addChar('+')}></Key>
                    <Key text={'-'}  onClick={ () => this.addChar('-')}></Key>
                    <Key text={'/'}  onClick={ () => this.addChar('/')}></Key>
                    <Key text={'*'}  onClick={ () => this.addChar('*')}></Key>
                </div>

                <div className='Holder'>
                    <Key text={'7'}  onClick={ () => this.addChar('7')}></Key>
                    <Key text={'8'}  onClick={ () => this.addChar('8')}></Key>
                    <Key text={'9'}  onClick={ () => this.addChar('9')}></Key>
                    <Key text={''}  onClick={ () => {}}></Key>
                </div>

                <div className='Holder'>
                    <Key text={'4'}  onClick={ () => this.addChar('4')}></Key>
                    <Key text={'5'}  onClick={ () => this.addChar('5')}></Key>
                    <Key text={'6'}  onClick={ () => this.addChar('6')}></Key>
                    <Key text={''}  onClick={ () => {}}></Key>
                </div>

                <div className='Holder'>
                    <Key text={'1'}  onClick={ () => this.addChar('1')}></Key>
                    <Key text={'2'}  onClick={ () => this.addChar('2')}></Key>
                    <Key text={'3'}  onClick={ () => this.addChar('3')}></Key>
                    <Key text={''}  onClick={ () => {}}></Key>
                </div>

                <div className='Holder'>
                    <Key text={'.'}  onClick={ () => this.addChar('.')}></Key>
                    <Key text={'0'}  onClick={ () => this.addChar('0')}></Key>
                    <Key text={'='} isHor={true} onClick={ () => this.calculate()}></Key>
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

        this.onClick = this.props.onClick;
    }

    render()
    {
        return (
            <div className='Key' onClick={() => this.onClick()}>
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