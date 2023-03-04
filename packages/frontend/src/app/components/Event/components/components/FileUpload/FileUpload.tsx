import { FieldProps } from 'formik';
import { SubmitProps } from '../../SubmitForm.interface';
import { useCallback } from 'react';
import { useFileUpload } from './hooks/useFileUpload';
import { Dropzone } from './components/Dropzone';
import { useGetFirstFile } from './hooks/useGetFirstFile';
import { UploadingProgress } from './components/UploadingProgress';

export const FileUpload: React.FC<FieldProps<SubmitProps>> = ({
  field: { name },
  form: { setFieldValue },
}) => {
  const getFirstFile = useGetFirstFile();

  const handleComplete = () => {
    console.log('complete');
  };

  const { upload, progress, uploading } = useFileUpload({
    onComplete: handleComplete,
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = getFirstFile(acceptedFiles);

      if (!file) return;

      upload(file);
    },
    [getFirstFile, upload]
  );

  if (uploading) {
    return <UploadingProgress progress={progress} />;
  } else {
    return <Dropzone onDrop={handleDrop} />;
  }
};
