import test from 'ava';
import rule from '../lib/rules/no-native-map-set';
import RuleTester from 'eslint/lib/testers/rule-tester';

const parserOptions = {
    ecmaVersion: 6,
    sourceType: 'module'
};

const errors = [{
    message: 'Native ES6 Map is not allowed. Use Immutable.Map()'
}, {
    message: 'Native ES6 Set is not allowed. Use Immutable.Set()'
}];

function validCode(code) {
    return {
        code,
        parserOptions
    };
}

function invalidCode(code) {
    return {
        code,
        parserOptions,
        errors
    };
}

test('"immutable-no-map-set" Rule', t => {
    const ruleTester = new RuleTester();

    const valid = [
        validCode(`
            import { Map, Set } from 'immutable';
            const a = Map();
            const b = Set();
        `),
        validCode(`
            import immute from 'immutable';
            const Map = immute.Map;
            const Set = immute.Set;
            const a = Map();
            const b = Set();
        `),
        validCode(`
            const immute = require('immutable');
            const Set = immute.Set;
            const Map = immute.Map;
            const a = Map();
            const b = Set();
        `),
        validCode(`
            import { Map, Set } from 'immutable';
            foo.propTypes = {
                foo: instanceOf(Map),
                bar: instanceOf(Set)
            }
        `),
        validCode(`
            import immutable from 'immutable';
            const { Map } = immutable;
        `)
    ];

    const invalid = [
        invalidCode(`
            foo.propTypes = {
                foo: instanceOf(Map),
                bar: instanceOf(Set)
            }
        `),
        invalidCode(`
            import immute from 'immutable';
            const a = Map();
            const b = Set();
        `),
        invalidCode(`
            Map() && Set();
        `),
        invalidCode(`
            new Map() && new Set();
        `)
    ];

    ruleTester.run('immutable-no-map-set', rule, { valid, invalid });
});
