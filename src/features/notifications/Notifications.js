import { useSelector } from 'react-redux';

function Notifications() {
  const { current } = useSelector((s) => s.notifications);
  // console.log(current);
  return (
    <div>
      {current.length > 0 ? (
        <div>
          There are notifications!
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
