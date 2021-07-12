import { API, Auth, graphqlOperation } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import { updatePost } from '../graphql/mutations'

export const EditPost = (props) => {

    const [show, setShow] = useState(false)
    const [postOwnerId, setPostOwnerId] = useState("")
    const [postOwnerUsername, setPostOwnerUsername] = useState("")
    const [postData, setPostData] = useState({
        postTitle: props.postTitle,
        postBody: props.postBody,
    })

    useEffect(() => {
        const fetchUser = async () => {
            const user = await Auth.currentUserInfo()
            setPostOwnerId(user.id)
            setPostOwnerUsername(user.username)
        }
        
        fetchUser()
    }, [])

    const handleModal = () => {
        setShow(!show)
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    }

    const handleUpdatePost = async (e) => {
        e.preventDefault()

        const input = {
            id: props.id,
            postOwnerId,
            postOwnerUsername,
            postTitle: postData.postTitle,
            postBody: postData.postBody
        }

        await API.graphql(graphqlOperation(updatePost, { input }))

        // force close the modal
        setShow(!show)
    }

    const handleTitle = (e) => {
        setPostData({...postData, postTitle: e.target.value})
    }
    
    const handleBody = (e) => {
        setPostData({...postData, postBody: e.target.value})
    }    

    return (
        <>
        <button onClick={handleModal}>Edit</button>
        {show && (
            <div className="modal">
                <button className="close" onClick={handleModal}>X</button>
                <form className="add-post" onSubmit={handleUpdatePost}>
                    <input style={{fontSize: '19px'}} type="text" placeholder="Title" name="postTitle" value={postData.postTitle} onChange={handleTitle} />
                    <input style={{height: '150px', fontSize: '19px'}} type="text" placeholder="Body" name="postBody" value={postData.postBody} onChange={handleBody} />
                    <button>Update Post</button>
                </form>
            </div>
        )}
        </>
    )
}
