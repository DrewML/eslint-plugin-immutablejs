import test from 'ava';
import rule from './index';
import RuleTester from 'eslint/lib/testers/rule-tester';

const parserOptions = {
    ecmaVersion: 6,
    sourceType: 'module'
};

function validCode(code) {
    return {
        code,
        parserOptions
    };
}

test('Rule Works', t => {
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
        `)
    ];

    const invalid = [{
        code: 'instanceOf(Map);',
        parserOptions,
        errors: [{
            message: 'Native ES6 Map is not allowed. Use Immutable.Map()'
        }]
    }, {
        code: 'instanceOf(Set)',
        parserOptions,
        errors: [{
            message: 'Native ES6 Set is not allowed. Use Immutable.Set()'
        }]
    }, {
        code: `
            import immute from 'immutable';
            const a = Map();
            const b = Set();
        `,
        parserOptions,
        errors: [{
            message: 'Native ES6 Map is not allowed. Use Immutable.Map()'
        }, {
            message: 'Native ES6 Set is not allowed. Use Immutable.Set()'
        }]
    }];

    ruleTester.run('immutable-no-map-set', rule, { valid, invalid });
});
