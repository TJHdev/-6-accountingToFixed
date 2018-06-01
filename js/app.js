/*
In AccountingJS 13, we looked at accounting.toFixed method. 
We found that we could improve the function by simulating calculations like 1.005 * 100 with 1.005e2 
(using exponential notation).

Your job is to rewrite accounting.toFixed so that it does NOT use multiplication or exponential notation. 
Instead, you will actually move the decimal point using string manipulation.

So in the example above, instead of using 1.005e2, you'll need to figure out a way to work with the string "1.005" 
and then create a new string with the decimal point moved over two places to the right. 
In other words, you need to turn "1.005" into "100.5" using string manipulation.

Include tests that cover the weird cases we saw in the video like 0.615, 10.235, and 1.005.

This is more of a fun exercise than a practical solution since exponential notation works fine, 
but it's a great way to force you to learn about string manipulation. 
It also helps to reinforce what you've learned, so I'll take it :)

Also if you didn't know about exponential notation, this would be a great approach. 
So this is a good way to see how to a problem from a different angle.

*/

//original implementation

function betterToFixed(value, precision) {
    //         precision = checkPrecision(precision, lib.settings.number.precision);
            var tempNumber = Number(value + 'e' + precision);
            var roundedNumber = Math.round(tempNumber);
            var preciseNumber = Number(roundedNumber + 'e-' + precision);
            var stringifiedNumber = preciseNumber.toFixed(precision); 
            return stringifiedNumber;
};



function stringMethodToFixed(value, precision){
    if(arguments.length!==2){
        throw new Error ("Only accepts two arguments, no more, no less!");
    } else if(typeof(value)!=='number' || typeof(precision)!=='number'){
        throw new TypeError ("Both arguments must be of type 'number'")
    } else if(precision > 100 || precision < 0){
        throw new RangeError ("'precision' must be between 0 and 100")
    }

    //declartions
    var arrayedValue;
    var valueLength;
    var initialIndexOfDecimalPlace;
    var roundingValue;
    var roundedValue;
    var finalString;
    var initialPrecision;
    var differenceInPrecision;
    
    //setting declartions
    arrayedValue = Array.from(String(value));
    valueLength = arrayedValue.length;
    initialIndexOfDecimalPlace = arrayedValue.indexOf('.');
    initialPrecision = valueLength - initialIndexOfDecimalPlace -1;

    //if precision requirement is longer than the intial precision, just add 0's to the end.
    if(precision > initialPrecision){
        differenceInPrecision = precision - initialPrecision;
        for (var i = 0 ; i < differenceInPrecision;  i++){
            value += "0";
        }
        return value;
    }

    // else alter to the correct precision.
    arrayedValue.splice(initialIndexOfDecimalPlace,1);
    arrayedValue.splice(initialIndexOfDecimalPlace + precision, 0,'.');
    roundingValue = Number(arrayedValue.join(""));
    roundedValue = Math.round(roundingValue);

    arrayedValue = Array.from(String(roundedValue));
    valueLength = arrayedValue.length;
    arrayedValue.splice(valueLength - precision, 0,'.'); 
    roundedValue = Number(arrayedValue.join(""));
    finalString = roundedValue.toString();

    return finalString;
}



// var array = [0,1,2,3,4,5];
// array.splice(2,1)
// console.log(array);

// var array = [0,1,2,3,4,5];
// array.splice(2,0,'test')
// console.log(array);

// var array = [0,1,2,3,4,5];
// array.splice(2,1,'test', 'test2')
// console.log(array);


// stringMethodToFixed(0.615, 2) // should return 0.62

// stringMethodToFixed(10.235, 2) // should return 10.24

// stringMethodToFixed(1.005, 2) // should return 1.01



// var testBool = true;

// try {
//     if(testBool){
//         throw 'testing error message';
//     }
// } catch(err){
//     console.log(err);
// }




// function CustomError (message){
//     this.message = message;
// }

// var testBool = true;

// try {
//     if(testBool){
//         throw new CustomError('testing error message');
//     }
// } catch(err){
//     console.log(err.name);
// }