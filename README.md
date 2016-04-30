# eslint-plugin-immutablejs

A set of [ESLint](http://eslint.org/) rules for projects using [`Immutable.js`](https://facebook.github.io/immutable-js/).

## Usage

### Install

```
npm install --save-dev eslint-plugin-immutablejs
```

### Configure

In `.eslintrc`, add a `plugins` array, and add `immutablejs`.

```json
{
    "plugins": ["immutablejs"]
}
```

Then, enable any rule(s) you wish to use, in the form of `immutablejs/rule-name-here`.

## Rules

### no-native-map-set

#### Why?

There are 2 primary reasons for this rule.

1. When using [`React`](https://facebook.github.io/react/) with `Immutable.js`, there are times when you will be passing down a `prop` that is expected to be a `Map` or `Set`. When using `React`'s `PropTypes` feature with the `instanceOf` validator, it's very easy to forget to import `Immutable.js`, and you'll end up with unfortunate errors if you aren't actively looking for `PropType` warnings in the console.

2. Catching when you use `Map`/`Set`, but forget to import them. If you run your code without this rule, you'll get an error that `Map`/`Set` cannot be invoked without the `new` operator. This rule aims to catch this and provide a more obvious error _before_ you run your code.

#### Rule Details

##### Examples of *incorrect* code for this rule:

```javascript
    // ImmutableJS Map/Set not in scope
    const mySet = Set();
    const myMap = Map();

    const myOtherSet = new Set();
    const myOtherMap = new Map();
```

##### Examples of *correct* code for this rule:

```javascript
    import { Map, Set } from 'immutable';

    const mySet = Set();
    const myMap = Map();
```

## Contributing

1. Write your rule in a new file in the `rules` folder
2. Add a test file in the `test` folder, and write appropriate test-cases
3. Add documentation about your rule to `README.md`
4. Export your rule in `index.js`
5. Submit a [Pull Request](https://github.com/DrewML/eslint-plugin-immutablejs/compare)
