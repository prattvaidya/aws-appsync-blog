import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { listPosts } from '../graphql/queries'

export const DisplayPosts = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        getPosts()
    }, [])

    const getPosts = async () => {
        const result = await API.graphql(graphqlOperation(listPosts))
        setPosts(result.data.listPosts.items)
    }
    
    return <div>
        {posts.map(post => <div key={post.id} className="posts" style={rowStyle}>
            <h1>{post.postTitle}</h1>
            <span style={{fontStyle: 'italic', color: '#0ca5e297'}}>Written by {post.postOwnerUsername} on <time style={{fontStyle: 'italic'}}>{new Date(post.createdAt).toDateString()}</time></span>
            <p>{post.postBody}</p>
        </div>)}
    </div>
}

const rowStyle = {
    background: "#f4f4f4",
    padding: '10px',
    border: '1px #ccc dotted',
    margin: '14px'
}