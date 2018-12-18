import {Map} from 'immutable';

export const mapNodesFromJson = resources => {
  return resources
    .map(resource => resource)
    .reduce(
      (resources, resource) => {
        const {node} = resource;
        return resources.set(node.id, node);
      }, Map()
    );
};
