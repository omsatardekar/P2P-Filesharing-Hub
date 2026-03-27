import { socket } from "../socket";

let pc;
let channel;
let selectedUser;
let receivedBuffers = [];
let receivedSize = 0;
let fileMeta = {};

const config = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};

export const startSender = async (user, file) => {
  selectedUser = user;
  pc = new RTCPeerConnection(config);

  channel = pc.createDataChannel("file");
  channel.onopen = () => sendFile(file);

  pc.onicecandidate = e => {
    if (e.candidate) {
      socket.emit("signal", {
        to: selectedUser,
        from: localStorage.getItem("username"),
        data: { candidate: e.candidate }
      });
    }
  };

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  socket.emit("signal", {
    to: selectedUser,
    from: localStorage.getItem("username"),
    data: { offer }
  });
};

export const handleSignal = async ({ from, data }) => {
  if (data.meta) {
    if (!window.confirm(`Receive ${data.meta.name}?`)) return;
    fileMeta = data.meta;
    pc = new RTCPeerConnection(config);

    pc.ondatachannel = e => {
      channel = e.channel;
      channel.onmessage = receiveFile;
    };
  }

  if (data.offer) {
    await pc.setRemoteDescription(data.offer);
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    socket.emit("signal", {
      to: from,
      from: localStorage.getItem("username"),
      data: { answer }
    });
  }

  if (data.answer) await pc.setRemoteDescription(data.answer);
  if (data.candidate) await pc.addIceCandidate(data.candidate);
};

const sendFile = (file) => {
  socket.emit("signal", {
    to: selectedUser,
    from: localStorage.getItem("username"),
    data: { meta: { name: file.name, size: file.size } }
  });

  const reader = new FileReader();
  let offset = 0;

  reader.onload = e => {
    channel.send(e.target.result);
    offset += e.target.result.byteLength;
    if (offset < file.size) readSlice(offset);
  };

  const readSlice = o => {
    reader.readAsArrayBuffer(file.slice(o, o + 64000));
  };

  readSlice(0);
};

const receiveFile = e => {
  receivedBuffers.push(e.data);
  receivedSize += e.data.byteLength;

  if (receivedSize >= fileMeta.size) {
    const blob = new Blob(receivedBuffers);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileMeta.name;
    a.click();
  }
};
