const React = require('react');

class Key extends React.Component
{
    constructor(props)
    {
        super(props);

        this.onClick = this.props.onClick;
        this.onTouchStart = this.props.onTouchStart;
    }

    render()
    {
        return (
            <div className='Key' onTouchStart={() => this.onTouchStart()} onClick={() => this.onClick()}>
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

module.exports = Key;