function importIncludesType({ specifiers = [] }, type) {
    return specifiers.some(specifier => {
        return (specifier.type === 'ImportSpecifier' && specifier.imported.name === type)
    });
}

function importHasImmutableType(importDeclaration, type) {
    const isImmutable = importDeclaration.source.value === 'immutable';
    if (!isImmutable) return false;

    return importIncludesType(importDeclaration, type);
}

module.exports = context => {
    let hasMapImport = false;
    let hasSetImport = false;
    // Todo: Use alias to track calls to immutable methods
    // when require()'d
    let immutableAlias = '';

    return {
        ImportDeclaration(node) {
            if (importHasImmutableType(node, 'Map')) {
                hasMapImport = true;
            }

            if (importHasImmutableType(node, 'Set')) {
                hasSetImport = true;
            }
        },
        CallExpression({ callee, parent, arguments:args = [] }) {
            if (
                callee.name !== 'require' ||
                parent.type !== 'VariableDeclarator' ||
                !(args[0] && args[0].value === 'immutable')
            ) {
                return;
            }

            immutableAlias = parent.id.name;
        },
        Identifier(node) {
            if (node.parent.type === 'ImportSpecifier') return;

            if (node.name === 'Map' && !hasMapImport) {
                context.report({
                    message: 'Native ES6 Map is not allowed. Use Immutable.Map()',
                    node
                });
            }

            if (node.name === 'Set' && !hasSetImport) {
                context.report({
                    message: 'Native ES6 Set is not allowed. Use Immutable.Set()',
                    node
                });
            }
        }
    }
};
