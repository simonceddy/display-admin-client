import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { shiftNotification } from './notificationsSlice';

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
      className="p-2 block"
      role="presentation"
      onClick={() => {
        if (current[0]) {
          dispatch(shiftNotification());
        }
      }}
    >
      {current.length > 0 ? (
        <div>
          {current[0]}
        </div>
      ) : (
        <div>
          No notifications
        </div>
      )}
    </div>
  );
}

export default Notifications;
