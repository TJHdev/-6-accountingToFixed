
QUnit.test( "It must only accept 2 arguments and they must both be of type number", function( assert ) {
    var errorWasThrow = false;
    try {
      stringMethodToFixed('2.55')
    }
    catch (err) {
      errorWasThrow = true;
      assert.strictEqual( err instanceof Error, true, "It accepts only two arguments, no more, no less!" );
    }

    errorWasThrow = false;
    try {
      stringMethodToFixed('2.55', {})
    }
    catch (err) {
      errorWasThrow = true;
      assert.strictEqual( err instanceof TypeError, true, "Both arguments are of type 'number'" );
    }
});

QUnit.test( "Precision must be between 0 and 100", function( assert ) {
    errorWasThrow = false;
    try {
      stringMethodToFixed(15, -1)
    }
    catch (err) {
      errorWasThrow = true;
      assert.strictEqual( err instanceof RangeError, true, "'precision' argument must be between 0 and 100" );
    }

});

QUnit.test( "It should return perform the correct rounding operations", function( assert ) {
    assert.strictEqual( stringMethodToFixed(0.615, 2), '0.62', "Returns the correct edge case for rounding" );
    assert.strictEqual( stringMethodToFixed(10.235, 2), '10.24', "Returns the correct edge case for rounding" );
    assert.strictEqual( stringMethodToFixed(1.005, 2), '1.01', "Returns the correct edge case for rounding" );
});

QUnit.test( "It should increase the precision even if rounding is not required", function( assert ) {
    assert.strictEqual( stringMethodToFixed(0.615, 6), '0.615000', "Returns the correct edge case for rounding" );
    assert.strictEqual( stringMethodToFixed(10.235, 6), '10.235000', "Returns the correct edge case for rounding" );
    assert.strictEqual( stringMethodToFixed(1.005, 6), '1.005000', "Returns the correct edge case for rounding" );
});

QUnit.test( "It should return without a decimal if the precision is 0", function( assert ) {
    assert.strictEqual( stringMethodToFixed(0.615, 0), '1', "Returns the correct edge case for rounding" );
    assert.strictEqual( stringMethodToFixed(10.235, 0), '10', "Returns the correct edge case for rounding" );
    assert.strictEqual( stringMethodToFixed(1.005, 0), '1', "Returns the correct edge case for rounding" );
});




// stringMethodToFixed(0.615, 2) // should return 0.62

// stringMethodToFixed(10.235, 2) // should return 10.24

// stringMethodToFixed(1.005, 2) // should return 1.01