import React, { useState } from 'react'
import HomeIcon from "@material-ui/icons/Home"
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined"
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined"
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import Search from "@material-ui/icons/Search"
import { Avatar, Button, Input } from '@material-ui/core';
import "../components/css/QuoraHeader.css";
import Modal from "react-responsive-modal";
import CloseIcon from '@material-ui/icons/Close';
import 'react-responsive-modal/styles.css';
import { ExpandMore } from '@material-ui/icons';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';
import { logout, selectUser } from '../feature/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

function QuoraHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputUrl, setInputUrl] = useState("");
    const [question, setQuestion] = useState("");
    const Close = <CloseIcon />
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const handleSubmit = async () => {
        if (question !== "") {

            const config = {
                headers: {
                    "content-Type": "application/json"
                }
            }
            const body = {
                questionName: question,
                questionUrl: inputUrl,
                user: user,
            }
            await axios.post("/api/questions", body, config)
                .then((res) => {
                    console.log(res.data);
                    alert(res.data.message);
                    window.location.hreg = "/";
                }).catch((e) => {
                    console.log(e);
                    alert("error in adding question")
                })
        }
    }

    const handleLogout = () => {
        if (window.confirm("Are You Sure to Logout ?")) {
            signOut(auth).then(() => {
                dispatch(logout());
            })
        }

    }

    return (
        <div className="qHeader">
            <div className="qHeader-content">
                <div className="qHeader__logo">
                    <img
                        src="https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif"
                        alt="logo"
                    />
                </div>
                <div className="qHeader__icons">
                    <div className="qHeader__icon">
                        <HomeIcon />
                    </div>
                    <div className="qHeader__icon">
                        <FeaturedPlayListOutlinedIcon />
                    </div>
                    <div className="qHeader__icon">
                        <Link to="https://nitkkr.ac.in/?page_id=624">
                            <AssignmentTurnedInOutlinedIcon />
                        </Link>
                    </div>
                    <div className="qHeader__icon">
                        <PeopleAltOutlinedIcon />
                    </div>
                    <div className="qHeader__icon">
                        <NotificationsOutlinedIcon />
                    </div>
                </div>
                <div className="qHeader__input">
                    <Search />
                    <input type="text" placeholder="Search questions" />
                </div>
                <div className="qHeader__Rem">
                    <span onClick={handleLogout}>
                        <Avatar src={user?.photo} />
                    </span>
                    <Button onClick={() => setIsModalOpen(true)}>Add Question </Button>
                    <Modal
                        open={isModalOpen}
                        closeIcon={Close}
                        onClose={() => setIsModalOpen(false)}
                        closeOnEsc
                        center
                        closeOnOverlayClick={false}
                        styles={{
                            overlay: {
                                height: "auto",
                            },
                        }}
                    >
                        <div className='modal__title'>
                            <h5>Add Question</h5>
                            <h5>Share Link</h5>
                        </div>
                        <div className='modal__info'>
                            <Avatar src={user?.photo} className='avatar' />
                            <div className='modal__scope'>
                                <PeopleAltOutlinedIcon />
                                <p>Public</p>
                                <ExpandMore />
                            </div>
                        </div>
                        <div className='modal__Field'>
                            <Input
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                type='text' placeholder="Start Your Question with 'What', 'How', 'Why', etc" />
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                            >
                                <input
                                    style={{
                                        margin: "5px 0px",
                                        border: "1px solid lightgray",
                                        padding: "10px",
                                        outline: "2px solid #000",
                                    }}
                                    type='text'
                                    value={inputUrl}
                                    onChange={(e) => setInputUrl(e.target.value)}
                                    placeholder='Optional : include a link that gives context' />
                                {
                                    inputUrl !== "" && <img
                                        style={{
                                            height: "40vh",
                                            objectFit: "contain"
                                        }}
                                        src={inputUrl} alt="" />
                                }
                            </div>
                        </div>
                        <div className='modal__buttons'>
                            <button className='cancel' onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                type='submit' className='add' >
                                Add Question
                            </button>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default QuoraHeader;
