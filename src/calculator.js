import React from 'react';
import './calc.css';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "",
            total: 0
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const name = "display";

        if (isNaN(parseInt(target.outerText))) {
            if (target.outerText === 'C' || target.outerText === 'CE') {
                this.setState({
                    [name]: "",
                    ['total']: 0
                });
                return;
            }
        }
        try {
            let value = `${this.state.display}${target.outerText}`;
            this.setState({
                [name]: value,
                ['total']: this.addbits(value)
            });
        } catch (e) {
            console.log(e)
        }
    }

    addbits(expression) {
        expression = expression.split(" = ")[0].trim();
        console.log(expression);
        var copy = expression;

        expression = expression.replace(/[0-9]+/g, "#").replace(/[\(|\|\.)]/g, "");
        var numbers = copy.split(/[^0-9\.]+/);
        var operators = expression.split("#").filter(function (n) { return n });
        var result = [];

        for (let i = 0; i < numbers.length; i++) {
            result.push(numbers[i]);
            if (i < operators.length) result.push(operators[i]);
        }

        let total = 0,
            oper;
        while (result.length) {
            let num = result.shift();
            if (isNaN(parseInt(num))) {
                oper = num;
            } else {
                if (oper) {
                    switch (oper) {
                        case "+":
                            total = parseInt(total) + parseInt(num);
                            break;
                        case "-":
                            total = parseInt(total) - parseInt(num);
                            break;
                        case "/":
                            total = parseInt(total) / parseInt(num);
                            break;
                        case "*":
                            total = parseInt(total) * parseInt(num);
                            break;
                        default:
                    }
                } else {
                    total = parseInt(num);
                }
            }
            console.log("Drop", total);
        }

        return total;
    }


    render() {
        return (
            <div>
                <div>
                    <input
                        name="display"
                        type="text"
                        className="display"
                        value={this.state.display}
                        disabled={true} />
                    <div className="total">
                        {this.state.display.length >= 3 ? <span>&#61; {this.state.total}</span> : null}
                    </div>
                </div>
                <div className="grid-container">
                    {["1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "/", "0", "*", "C", "CE"].map((button, index) => {
                        return <div 
                                    key={index} 
                                    className="grid-item">
                                    <button 
                                        name={button} 
                                        className="expand" 
                                        onClick={this.handleInputChange}>
                                        {button}
                                    </button>
                        </div>
                    })}
                </div>
            </div>
        );
    }
}

export default Calculator;