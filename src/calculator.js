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
            if(isNaN(parseInt(num))){
                oper = num;
            } else {
                if(oper){
                    switch(oper){
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
                        { this.state.display.length >= 3 ? <span>&#61; {this.state.total}</span> : null }
                    </div>
                </div>
                <div className="grid-container">
                    <div className="grid-item">
                        <button
                            name="1"
                            className="expand"
                            onClick={this.handleInputChange}>1</button>
                    </div>
                    <div className="grid-item">
                        <button
                            name="2"
                            className="expand"
                            onClick={this.handleInputChange}>2</button>
                    </div>
                    <div className="grid-item">
                        <button name="3"
                            className="expand"
                            onClick={this.handleInputChange}>3</button>
                    </div>
                    <div className="grid-item">
                        <button name="+"
                            className="expand"
                            onClick={this.handleInputChange}>+</button>
                    </div>
                    <div className="grid-item">
                        <button name="4"
                            className="expand"
                            onClick={this.handleInputChange}>4</button>
                    </div>
                    <div className="grid-item">
                        <button name="5"
                            className="expand"
                            onClick={this.handleInputChange}>5</button>
                    </div>
                    <div className="grid-item">
                        <button name="6"
                            className="expand"
                            onClick={this.handleInputChange}>6</button>
                    </div>
                    <div className="grid-item">
                        <button name="-"
                            className="expand"
                            onClick={this.handleInputChange}>-</button>
                    </div>
                    <div className="grid-item">
                        <button
                            name="7"
                            className="expand"
                            onClick={this.handleInputChange}>7</button>
                    </div>
                    <div className="grid-item">
                        <button name="8"
                            className="expand"
                            onClick={this.handleInputChange}>8</button>
                    </div>
                    <div className="grid-item">
                        <button name="9"
                            className="expand"
                            onClick={this.handleInputChange}>9</button>
                    </div>
                    <div className="grid-item">
                        <button name="/"
                            className="expand"
                            onClick={this.handleInputChange}>/</button>
                    </div>
                    <div className="grid-item">
                        <button name="0"
                            className="expand"
                            onClick={this.handleInputChange}>0</button>
                    </div>
                    <div className="grid-item">
                        <button name="*"
                            className="expand"
                            onClick={this.handleInputChange}>*</button>
                    </div>
                    <div className="grid-item">
                        <button name="C"
                            className="expand"
                            onClick={this.handleInputChange}>C</button>
                    </div>
                    <div className="grid-item">
                        <button name="CE"
                            className="expand"
                            onClick={this.handleInputChange}>CE</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Calculator;