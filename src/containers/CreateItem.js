/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import { LgTextInput } from '../components/Forms';
import MediaUploadForm from '../components/Forms/MediaUploadForm';
import { setItemMedia, setItemValues } from '../store/actions';
import { MEDIA_BASE_URI } from '../support/consts';
import TextEditor from './TextEditor';

function CreateItem({
  values, setValues, media = [], setMedia
}) {
  return (
    <div>
      <LgTextInput
        label="Title"
        id="item-title-input"
        value={values.title}
        onChange={(e) => setValues({ ...values, title: e.target.value })}
      />
      {/* TODO how to handle state cycle with editor */}
      {/* TODO unwrap editor and use directly? */}
      <TextEditor content={values.body} />
      {/* TODO media - uploads and displaying for admin */}
      <MediaUploadForm handleFiles={(files) => console.log(files)} />
      {/* TODO layout of thumbnails */}
      <div>
        {media.length === 0 ? 'No media uploaded yet' : (
          <div>
            {media.map((m, key) => {
              if (!m.src) return null;
              return (
                <img
                  key={`item-media-thumb-${key}`}
                  src={`${MEDIA_BASE_URI}thumbs/${m.src}`}
                  alt={m.alt || ''}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  values: state.forms.createItem.values,
  media: state.forms.createItem.media,
});

const mapDispatchToProps = (dispatch) => ({
  setValues: (values) => dispatch(setItemValues(values)),
  setMedia: (media) => dispatch(setItemMedia(media)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateItem);
