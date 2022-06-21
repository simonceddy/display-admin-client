import Dropzone from 'react-dropzone';

function MediaUploadForm({ handleFiles }) {
  return (
    <div className="p-2">
      <span className="mr-2">Upload files</span>
      <Dropzone onDrop={(acceptedFiles) => {
        console.log(acceptedFiles);
        if (handleFiles) handleFiles(acceptedFiles);
      }}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Click to select/Drag images or video here</p>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
}

export default MediaUploadForm;
