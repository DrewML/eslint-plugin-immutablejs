# ESLint - No ES2015 Map/Set

This is an [ESLint](http://eslint.org/) rule that forbids using the native ES2016 `Map/Set`. You'll likely only be interested in this rule if you are using [`Immutable.js`](https://facebook.github.io/immutable-js/).

## Why?

There are 2 primary reasons for this rule.

1. When using [`React`](https://facebook.github.io/react/) with `Immutable.js`, there are times when you will be passing down a `prop` that is expected to be a `Map` or `Set`. When using `React`'s `PropTypes` feature with the `instanceOf` validator, it's very easy to forget to import `Immutable.js`, and you'll end up with unfortunate errors if you aren't actively looking for `PropType` warnings in the console.

2. When calling the `Map` or `Set` function directly, and `Immutable.js`'s version is _not_ in scope, you'll get an error about calling the native functions without the `new` operator. This rule aims to catch that mistake before you run your code.

## Rule Details

### Examples of *incorrect* code for this rule:

```javascript
    // ImmutableJS Map/Set not in scope
    const mySet = Set();
    const myMap = Map();

    const myOtherSet = new Set();
    const myOtherMap = new Map();
```

### Examples of *correct* code for this rule:

```javascript
    import { Map, Set } from 'immutable';

    const mySet = Set();
    const myMap = Map();
```
