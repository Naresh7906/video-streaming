import { Grid } from "@mui/material";
import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";

export function PublishStream() {
  const [peer, setPeer] = useState(
    new Peer("bced75fa-80fa-4a4a-8fc0-bc52724a1b6f")
  );
  const videoRef = useRef(null);
  const stream = useRef(null);
  useEffect(() => {
    peer.on("open", function (id) {
      console.log("My peer ID is: " + id);
      peer.on("call", function (call) {
        if (stream.current) {
          console.log("Answering call", call.peer);
          call.on("error", function (error) {
            console.log("Error", error);
          });
          navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then(function (mediaStream) {
            console.log("Answering call with stream", mediaStream);
            call.answer(mediaStream, { videoBandwidth: 2000, audioBandwidth: 2000 });
          });
        } else {
          console.log("No stream declining call");
          call.close();
        }
        call.on('error', function(error) {
          console.log('Error', error);
        });
      });
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(function (mediaStream) {
        stream.current = mediaStream;
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = function (e) {
           videoRef.current.play();
        };
      });
  }, []);
  return (
    <>
      <Grid sx={{ width: "100vw", height: "100vh" }}>
        <video
          ref={videoRef}
          height={"100%"}
          width={"100%"}
          muted
          id="local-video"
        ></video>
      </Grid>
    </>
  );
}
