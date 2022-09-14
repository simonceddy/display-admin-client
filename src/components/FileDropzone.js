import Dropzone from 'react-dropzone';

function FileDropzone({ onDrop }) {
  return (
    <Dropzone onDrop={(acceptedFiles) => {
      if (onDrop) onDrop(acceptedFiles);
    }}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p className="p-2 text-xl font-bold m-2 border-2 rounded-md border-sky-500">Drag files here, or click to select files</p>
          </div>
        </section>
      )}
    </Dropzone>
  );
}

export default FileDropzone;
