import classNames from "classnames/bind";
import style from "./callvideostyle.module.scss"
import { ImgStory } from "~/Components/Layout/DefaultLayout/imgStory";
import { Imgs } from "~/Components/Image";
import { icons } from "~/Assets/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { AvatarImg } from "~/Components/AvatarImg";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import io from 'socket.io-client';
import { Peer } from "peerjs";
import { useParams } from "react-router-dom";

const cx = classNames.bind(style);

function CallVideo() {
    const [onCam ,setonCam] = useState(true);
    const [onMic , setonMic] = useState(true);
    const [localStream, setLocalStream] = useState(null);
    const [signalData , setsignalData] = useState(null);
    const [fromUser , setfromUser] = useState("");
    const [recieverCall , setreciverCall] = useState(false);
    const [me ,setme] = useState(null);
    const [userName ,setuserName] = useState("");
    const [callAccepted,setCallAccepted] = useState(false);
    const refVideo = useRef();
    const connectionRef = useRef();
    const [cancelCall , setCancelCall] = useState(null);
    const currentuser = useSelector((state)=>state.auth.login.currentUser);

    const idtoCall = useParams().id;

    console.log(idtoCall)

    //Logic call video
    useEffect(() => {
        const initializeVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: onCam , audio : onMic })
                setLocalStream(stream);
            } catch (error) {
                console.error('Error accessing video stream:', error);
            }

        };
        initializeVideo();
    }, [onCam, onMic]);

    useEffect(() => {
        const playVideo = async () => {
            try {
                if (localStream && refVideo.current) {
                    refVideo.current.srcObject = localStream;
                }
            } catch (err) {
                // Handle the error, you can log it for debugging purposes
                console.error('Error playing video:', err);
            }
        };
    
        playVideo();
    }, [localStream]);

    //Socket 
    const socket = useRef();

    useEffect(()=>{
        socket.current = io('http://localhost:8900');
    },[]);

    useEffect(()=>{

        setme(currentuser._id);
        socket.current.on("callUser" ,
            (data)=>{
                setsignalData(data.signalData)
                setfromUser(data.from)
                setuserName(data.name)
                setreciverCall(true)
            }
        )
    },[])

    const CallVideo = async (id)=>{
        const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: localStream
        })
        peer.on("signal", (data) => {
			socket.current.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: currentuser.username
			})
		})
		peer.on("stream", (stream) => {
			refVideo.current.srcObject = stream;
		})
		socket.current.on("callAccepts", (signal) => {
			setCallAccepted(true)
			peer.signal(signal)
		})

		connectionRef.current = peer
    }

    const callAnswers =  async ()=>{
        setCallAccepted(true);
        const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: localStream
        })

        peer.on("signal", (data) => {
			socket.current.emit("callAnswers", { signal: data, to: fromUser })
		})
		peer.on("stream", (stream) => {
			refVideo.current.srcObject = stream
		})

		peer.signal(signalData)

		connectionRef.current = peer

    }

    const CancelCall = () => {
        setCancelCall(false);
        connectionRef.current.destroy();
    }

    console.log(recieverCall)
    console.log(callAccepted)
    return ( 
        <div className={cx('main')}>
                <div className={cx('show')}>
                        <div className={cx('show-videocall')}>
                            <video className={cx('show-videocall__wrap')} ref={refVideo} id="video" autoPlay></video>
                        </div>
                        <div className={cx('option')}>
                            <div className={cx('cam')} onClick={()=>{
                                setonCam(!onCam);
                            }}>
                                <Imgs src={ onCam === false ? icons.iconOffVideo : icons.iconOnVideo}></Imgs>
                            </div>
                            <div className={cx('mic')}
                                onClick={()=>{
                                    setonMic(!onMic);
                                }}
                            >
                                <Imgs src={onMic === false ? icons.iconOffMic : icons.iconOnMutex}></Imgs>
                            </div>
                            <div className={cx('sound')}>
                                <Imgs src={icons.iconOnSound}></Imgs>
                            </div>
                            <div className={cx('settings')}>
                                <FontAwesomeIcon className={cx('settings__icon')} icon = {faGear}></FontAwesomeIcon>
                            </div>
                        </div>
                </div>
                <div className={cx('user-call')}>
                        <div className={cx('user-call__image')}>
                            <AvatarImg story={'no'} size={'big'}></AvatarImg>
                        </div>
                        <div className={cx('user-call__name')}>
                            {currentuser.username}
                        </div>
                        <div className={cx('user-call__info')}>
                            Ready to call?
                        </div>
                        
                        <button className={cx('user-call__btn')} onClick={()=>CallVideo(idtoCall)}>
                        {
                            recieverCall === true && callAccepted === false ? "Calling...." : "Call Video"
                        }
                        </button>
                </div>
            
        </div>
    );
}

export default CallVideo;