import Dropzone from 'react-dropzone';

function MediaUploadForm({ handleFiles }) {
  return (
    <div className="p-2 w-full">
      <Dropzone onDrop={(acceptedFiles) => {
        if (handleFiles) handleFiles(acceptedFiles);
      }}
      >
        {({ getRootProps, getInputProps }) => (
          <section className="w-full">
            <div {...getRootProps()} className="w-full sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-2/3 p-4 border-2 rounded-md border-gray-500 bg-gray-500 hover:border-blue-500 active:border-green-500 bg-opacity-30 hover:underline">
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
