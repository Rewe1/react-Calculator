const React = require('react');
const Key = require('./Key.js');

class Calculator extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state =
        {
            'text': '0',
        }
        this.mobile = false,
        this.isDebug = true;
        this.regExpN = /[0-9πe.]/;
        this.regExpO = /[+*/^√]|-/;
    }
    
    debugLog(func)
    {
        if(this.isDebug)
            func();
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

    parseString()
    {
        let rawText = this.getCalcState().text;
        let numbers = [];
        let operators = [];
        this.debugLog(() => console.log('parseString'));
        this.debugLog(() => console.log('rawText: ', rawText));

        rawText = rawText.split(' ');
        
        for(let i = 0; i < rawText.length; i++)
        {
            if(rawText[i].match(this.regExpN))
            {
                if(!rawText[i].match(/[πe]/))
                    numbers.push(Number(rawText[i]));
                else
                    if(rawText[i] == 'π')
                        numbers.push(Math.PI);
                    else if(rawText[i] == 'e')
                        numbers.push(Math.E);
            }
            
            if(rawText[i].match(this.regExpO) && !rawText[i].match(this.regExpN))
            {
                operators.push(rawText[i]);
            }
        }
        this.debugLog(() => console.log('rawText2', rawText));
        
        this.debugLog(() => console.log('numbers: ',numbers));
        this.debugLog(() => console.log('operators: ',operators));
        this.debugLog(() => console.log(''));

        return {numbers: numbers, operators: operators}
    }

    getResult()
    {
        this.debugLog(() => console.log('calculate'));
        let result;
        let parsedStr = this.parseString()
        let numbers = parsedStr.numbers;
        let operators = parsedStr.operators;

        this.debugLog(() => console.log('numbers2: ', numbers));
        this.debugLog(() => console.log('operators2: ', operators));

        for(let i = 0; i < operators.length; i++)
        {
            if(operators[i] == '^')
            {
                if(numbers[i] == 0 && numbers[i +1] == 0)
                {
                    return 'Zero to the power of Zero is undefined';
                }
                else
                {
                    numbers[i] = Math.pow(numbers[i], numbers[i +1]);
                    operators.splice(i, 1);
                    numbers.splice(i +1, 1);
                    i--;
                }
            }

            if(operators[i].match(/√/))
            {
                if(operators[i].match(/²/))
                    numbers[i] = Math.sqrt(numbers[i]);

                if(operators[i].match(/³/))
                    numbers[i] = Math.cbrt(numbers[i]);
                    
                operators.splice(i, 1);
                i--;
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
            
            this.debugLog(() => console.log('numbers3: ', numbers));
            this.debugLog(() => console.log('operators3: ', operators));
            if(operators[i] == '+')
            {
                numbers[i] = numbers[i] + numbers[i +1];
                operators.splice(i, 1);
                numbers.splice(i +1, 1);
                i--;
            }
            
            this.debugLog(() => console.log('numbers4: ', numbers));
            this.debugLog(() => console.log('operators4: ', operators));

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
                this.debugLog(() => console.log('result: ', result));
                this.debugLog(() => console.log(''));
                return result;
            }
            else
            {
                if(numbers[0] == undefined)
                    this.debugLog(() => console.log('Result is ', numbers[0]));

                return 'Error';
            }
        }
        else
        {
            if(!numbers.length)
                this.debugLog(() => console.log('There are no numbers left'));

            if(numbers.length > 1)
                this.debugLog(() => console.log('There is more than one number left'));

            if(operators.length)
                this.debugLog(() => console.log('There still are operators left'));

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

    addChar(char)
    {
        if(char.length > 1)
            return;

        if(char == 'p')
            char = 'π';

        let state = this.getCalcState();
        let text = state.text;

        if(text.length >= 15)
            return;

        this.debugLog(() => console.log('addChar'));
        this.debugLog(() => console.log(char));
        this.debugLog(() => console.log(char.match(this.regExpN)));
        this.debugLog(() => console.log(char.match(this.regExpO)));
        this.debugLog(() => console.log(''));

        if(char.match(this.regExpN))
        {
            if(text.length == 1 && text.charAt(0) == '0' && char != '.')
            {
                if(!char.match(/[πe.]/))
                    text = char;
                else
                    text = ` ${char} `;
            }
            else
            {
                if(!char.match(/[πe.]/))
                    text += char;
                else if(char == '.' && text.charAt(text.length -1) != '.')
                    text += char;
                else
                    text += ` ${char} `;
            }
        }
        else if(char.match(this.regExpO))
        {
            if(text.charAt(text.length -1).match(/[+*/^\.]|-/) || 
              (text.charAt(text.length -1) == ' ' && text.charAt(text.length -2).match(/[+*/^\.]|-/)))
            {
                if(char == '-' && text.charAt(text.length -2).match(/[*/]/))
                {
                    text += ` ${char}`;
                }
                else
                {
                    if(text.charAt(text.length -1) == ' ')
                        text = text.slice(0, -1);
                    
                    text = text.slice(0, -1);

                    if(text.charAt(text.length -1) == ' ')
                        text = text.slice(0, -1);

                    text += ` ${char} `;
                }
            }
            else
                text += ` ${char} `;
        }

        if(text.length == 1 && text.charAt(0) == '0')
        {
            if(char == '²')
                text = `²√ `;

            if(char == '³')
                text = `³√ `;
        }
        else
        {
            if(char == '²')
                text += ` ²√ `;
    
            if(char == '³')
                text += ` ³√ `;
        }

        state.text = text;
        this.setCalcState(state);
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

        if(text.charAt(text.length -2).match(this.regExpO))
        {
            if(text.charAt(text.length -1) == ' ')
                text = text.slice(0, -1);

            if(text.charAt(text.length -1) == '√')
                text = text.slice(0, -1);
                
            text = text.slice(0, -1);

            if(text.charAt(text.length -1) == ' ')
                text = text.slice(0, -1);
        }
        else
        {
            text = text.slice(0, -1);
        }

        this.changeText(text);
    }

    onKeyDown(e)
    {
        if(e.key == 'Enter')
            this.calculate();
        else if(e.key == 'Backspace')
            this.backspace();
        else if(e.key == 'ArrowUp' || e.key == 'Dead' )
            this.addChar('^');
        else
            this.addChar(e.key);
        this.debugLog(() => console.log(e.key));
    }

    onTouchStart(func)
    {
        if(!this.isMobile)
            this.isMobile = true;

        if(typeof(func) == 'function')
            func();
        else
            this.debugLog(() => console.log('func is not a function!'));
    }

    onClick(func)
    {
        if(this.isMobile)
            return;

        if(typeof(func) == 'function')
        {
            this.debugLog(() => console.log('Calling func'));
            func();
        }
        else
            this.debugLog(() => console.log('func is not a function!'));
    }

    render()
    {
        return (
            <div id='Carcass' tabIndex='0' onKeyDown={(e) => this.onKeyDown(e)}>
                <div className='Holder'>
                    <div id='Display'>
                        <span id='LED'>{this.state.text}</span>
                        <input id='inputHandler' tabIndex='0' autoFocus></input>
                        <span id='LowerLED'>{`${this.getResult()}`}</span>
                    </div>
                </div>

                <div className='Holder'>
                    <Key text={'C'}  onClick={() => this.onClick(() => this.clearText())}  onTouchStart={() => this.onTouchStart(() => this.clearText())}></Key>
                    <Key text={'²√'} onClick={() => this.onClick(() => this.addChar('²'))} onTouchStart={() => this.onTouchStart(() => this.addChar('√'))}></Key>
                    <Key text={'³√'} onClick={() => this.onClick(() => this.addChar('³'))} onTouchStart={() => this.onTouchStart(() => this.addChar('√'))}></Key>
                    <Key text={'←'}  onClick={() => this.onClick(() => this.backspace())}  onTouchStart={() => this.onTouchStart(() => this.backspace())}></Key>
                </div>

                <div className='Holder'>
                    <Key text={'+'} onClick={() => this.onClick(() => this.addChar('+'))} onTouchStart={() => this.onTouchStart(() => this.addChar('+'))}></Key>
                    <Key text={'-'} onClick={() => this.onClick(() => this.addChar('-'))} onTouchStart={() => this.onTouchStart(() => this.addChar('-'))}></Key>
                    <Key text={'*'} onClick={() => this.onClick(() => this.addChar('*'))} onTouchStart={() => this.onTouchStart(() => this.addChar('*'))}></Key>
                    <Key text={'/'} onClick={() => this.onClick(() => this.addChar('/'))} onTouchStart={() => this.onTouchStart(() => this.addChar('/'))}></Key>
                </div>

                <div className='Holder'>
                    <Key text={'7'} onClick={() => this.onClick(() => this.addChar('7'))} onTouchStart={() => this.onTouchStart(() => this.addChar('7'))}></Key>
                    <Key text={'8'} onClick={() => this.onClick(() => this.addChar('8'))} onTouchStart={() => this.onTouchStart(() => this.addChar('8'))}></Key>
                    <Key text={'9'} onClick={() => this.onClick(() => this.addChar('9'))} onTouchStart={() => this.onTouchStart(() => this.addChar('9'))}></Key>
                    <Key text={'^x'} onClick={() => this.onClick(() => this.addChar('^'))} onTouchStart={() => this.onTouchStart(() => this.addChar('^'))}></Key>
                </div>

                <div className='Holder'>
                    <Key text={'4'}  onClick={() => this.onClick(() => this.addChar('4'))} onTouchStart={() => this.onTouchStart(() => this.addChar('4'))}></Key>
                    <Key text={'5'}  onClick={() => this.onClick(() => this.addChar('5'))} onTouchStart={() => this.onTouchStart(() => this.addChar('5'))}></Key>
                    <Key text={'6'}  onClick={() => this.onClick(() => this.addChar('6'))} onTouchStart={() => this.onTouchStart(() => this.addChar('6'))}></Key>
                    <Key text={'π'}   onClick={() => this.onClick(() => this.addChar('π'))} onTouchStart={() => this.onClick(() => this.addChar('π'))}></Key>
                </div>

                <div className='Holder'>
                    <Key text={'1'}  onClick={() => this.onClick(() => this.addChar('1'))} onTouchStart={() => this.onTouchStart(() => this.addChar('1'))}></Key>
                    <Key text={'2'}  onClick={() => this.onClick(() => this.addChar('2'))} onTouchStart={() => this.onTouchStart(() => this.addChar('2'))}></Key>
                    <Key text={'3'}  onClick={() => this.onClick(() => this.addChar('3'))} onTouchStart={() => this.onTouchStart(() => this.addChar('3'))}></Key>
                    <Key text={'e'}  onClick={() => this.onClick(() => this.addChar('e'))} onTouchStart={() => this.onClick(() => this.addChar('e'))}></Key>
                </div>

                <div className='Holder'>
                    <Key text={'.'}                 onClick={() => this.onClick(() => this.addChar('.'))} onTouchStart={() => this.onTouchStart(() => this.addChar('.'))}></Key>
                    <Key text={'0'}                 onClick={() => this.onClick(() => this.addChar('0'))} onTouchStart={() => this.onTouchStart(() => this.addChar('0'))}></Key>
                    <Key text={'='} isHor={true}    onClick={() => this.onClick(() => this.calculate())} onTouchStart={() => this.onTouchStart(() => this.calculate())}></Key>
                </div>

            </div>
        );
    }
};

module.exports = Calculator;