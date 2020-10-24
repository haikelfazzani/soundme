import { useEffect, useState } from "react";
import { useStoreActions } from "easy-peasy";

export default function useRealTime (setChatMessages) {

  const { setGWSocket, setCurrentTrackPlay } = useStoreActions(actions => actions);

  const [socketInfos, setSocketInfos] = useState(null);
  const [wsocket, setWSocket] = useState(null);
  const [isWSocket, setIsWSocket] = useState(false);

  // For realtime
  useEffect(() => {
    localStorage.removeItem('sc-chat-messages');
    let isMounted = true;
    let currRoom = window.location.search.slice(6);

    if (isMounted && currRoom && currRoom.length > 0) {
      // 'https://websocket-as-service.herokuapp.com'  http://localhost:7000

      const socket = window.io('http://localhost:7000', { forceNew: true });
      setWSocket({ ...wsocket, currRoom, socket });
      setGWSocket({ socket });
      setIsWSocket(true);

      socket.emit('joinRoom', { room: '' + currRoom });

      socket.on('join', ({ user, date }) => {
        setSocketInfos(user + ' Join room');

        setTimeout(() => {
          setSocketInfos(null);
        }, 3000);
      });

      socket.on('player-controls', (currentTrackPlay) => {
        setCurrentTrackPlay(currentTrackPlay);
      });

      socket.on('message', ({ username, msg }) => {

        let msgs = localStorage.getItem('sc-chat-messages');

        localStorage.setItem('sc-chat-messages',
          !msgs
            ? JSON.stringify([{ username, msg }])
            : JSON.stringify([...JSON.parse(msgs), { username, msg }])
        );

        let ms = localStorage.getItem('sc-chat-messages');
        setChatMessages(ms ? JSON.parse(ms) : []);

        let msgsEl = document.getElementById('msgs');
        msgsEl.scrollTo(0, msgsEl.scrollHeight);
      });

      socket.on('disc', ({ user, date }) => {
        setSocketInfos(user + ' left room');
      });

      socket.on('connect_error', () => {
        setWSocket(null);
        setIsWSocket(false);
        setSocketInfos('Unable to connect to server');
        socket.disconnect();
      });
    }

    return () => { isMounted = false; }
  }, []);

  return { socketInfos, wsocket, isWSocket };
}