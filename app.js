class Calculater {
  constructor() {
    this.preValText = document.querySelector('[data-pre-val]');
    this.curValText = document.querySelector('[data-cur-val]');
    this.clear();
  }

  clear() {
    this.preVal = '';
    this.curVal = '0';
    this.operation = undefined;
  }

  updateDisplay() {
    this.curValText.innerText = this.curVal;
    this.preValText.innerText = this.preVal;
  }

  shiftValues(){
    this.preVal = this.curVal;
    this.curVal = '';
  }

  getDisplayNumber(number) {
    //console.log(this.curValText.innerText);
    if(this.curVal == '' || this.curVal == '0'){
      this.curVal = number.toString();
    } else {
      this.appendNumber(number);
    }
  }

  appendNumber(number) {
    if(number == '.' && this.curVal.includes('.')) return;
    this.curVal = this.curVal.toString() + number.toString();
  }

  handleOperator(operator){
    if(this.operation == operator && this.curVal == '' || this.curVal == '0'){
      return;
    } else if(this.operation === undefined){
      this.operation = operator;
      this.curVal = this.curVal.toString() + this.operation.toString();
      this.shiftValues();
    } else if(this.operation != undefined && this.curVal != '' ){
      this.doCalculate();
      this.operation = operator;
      this.preVal = this.curVal.toString() + this.operation.toString();
      this.updateDisplay();
      this.curVal = '';
    } else {
      this.operation = operator;
      this.preVal = this.preVal.slice(0, -1);
      this.preVal = this.preVal.toString() + this.operation.toString();
    }
  }

  handleEqual(){
    if(this.preVal == '') return
    this.preVal = this.preVal.toString() + this.curVal.toString();
  }

  handleDelete(){
    this.curVal = this.curVal.slice(0, -1);
  }

  doCalculate(){
    if(this.preVal == '') return
    switch(this.operation) {
      case '+':
        this.curVal = (parseFloat(this.preVal.slice(0, -1)) + parseFloat(this.curVal)).toString();
        this.operation = undefined;
        break;
      case '-':
        this.curVal = (parseFloat(this.preVal.slice(0, -1)) - parseFloat(this.curVal)).toString();
        this.operation = undefined;
        break;
      case '*':
        this.curVal = (parseFloat(this.preVal.slice(0, -1)) * parseFloat(this.curVal)).toString();
        this.operation = undefined;
        break;
      case '÷':
        this.curVal = (parseFloat(this.preVal.slice(0, -1)) / parseFloat(this.curVal)).toString();
        this.operation = undefined;
        break;
      default:
        this.clear();
    }
  }

}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const equalButton = document.querySelector('[data-equal]');

const calculater = new Calculater();

numberButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    let number = e.target.innerText;
    //console.log(typeof(number));
    calculater.getDisplayNumber(number);
    calculater.updateDisplay();
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    let operator = e.target.innerText;
    //console.log(operator);
    calculater.handleOperator(operator);
    calculater.updateDisplay();
  })
})

deleteButton.addEventListener('click', (e) => {
  e.preventDefault();
  calculater.handleDelete();
  calculater.updateDisplay();
})

clearButton.addEventListener('click', (e) => {
  e.preventDefault();
  calculater.clear();
  calculater.updateDisplay();
})

equalButton.addEventListener('click', (e) => {
  e.preventDefault();
  calculater.handleEqual();
  calculater.doCalculate();
  calculater.updateDisplay();
})
