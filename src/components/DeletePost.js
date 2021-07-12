import { API, graphqlOperation } from 'aws-amplify'
import React from 'react'
import { deletePost } from '../graphql/mutations'

export const DeletePost = ({id}) => {
    const handleDelete = async () => {
        const input = { id }
        await API.graphql(graphqlOperation(deletePost, {input}))
    }
    
    return (
        <button onClick={handleDelete}>Delete</button>
    )
}
