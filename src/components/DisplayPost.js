import React, { useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { listPosts } from '../graphql/queries'

export const DisplayPosts = () => {
    useEffect(() => {
        getPosts()
    }, [])

    const getPosts = async () => {
        const result = await API.graphql(graphqlOperation(listPosts))
        console.log("all posts", JSON.stringify(result.data.listPosts.items))
    }
    
    return <div>Hello World</div>
}
