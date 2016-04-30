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
            import { Map } from 'immutable';
            const a = Map();`
        ),
        validCode(`
            import { Set } from 'immutable';
            const a = Set();
        `)
    ];

    const invalid = [{
        code: 'instanceOf(Map);',
        parserOptions: { ecmaVersion: 6 },
        errors: [{
            message: 'Native ES6 Map is not allowed. Use Immutable.Map()'
        }]
    }, {
        code: 'instanceOf(Set)',
        parserOptions: { ecmaVersion: 6 },
        errors: [{
            message: 'Native ES6 Set is not allowed. Use Immutable.Set()'
        }]
    }];

    ruleTester.run('immutable-no-map-set', rule, { valid, invalid });
});
