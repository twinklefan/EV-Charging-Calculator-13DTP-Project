// Wait for DOM to fully load as otherwise errors will appear
document.addEventListener('DOMContentLoaded', () => {
    // For the Calculations page
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
    // getting the saved preferences for the user if exists 
    if (localStorage.getItem('carSpeed')) {
        // setting the input box value to the saved input
        document.querySelector('#car-speed').value = localStorage.getItem('carSpeed');
    }
    // repeat this for the other inputs
    if (localStorage.getItem('carBattery')) {
        document.querySelector('#battery-size').value = localStorage.getItem('carBattery');
    }
    if (localStorage.getItem('chargerSpeed')) {
        document.querySelector('#charger-speed').value = localStorage.getItem('chargerSpeed');
    }
    if (localStorage.getItem('startingCharge')) {
        document.querySelector('#starting-charge').value = localStorage.getItem('startingCharge');
    }
    if (localStorage.getItem('endingCharge')) {
        document.querySelector('#ending-charge').value = localStorage.getItem('endingCharge');
    }
    if (localStorage.getItem('effi')) {
        document.querySelector('#effi').value = localStorage.getItem('effi');
    }
    if (localStorage.getItem('cost')) {
        document.querySelector('#cost').value = localStorage.getItem('cost');
    }
    // getting the button for calculate
    const calculate = document.querySelector('#calculate');
    // Only run calculate function  if the calc button exists
    if (calculate) {
        // checking if the button is clicked
        calculate.addEventListener('click', () => {
            // variable for the amount of errors in the input
            let errors = 0
            // variable for error message
            let errorMessageBlank = []
            let errorMessageLetter = []
            let errorMessageNeg = []
           
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
                    errorMessageBlank.push(" " + label)
                } else if (isNaN(value)) {
                    // adding to count if there is an error
                    errors++
                    // creating the message to show in the alert
                    errorMessageLetter.push(" " + label)                    
                } else if (value < 0) {
                    errors++
                    errorMessageNeg.push(" " + label)
                }
            }
            if (inputs[3].value > inputs[4].value) {
                errors++
            }
            // Going through all the errors and creating error messages
            if (errors > 0) {
                // checking if there are any errors in the input where the input is blank
                if (errorMessageBlank.length > 0) {
                    // making a toast notification
                    Toastify({
                        // getting the input that are blank
                        text: [...new Set(errorMessageBlank)] + ' input is empty',
                        duration: -1,
                        close: true,
                        gravity: "bottom", // `top` or `bottom`
                        position: "left", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        className: "message", // extra css styling in the index.css
                        style: {
                            background: "linear-gradient(red)", // background colour
                        },
                        onClick: function(){} // Callback after click
                    }).showToast(); // displaying the text
                }
                // checking if there are any errors in the input where there are letters in the input
                if (errorMessageLetter.length > 0) {
                    // making a toast notification
                    Toastify({
                        // getting the input that have characters that arent a number
                        text: [...new Set(errorMessageLetter)] + ' inputs are invalid, it must be a number',
                        duration: -1,
                        close: true,
                        gravity: "bottom", // `top` or `bottom`
                        position: "left", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        className: "message", // extra css styling in the index.css
                        style: {
                            background: "linear-gradient(red)", // background colour
                        },
                        onClick: function(){} // Callback after click
                    }).showToast(); // displaying the text
                }
                // checking if there are any negative numbers
                if (errorMessageNeg.length > 0) {
                    // making a toast notification
                    Toastify({
                        // getting the input that are negative
                        text: [...new Set(errorMessageNeg)] + ' input must be positive',
                        duration: -1,
                        close: true,
                        gravity: "bottom", // `top` or `bottom`
                        position: "left", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        className: "message", // extra css styling in the index.css
                        style: {
                            background: "linear-gradient(red)", // background colour
                        },
                        onClick: function(){} // Callback after click
                    }).showToast(); // displaying the text
                }
                // checking if the percentage is over 100%
                if (inputs[4].value > 100 || inputs[5].value > 100) {
                    // making a toast notification
                    Toastify({
                        // getting the input that are blank
                        text: 'Invalid percentage, must be below 100%',
                        duration: -1,
                        close: true,
                        gravity: "bottom", // `top` or `bottom`
                        position: "left", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        className: "message", // extra css styling in the index.css
                        style: {
                            background: "linear-gradient(red)", // background colour
                        },
                        onClick: function(){} // Callback after click
                    }).showToast(); // displaying the text
                }
                console.log('hi')
                // Checking if the final charge percentage is larger than the initial charge
                if (inputs[3].value > inputs[4].value) {
                    console.log('error')
                    // making a toast notification
                    Toastify({
                        // getting the input that are blank
                        text: "You can't have a starting charge larger than the final charge",
                        duration: -1,
                        close: true,
                        gravity: "bottom", // `top` or `bottom`
                        position: "left", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        className: "message", // extra css styling in the index.css
                        style: {
                            background: "linear-gradient(red)", // background colour
                        },
                        onClick: function(){} // Callback after click
                    }).showToast(); // displaying the text
                }
            }
            // calculating output if there are no errors in the input
            if (errors === 0) {
                // getting the variable values using parseFloat, which takes the input of a string and tries to convert it to a decimal/number, if it is unable to convert it into a number it gives NaN. It shouldn't give NaN as I have already tested the inputs in the code above, but this is just a precaution
                let carSpeed = parseFloat(inputs[0].value);
                let carBattery = parseFloat(inputs[1].value);                
                let chargerSpeed = parseFloat(inputs[2].value);
                let startingCharge = parseFloat(inputs[3].value);
                let endingCharge = parseFloat(inputs[4].value);
                let effi = parseFloat(inputs[5].value);
                let effiDeci = effi / 100;
                let cost = parseFloat(inputs[6].value);
                
                // getting the amount to charge value
                let amountToCharge = (endingCharge-startingCharge)/100
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

    // when the save button is clicked, save the input data to the local storage
    document.querySelector('#save').addEventListener('click', () => {
        // saving the users last entry to the local storage for input suggestion
        localStorage.setItem('carSpeed', inputs[0].value);
        localStorage.setItem('carBattery', inputs[1].value);
        localStorage.setItem('chargerSpeed', inputs[2].value);
        localStorage.setItem('startingCharge', inputs[3].value);
        localStorage.setItem('endingCharge', inputs[4].value);
        localStorage.setItem('effi', inputs[5].value);
        localStorage.setItem('cost', inputs[6].value);
        // making a toast notification
        Toastify({
            // getting the input that are blank
            text: 'Saved',
            duration: 2500,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            className: "message", // extra css styling in the index.css
            style: {
                background: "linear-gradient(330deg, var(--colour4) 0%, var(--colour2) 74%)", // background colour
            },
            onClick: function(){} // Callback after click
        }).showToast(); // displaying the text
    })
});
