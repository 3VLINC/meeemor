import { CircularProgress } from '@mui/material';

export const UploadingProgress = ({ progress }: { progress: number }) => {
  return <CircularProgress value={progress * 100} />;
};
