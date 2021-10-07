import { DataStore } from 'notarealdb';

const store = new DataStore('./data');

export default {
  companies: store.collection('companies'),
  jobs: store.collection('jobs'),
  users: store.collection('users')
};
