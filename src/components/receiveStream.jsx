import { Grid } from "@mui/material";
import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";

export function ReceiveStream() {
  const [peer, setPeer] = useState(new Peer());
  const videoRefReceive = useRef(null);
  const stream = useRef(null);

  useEffect(() => {
    peer.on("open", function (id) {
      console.log("My peer ID is: " + id);
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(function (mediaStream) {
          var constraints = {
            'mandatory': {
                'OfferToReceiveAudio': true,
                'OfferToReceiveVideo': true
            },
            offerToReceiveAudio: 1,
            offerToReceiveVideo: 1,
        }
          const call = peer
            .call("bced75fa-80fa-4a4a-8fc0-bc52724a1b6f", mediaStream, constraints)
            .on("stream", function (remoteStream) {
              console.log("Receiving stream", remoteStream);
              videoRefReceive.current.srcObject = remoteStream;
              videoRefReceive.current.onloadedmetadata = function (e) {
                videoRefReceive.current.play();
                console.log("Playing remote stream", videoRefReceive.current.srcObject.getVideoTracks());
              };
            });
        });
    });
  }, []);
  return (
    <>
      <Grid sx={{ width: "100vw", height: "100vh" }}>
        <video
          ref={videoRefReceive}
          height={"100%"}
          width={"100%"}
          
          id="remote-video"
        ></video>
      </Grid>
    </>
  );
}
