// import Dropzone from 'react-dropzone';

function MediaUploadForm({ handleFiles }) {
  return (
    <div className="p-2 w-full">
      <input
        type="file"
        onChange={(e) => {
          if (handleFiles) handleFiles(e.target.files);
        }}
      />
    </div>
  );
}

export default MediaUploadForm;
