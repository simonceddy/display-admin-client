import { useEffect } from 'react';
import { CgClose as CloseIcon } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { shiftNotification } from './notificationsSlice';
import { NOTIFY_ERROR, NOTIFY_INFO } from './support';

function boxBg(type) {
  switch (type) {
    case NOTIFY_ERROR:
      return 'bg-red-200';
    case NOTIFY_INFO:
    default:
      return 'bg-green-200';
  }
}

function Notifications() {
  const { current } = useSelector((s) => s.notifications);
  const dispatch = useDispatch();
  useEffect(() => {
    if (current[0]) {
      setTimeout(() => dispatch(shiftNotification()), 12000);
    }
  }, [current]);
  // console.log(current);
  return (
    <div
      className="p-2 block absolute top-0 left-1/2"
      role="presentation"
      onClick={() => {
        if (current[0]) {
          dispatch(shiftNotification());
        }
      }}
    >
      {current.length > 0 && current[0].message && (
        <div
          className={`p-2 text-lg font-bold flex flex-row justify-center items-center ${boxBg(current[0].type || NOTIFY_INFO)}`}
        >
          {current[0].message}
          <CloseIcon
            className="mx-2 border border-slate-500 hover:border-blue-400 hover:text-blue-400 hover:cursor-pointer"
            size={25}
            onClick={() => {
              if (current[0]) {
                dispatch(shiftNotification());
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Notifications;
