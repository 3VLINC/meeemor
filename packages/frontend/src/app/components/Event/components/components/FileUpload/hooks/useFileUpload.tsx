import { createDirectory, upload } from 'ethfs-sdk';
import { useCallback, useState } from 'react';
import { useSigner } from 'wagmi';
import convertToBuffer from 'arraybuffer-to-buffer';
export const useFileUpload = ({
  onComplete,
}: {
  onComplete: (fileName: string) => void;
}) => {
  const { data: signer } = useSigner();
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // callback, can be null
  const onProgress = (chunkIndex: number, totalChunk: number) => {
    setProgress(chunkIndex / totalChunk);
  };

  const onError = (message: string) => {
    // TODO: better error handling
    alert(message);
  };

  const doUpload = useCallback(
    async (file: File) => {
      setUploading(true);
      if (!signer) return;

      const fileName = file.name;
      const fileSize = file.size;

      // "" means the file is in the root directory
      const dirPath = 'test/';
      const directoryPath = dirPath + fileName;

      return Promise.all([file.arrayBuffer(), createDirectory(signer)])
        .then(([buffer, contract]) => {
          if (!contract) {
            throw new Error('Failed to create directory');
          }
          console.log('contract', contract);
          return { buffer, contract };
        })
        .then(({ buffer, contract }) =>
          upload(
            signer,
            contract,
            directoryPath,
            fileSize,
            convertToBuffer(buffer),
            onProgress,
            onComplete,
            onError
          )
        )
        .catch(setError)
        .finally(() => {
          setUploading(false);
        });
    },
    [signer, onComplete]
  );

  return { upload: doUpload, progress, uploading, error };
};
