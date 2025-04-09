

// Wait for DOM to fully load as otherwise errors will appear
document.addEventListener('DOMContentLoaded', () => {
    // For the Calculations page
    // getting the button to calculate
    const calculate = document.querySelector('#calculate');
    // Only run calculate if the calc button exists
    if (calculate) {
        // checking if the button is clicked
        calculate.addEventListener('click', () => {
            // variable for the amount of errors in the input
            let errors = 0
            // variable for error message
            let errorMessageBlank = []
            let errorMessageLetter = []
            let errorMessageNeg = []
            // getting the inputs
            let inputs = [
                document.getElementById('car-speed'), // 0
                document.getElementById('battery-size'), // 1
                document.getElementById('charger-speed'), // 2
                document.getElementById('starting-charge'), // 3
                document.getElementById('ending-charge'), // 4
                document.getElementById('effi'), // 5
                document.getElementById('cost') // 6
            ];
            // checking each input for errors
            for (let i = 0; i < inputs.length; i++) {
                // getting the value of the input that is getting checked in the loop
                let value = inputs[i].value;
                // getting the name of the value that is getting checked in the loop
                let label = inputs[i].parentElement.querySelector('p').innerText;
                // checking if the input value is empty or undefined
                if (value === undefined || value === '' || value === null) {
                    // adding to count if there is an error
                    errors++
                    // creating the message to show in the alert
                    errorMessageBlank.push(label)
                } else if (isNaN(value)) {
                    // adding to count if there is an error
                    errors++
                    // creating the message to show in the alert
                    errorMessageLetter.push(label)                    
                } else if (value < 0) {
                    errors++
                    errorMessageNeg.push(label)
                }
            }

            // creating the alert message if there are errors in the inputs
            if (errors > 0) {
                let message = ''
                // checking if there are any errors in the input where the input is blank
                if (errorMessageBlank.length > 0) {
                    // removing duplicates
                    let uniqueErrorMessageBlank = [...new Set(errorMessageBlank)]
                    // adding to the message the inputs that have this error
                    message += 'Missing: ' + uniqueErrorMessageBlank.join(', ') + '. ';
                }
                // checking if there are any errors in the input where there are letters in the input
                if (errorMessageLetter.length > 0) {
                    // removing duplicates
                    let uniqueErrorMessageLetter = [...new Set(errorMessageLetter)]
                    // adding to the message the inputs that have this error
                    message += '\nInvalid (must be a number): ' + uniqueErrorMessageLetter.join(', ') + '.';
                }
                // checking if there are any negative numbers
                if (errorMessageNeg.length > 0) {
                    let uniqueErrorMessageNeg = [...new Set(errorMessageNeg)]
                    // adding to the message the inputs that have this error
                    message += '\nInvalid (must be positive): ' + uniqueErrorMessageNeg.join(', ') + '. ';
                }

                // alerting the user of these errors
                alert(message);
                // console logging it for easier testing and debugging
                console.log(message);
            }
            // calculating output if there are no errors in the input
            if (errors === 0) {
                // getting the variable values using parseFloat, which takes the input of a string and tries to convert it to a decimal/number, if it is unable to convert it into a number it gives NaN. It shouldn't give NaN as I have already tested the inputs in the code above, but this is just a precaution
                let carSpeed = parseFloat(inputs[0].value);
                let carBattery = parseFloat(inputs[1].value);
                let chargerSpeed = parseFloat(inputs[2].value);
                let startingCharge = parseFloat(inputs[3].value);
                let endingCharge = parseFloat(inputs[4].value);
                let amountToCharge = (endingCharge-startingCharge)/100
                let effiDeci = parseFloat(inputs[5].value) / 100;
                let cost = parseFloat(inputs[6].value);
                
                // getting the minimum value from charger speed or car speed
                let speed = Math.min(carSpeed, chargerSpeed);
                // calculating charging time
                chargingTime = (carBattery*amountToCharge)/(speed*effiDeci)
                // calculating charging cost
                chargingCost = ((carBattery*amountToCharge)/effiDeci)*cost
                // calculating charging time in hours
                let hrs = Math.floor(chargingTime)
                // calculating left over charging time in minutes
                let mins = Math.round((Math.round(chargingTime*100)/100-hrs)*60)
                // if it takes less then 1 hour, don't need to display the time in hours
                if (hrs < 1) {
                    document.querySelector("#charging-time").innerHTML = mins + ' minutes'
                } else {
                    document.querySelector("#charging-time").innerHTML = hrs + ' hours & ' + mins + ' minutes'
                }
                // calculating charging cost
                document.querySelector('#charging-cost').innerHTML = '$' + Math.round(chargingCost*100)/100
                // changing font size
                document.getElementById('outputContainer').style.fontSize = '2vh'
            }
        });
    } else {
        console.error('Element with ID "calculate" not found.');
    }
    // when the reset button is clicked, reset the input fields and output
    document.querySelector('#reset').addEventListener('click', () => {
        // resetting the input fields to blank when the reset button is clicked
        document.getElementById('car-speed').value = ''
        document.getElementById('battery-size').value = ''
        document.getElementById('charger-speed').value = ''
        document.getElementById('starting-charge').value = ''
        document.getElementById('ending-charge').value = ''
        document.getElementById('effi').value = '95'
        document.getElementById('cost').value = '0.25'
        // removing the output from being displayed
        document.getElementById('outputContainer').style.fontSize = '0'
    });
});
