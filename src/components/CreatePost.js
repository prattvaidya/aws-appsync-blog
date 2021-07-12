import { API, Auth, graphqlOperation } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import { createPost } from '../graphql/mutations'

export const CreatePost = () => {

    const [postOwnerId, setPostOwnerId] = useState('')
    const [postOwnerUsername, setPostOwnerUsername] = useState('')
    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')

    useEffect(() => {
        const fetchUser = async () => {
            const user = await Auth.currentUserInfo()
            setPostOwnerId(user.id)
            setPostOwnerUsername(user.username)
        }
        
        fetchUser()
    }, [])

    const handleAddPost = async (event) => {
        event.preventDefault()
        const input = {
            postOwnerId,
            postOwnerUsername,
            postTitle,
            postBody,
            createdAt: new Date().toISOString()
        }
        await API.graphql(graphqlOperation(createPost, {input}))

        resetState()
    }

    const resetState = () => {
        setPostTitle('')
        setPostBody('')
    }
    
    return (
        <form className="add-post" onSubmit={handleAddPost}>
            <input style={{font: '19px'}} type="text" placeholder="Title" name="postTitle" required onChange={e => setPostTitle(e.target.value)} value={postTitle} />
            <textarea type="text" name="postBody" rows="3" cols="40" required placeholder="New blog post" onChange={e => setPostBody(e.target.value)} value={postBody}></textarea>
            <input type="submit" className="btn" style={{fontSize: '19px'}} />
        </form>
    )
}
