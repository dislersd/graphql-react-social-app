import React from 'react'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, Icon} from 'semantic-ui-react'




function DeleteButton(props) {

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(){
            
        }
        variables: {
            postId
        }
    })
    return (
        <div>
            
        </div>
    )
}

const DELETE_POST_MUTATION = gql `
    mutation deletePost($postId: ID!){
        deletePost($deletePost: postId)
    }
`

export default DeleteButton;