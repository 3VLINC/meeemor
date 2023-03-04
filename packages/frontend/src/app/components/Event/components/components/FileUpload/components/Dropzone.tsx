import { useDropzone } from 'react-dropzone';
import { useGetFirstFile } from '../hooks/useGetFirstFile';
export const Dropzone = ({
  onDrop,
}: {
  onDrop: (accepted: File[]) => void;
}) => {
  const getFirstFile = useGetFirstFile();
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  const currentFile = getFirstFile(acceptedFiles);

  let inside: JSX.Element | null = null;

  if (isDragActive) {
    inside = <p>Drop the files here ...</p>;
  } else if (currentFile) {
    inside = <p>{currentFile.name}</p>;
  } else {
    inside = <p>Drag and drop your meme here</p>;
  }

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {inside}
    </div>
  );
};
