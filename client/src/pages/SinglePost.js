import React, {useContext} from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import moment from 'moment'
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";
import { Icon } from "semantic-ui-react";


function SinglePost(props) {
  const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);
  const {
    data: { getPost }
  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });
  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading post...</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount
    } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
            <Grid.Collumn width={2}>
            <Image
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            size="small"
            float='right'
          />
            </Grid.Collumn>
            <Grid.Collumn width={10}>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>{username}</Card.Header>
                        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                        <Card.Description>{body}</Card.Description>
                    </Card.Content>
                    <hr/>
                    <Card.Content extra>
                        <LikeButton user={user} post={{id, likeCount, lieks}}/>
                        <Button 
                        as="div"
                        labelPosition="right"
                        onClick={()=>{console.log('Comment on post')}}>
                            <Button basic color='blue'>
                                <Icon name="comments"/>
                                <Label basic color="blue"
                                pointing="left">
                                    {commentCount}
                                </Label>
                            </Button>
                        </Button>

                    </Card.Content>
                </Card>
            </Grid.Collumn>
        </Grid.Row>
      </Grid>
    );
  }

  return <div />;
}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
