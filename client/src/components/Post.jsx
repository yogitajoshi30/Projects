import React, { useRef, useState } from 'react'
import "./css/Post.css";
import { Avatar } from '@material-ui/core';
import { ArrowUpwardOutlined, ChatBubbleOutlined, MoreHorizOutlined, RepeatOneOutlined, ShareOutlined, ThumbUp, ThumbUpAltOutlined } from '@material-ui/icons';
import { Modal } from "react-responsive-modal";
import 'react-responsive-modal/styles.css';
import CloseIcon from '@material-ui/icons/Close';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactTimeAgo from 'react-time-ago';
import axios from 'axios';
import ReactHtmlParser from "html-react-parser";
import { selectUser } from '../feature/userSlice';
import { useSelector } from 'react-redux';



function LastSeen({ date }) {
    return (
        <div>
            <ReactTimeAgo date={date} locale="en-US" timeStyle="number" />
        </div>
    )
}

function Post({ post }) {
    // console.log(post)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const postRef = useRef(post)
    const [answer, setAnswer] = useState("");
    const Close = <CloseIcon />
    const [text, setText] = useState(post.like.length);

    const user = useSelector(selectUser);

    const handleQuill = (value) => {
        setAnswer(value);
    }

    const handleClickLike = () => {
        let p = postRef.current
        console.log(p);
        // console.log(user)
        if (!p.like.some((ele) => {
            return ele == user.uid
        })) {

            fetch("http://localhost:5000/api/questions/like", {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    pos: p,
                    user: user
                })
            }).then(res => res.json()).then((result) => {
                postRef.current = result
                console.log(result)
                // console.log("hii")
                setText(result.like.length)
            }).catch((e) => {
                console.log(e);
            })

            // console.log(result.like.length)

        }
        else if (p.like.length && p.like.indexOf(user.uid) !== -1) {
            console.log("hii baby")
            fetch("http://localhost:5000/api/questions/unlike", {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    pos: p,
                    user: user
                })
            }).then(res => res.json()).then((result) => {
                postRef.current = result
                // console.log(result)
                setText(result.like.length)
            }).catch((e) => {
                console.log(e);
            })

            // console.log(result.like.length)
        }
    }

    const handleSubmit = async () => {
        if (post?._id && answer !== "") {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const body = {
                answer: answer,
                questionId: post?._id,
                user: user,
            }
            await axios.post("/api/answers", body, config).then((res) => {
                console.log(res.data);
                alert("Answer added Successfully");
                setIsModalOpen(false);
                window.location.href = "/"
            }).catch((e) => {
                console.log(e);
            })
        }
    }



    return (
        <div className='post'>
            <div className='post__info'>
                <Avatar src={post?.user?.photo} />
                <h4>{post?.user?.userName}</h4>
                <small><LastSeen date={post?.createdAt} /></small>
            </div>
            <div className='post__body'>
                <div className='post__question'>
                    <p>{post?.questionName}</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className='post__btnAnswer'>Answers</button>
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
                        <div className='modal__question'>
                            <h1>{post?.questionName}</h1>
                            <p>asked by {" "}<span className='name'>{post?.user?.userName}</span> on <span className='name'>
                                {new Date(post?.createdAt).toLocaleString()}</span></p>
                        </div>
                        <div className='modal__answer'>
                            <ReactQuill
                                value={answer}
                                onChange={handleQuill}
                                placeholder='Enter Your Answer'
                            />
                        </div>
                        <div className='modal__button'>
                            <button className='cancel' onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </button>
                            <button onClick={handleSubmit} type='submit' className='add' >
                                Add Answer
                            </button>
                        </div>
                    </Modal>
                </div>
                {
                    post.questionUrl !== "" && <img src={post.questionUrl} alt="logo" />
                }
            </div>
            <div className="post__footer">
                <div className='post__footerAction'>
                    {postRef.current.like.some(ele => {
                        return ele == user.uid
                    }) ? <ThumbUp onClick={() => handleClickLike(post)} /> : <ThumbUpAltOutlined onClick={() => handleClickLike(post)} />}
                    {text}
                    {/* <ArrowDownwardOutlined onClick={() => handleClickUnLike(post)} /> */}

                </div>
                <RepeatOneOutlined />
                <ChatBubbleOutlined />
                <div className='post__footerLeft'>
                    <ShareOutlined />
                    <MoreHorizOutlined />
                </div>
            </div>
            <p
                style={{
                    color: "rgba(0,0,0,0.5)",
                    fontSize: "12px",
                    fontWeight: "bold",
                    margin: "10px 0px",
                }}
            >{post?.allAnswers.length} Answer(s)</p>
            <div
                style={{
                    margin: "5px 0px 0px 0px",
                    padding: "5px 0px 0px 20px",
                    borderTop: "1px solid lightgray"
                }}
                className='post__answer'>

                {
                    post?.allAnswers?.map((_a) => (
                        <>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    padding: "10px 5px",
                                    borderTop: "1px solid lighgray"
                                }}
                                className='post-answer-container'>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "10px",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                        color: "#888",
                                    }}
                                    className='post-answered'>
                                    <Avatar src={_a?.user?.photo} />
                                    <div
                                        style={{ margin: "0px 10px" }}
                                        className='post-info'>
                                        <p>
                                            {_a?.post?.user?.userName}
                                        </p>
                                        <span><LastSeen date={_a?.createdAt} /></span>
                                    </div>
                                </div>
                                <div className='post-answer'>
                                    {ReactHtmlParser(_a?.answer)}
                                </div>
                            </div>
                        </>
                    ))}
            </div>
        </div>
    );
}

export default Post;
