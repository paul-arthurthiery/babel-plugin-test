import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";
const customParser = require("../../babel/packages/babel-parser");

module.exports = declare(api => {
  // api.assertVersion("^7")
  return {
    name: 'test',
    parserOverride(code, opts) {
      return customParser.parse(code, opts);
    },
    visitor: {
      TryStatement(path) {
        if(path.node.handlers){
          console.log(path.scope.bindings);
          const blockStatement = t.blockStatement([]);
          path.node.handlers.forEach((node, index) => {
            if(node.params && node.params.length === 2){
              if(node.params[1].name !== path.node.handlers[0].params[1].name){
                const newPath = path.get('handlers')[index];
                // console.log(newPath.scope.bindings);
                // console.log('path\n',newPath.scope, '\nhas binding \'f\'', path.scope.hasOwnBinding('f'));
                newPath.scope.rename(node.params[1].name, 'e');
              }
              blockStatement.body.push(
                t.ifStatement(
                  t.binaryExpression(
                    "===",
                    t.memberExpression(
                      t.memberExpression(
                        t.identifier(node.params[1].name),
                        t.identifier('constructor')
                      ),
                      t.identifier('name')
                    ),
                    t.stringLiteral(node.params[0].name)
                  ),
                  node.body
                )
              )
            } else {
              blockStatement.body = blockStatement.body.concat(node.body.body)
            }
          });
          path.node.handler = t.catchClause(t.identifier(path.node.handlers[0].params[1].name), blockStatement)
          delete path.node.handlers;
        }
        else {
          // console.log(path.get('handler').scope.bindings);
          return;
        }
      }
    }
  }
})
