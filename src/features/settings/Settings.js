/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LgTextInput from '../../components/Forms/LgTextInput';
import StdButton from '../../components/Interactive/StdButton';
import { useFetchDisplayConfigQuery, useUpdateDisplayConfigMutation } from '../../services/api';
import { MEDIA_BASE_URI } from '../../support/consts';
import { addNotification } from '../notifications/notificationsSlice';
import { NOTIFY_INFO } from '../notifications/support';
import SelectBgImg from './SelectBgImg';

function SettingRow({ children, onClick }) {
  return (
    <div
      role="presentation"
      onClick={onClick}
      className="flex p-2 flex-row justify-start items-start w-11/12 odd:bg-slate-200 dark:odd:bg-slate-700 even:bg-green-200 dark:even:bg-green-800 border-2 border-opacity-0 border-blue-500 hover:border-opacity-100"
    >
      {children}
    </div>
  );
}

function Settings() {
  const { data, isLoading, refetch } = useFetchDisplayConfigQuery(null, {
    refetchOnMountOrArgChange: true
  });
  const [updateConf, { isSuccess }] = useUpdateDisplayConfigMutation();
  const [editingBgImg, setEditingBgImg] = useState(false);
  const [updatedValues, setUpdatedValues] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      dispatch(addNotification({
        message: 'Updated display settings',
        type: NOTIFY_INFO
      }));
    }
  }, [isSuccess]);
  if (isLoading) return <div>Loading...</div>;
  // console.log(data);
  return (
    <div className="w-full flex flex-col justify-center items-start p-2">
      {isSuccess && (
      <div>
        Updated display config.
      </div>
      )}
      <div className="flex flex-col justify-center items-start w-full">
        <SettingRow>
          <span
            className="mr-2 text-lg font-bold w-1/3"
          >
            Current database:
          </span>
          <span className="flex-1">{data.collection}</span>
        </SettingRow>
        <SettingRow>
          <span
            className="mr-2 text-lg font-bold w-1/3"
          >
            Display title:
          </span>
          <LgTextInput
            value={updatedValues['display-title'] || data['display-title'] || ''}
            onChange={(e) => {
              setUpdatedValues({
                ...updatedValues,
                'display-title': e.target.value,
              });
            }}
          />
        </SettingRow>
        <SettingRow
          onClick={() => {
            if (!editingBgImg) setEditingBgImg(true);
          }}
        >
          <div className="flex flex-col justify-start items-start w-full">
            <div className="flex flex-row justify-start items-start w-full">
              <span
                className="mr-2 text-lg font-bold w-1/3"
              >
                Display background image:
              </span>
              <span className="flex-1">{updatedValues['background-image'] || data['background-image']}</span>
              <img
                alt=""
                src={`${MEDIA_BASE_URI}${updatedValues['background-image'] || data['background-image']}`}
                style={{
                  height: 140,
                  width: 200,
                  objectFit: 'cover',
                }}
              />
            </div>
            {editingBgImg && (
              <SelectBgImg
                onClose={() => setEditingBgImg(false)}
                onUploaded={(res) => {
                  if (res.status === 200 && res.data.filepaths) {
                    const firstFile = Object.values(res.data.filepaths)[0];
                    if (firstFile) {
                      setUpdatedValues({
                        ...updatedValues,
                        'background-image': firstFile
                      });
                    }
                    setEditingBgImg(false);
                  }
                }}
              />
            )}
          </div>
        </SettingRow>
        <StdButton
          onClick={async () => {
            const res = await updateConf(updatedValues);
            console.log(res);
            if (res.status === 200) refetch();
          }}
        >
          Save Changes
        </StdButton>
      </div>
      {/* Set display category order */}
      {}
    </div>
  );
}

export default Settings;
