import { isArray } from 'lodash';

export const useGetFirstFile = () => (acceptedFiles: File[]) => {
  if (isArray(acceptedFiles)) {
    return acceptedFiles[0];
  }
  return acceptedFiles;
};
