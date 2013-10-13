var Q = require('q');
var expect = require('chai').expect


describe('Basic two functions chaining', function () {

  it('', function () {
    /**
     * We have two functions:
     * #sayMyName: returns a promised value containing a name
     * #printIt: prints a given name to the console prefixed by 'Hello'
     */

    function sayMyName() {
      return Q("Joe");
    }

    function printIt(name) {
      console.log('Hello ' + name);
    }

    /**
     * We can call #sayMyName, which returns a promise, and use the promise#then() function to execute
     * #printIt once the promised is fullfiled. Notice how the return value of #sayMyName, is passed as
     * an argument to #printIt.
     */
    sayMyName().then(printIt).done();

  })

})

describe('Basic two functions chaining with async behavior', function () {

  it('', function (done) {

    /**
     * Now the same example with real async. behavior
     */
    function delayMyName() {
      var deferred = Q.defer()
      setTimeout(function () {
        deferred.resolve("Joe");
      }, 100);
      return deferred.promise;
    }

    function printIt(name) {
      console.log('Hello ' + name);
    }

    var p = delayMyName().then(printIt);

    // Necessary to complete the test case
    p.then(done).done();


  })
})

describe('Chaining of multiple functions', function () {
  it('', function () {

    /**
     * We can chain as many functions as we want
     */

    function seed() {
      return Q(10);
    }

    function doubleIt(seed) {
      return Q(seed * 2);
    }

    function subtract(number) {
      return Q(number - 2);
    }

    function assertResult(result) {
      expect(result).to.eql(18);
    }

    /**
     * Let's chain them all together
     */
    seed().then(doubleIt).then(subtract).then(assertResult).done();


  })
});

describe('Chaining a function with non-promise return value', function () {
  it('', function () {

    /**
     * If a certain function is chained to another function, we don't
     * need to wrap its result with Q to create a promise. Q makes sure that the
     * result is wrapped with a promise.
     */

    function seed() {
      return Q(10);
    }

    /**
     * Notice that the #doubleIt function does not return a promise
     */
    function doubleIt(number) {
      return number * 2
    }

    /**
     * And yet we can put it in chain. Nice huh? :)
     */
    seed().then(doubleIt()).then(function (result) {
      expect(result).to.eql(20);
    }).done();
  })

})


