import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { onCreatePost, onDeletePost, onUpdatePost } from '../graphql/subscriptions'
import { listPosts } from '../graphql/queries'
import { DeletePost } from './DeletePost'
import { EditPost } from './EditPost'

export const DisplayPosts = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        getPosts()
        
    }, [])

    useEffect(() => {
        const createPostListener = API.graphql(graphqlOperation(onCreatePost)).subscribe({
            next: postData => {
                console.log("createpostlistener called");
                const newPost = postData.value.data.onCreatePost
                setPosts([...posts.filter(post => post.id !== newPost.id), newPost])
            }
        })
        const deletePostListener = API.graphql(graphqlOperation(onDeletePost)).subscribe({
            next: postData => {
                const deletedPost = postData.value.data.onDeletePost
                console.log("deleted post",deletedPost);
                console.log("posts",posts);
                setPosts(posts.filter(post => post.id !== deletedPost.id))
            }
        })
        const updatePostListener = API.graphql(graphqlOperation(onUpdatePost)).subscribe({
            next: postData => {
                console.log("postData", postData);
                const updatedPost = postData.value.data.onUpdatePost
                if (updatedPost) {

                    console.log("updating post", updatedPost);
                    const index = posts.findIndex(post => post.id === updatedPost.id)
                    const updatedPosts = [...posts.slice(0, index), updatedPost, ...posts.slice(index, posts.length - 1)]
                    setPosts(updatedPosts)
                }
            }
        })
        return () => {
            createPostListener.unsubscribe()
            deletePostListener.unsubscribe()
            updatePostListener.unsubscribe()
        } 
    }, [posts])

    const getPosts = async () => {
        console.log("getting posts");
        const result = await API.graphql(graphqlOperation(listPosts))
        setPosts(result.data.listPosts.items)
    }
    
    
    return <div>
        {posts.map(post => <div key={post.id} className="posts" style={rowStyle}>
            <h1>{post.postTitle}</h1>
            <span style={{fontStyle: 'italic', color: '#0ca5e297'}}>Written by {post.postOwnerUsername} on <time style={{fontStyle: 'italic'}}>{new Date(post.createdAt).toDateString()}</time></span>
            <p>{post.postBody}</p>
            <span>
                <DeletePost id={post.id} />
                <EditPost {...post} />
            </span>
        </div>)}
    </div>
}

const rowStyle = {
    background: "#f4f4f4",
    padding: '10px',
    border: '1px #ccc dotted',
    margin: '14px'
}