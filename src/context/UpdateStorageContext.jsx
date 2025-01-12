import { createContext } from 'react';

const UpdateStorageContext = createContext({
  updateStorage: {},
  setUpdateStorage: () => {},
});

export default UpdateStorageContext;
