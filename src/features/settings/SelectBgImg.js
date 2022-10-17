import { useState } from 'react';
import StdButton from '../../components/Interactive/StdButton';
import uploadFiles from '../../util/uploads/uploadFiles';

function SelectBgImg({ onClose, onUploaded }) {
  const [tempFile, setTempFile] = useState(null);

  return (
    <div className="flex flex-col justify-start items-start w-1/3 p-2 rounded-md bg-slate-400 bg-opacity-30">
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files[0]) {
            setTempFile(e.target.files[0]);
          }
        }}
      />
      {tempFile && (
        <img
          alt=""
          src={URL.createObjectURL(tempFile)}
          style={{
            height: 140,
            width: 200,
            objectFit: 'cover',
          }}
        />
      )}
      <div className="flex flex-row justify-around items-center w-full">
        <StdButton onClick={async () => {
          if (tempFile) {
            const res = await uploadFiles([tempFile], false);
            // console.log(res);
            if (onUploaded) onUploaded(res);
          }
        }}
        >
          Upload
        </StdButton>
        <StdButton onClick={onClose}>
          Cancel
        </StdButton>
      </div>
    </div>
  );
}

export default SelectBgImg;
