export const createActivityQuery = () => (
  `mutation($params: CreateActivityInput) {
    createActivity(params: $params) {
      id
      createdAt
      duration
      kind
      title
      status
      scheduledDate
    }
  }`
);

export const deleteActivityQuery = () => (
  `mutation($id: ID!) {
    deleteActivity(id: $id) {
      id
    }
  }`
);

export const fetchActivityQuery = () => (
  `query{
    viewer {
      id
      activities {
        edges {
          node {
            id
            kind
            status
            title
            scheduledDate
            duration
            createdAt
          }
        }
      }
    }
  }`
);
