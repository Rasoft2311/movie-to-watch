import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

export function registerBaseComponents(Vue) {
  const requireComponent = require.context("../components/base", true, /.*/);

  requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName);

    const componentName = upperFirst(
      camelCase(
        fileName
          .split("/")
          .pop()
          .replace(/\.\w+$/, "")
      )
    );

    Vue.component(componentName, componentConfig.default || componentConfig);
  });
}
