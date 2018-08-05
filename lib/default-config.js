'use babel'

export default {
  "component-name-collision-pattern": {
      "type": [ "string" ],
      "default": "${name}Component",
      "description": "Component name collision pattern"
  },
  "component-superclass": {
      "type": [ "string" ],
      "default": "Component",
      "description": "Component superclass (Component or PureComponent)"
  },
  "default-component-name": {
      "type": [ "string" ],
      "default": "Component",
      "description": "Default component name"
  },
  "default-hoc-component-name": {
      "type": [ "string" ],
      "default": "InnerComponent",
      "description": "Default HOC component name"
  },
  "end-of-line": {
      "type": [ "string" ],
      "default": "\n",
      "description": "End of line characters"
  },
  "functional-component-type": {
      "type": [ "string" ],
      "default": "arrow",
      "description": "Functional component type (arrow or function)"
  },
  "R-Factor.indent": {
      "type": [ "string", "number" ],
      "default": 2,
      "description": "Indent"
  },
  "map-dispatch-to-props-name": {
      "type": [ "string" ],
      "default": "mapDispatchToProps",
      "description": "mapDispatchToProps name"
  },
  "map-state-to-props-name": {
      "type": [ "string" ],
      "default": "mapStateToProps",
      "description": "mapStateToProps name"
  },
  "merge-props-name": {
      "type": [ "string" ],
      "default": "mergeProps",
      "description": "mergeProps name"
  },
  "modules-order": {
      "type": [ "string", "array" ],
      "default": [
          "react",
          "react-dom",
          "prop-types",
          "classnames",
          "lodash",
          "lodash-es",
          "underscore",
          "redux-saga",
          "redux-saga/effects",
          "react-redux",
          "react-router-redux",
          "redux-actions",
          "reselect",
          "re-reselect",
          "react-router",
          "react-router-dom",
          "react-hot-loader"
      ],
      "description": "Modules order"
  },
  "quotes": {
      "type": [ "string" ],
      "default": "single",
      "description": "Quotes (backtick, single or double)"
  },
  "semicolons": {
      "type": [ "bool" ],
      "default": true,
      "description": "Semicolons"
  },
  "trailing-commas": {
      "type": [ "bool" ],
      "default": false,
      "description": "Trailing commas"
  },
  "use-map-dispatch-to-props-shorthand": {
      "type": [ "bool" ],
      "default": false,
      "description": "Prefer object version of mapDispatchToProps"
  },
  "NODE_BIN": {
      "type": [ "string" ],
      "default": "node",
      "description": "Node.js binary path"
  }
};
