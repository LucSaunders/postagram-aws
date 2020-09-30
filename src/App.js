import React, { useState, useEffect } from 'react';

// import API from Amplify library
import { API, Auth} from 'aws-amplify'

// import query definition
import { listPosts } from './graphql/queries'

// import the withAuthenticator component
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

function App(){
// export default function App() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetchPosts();
    checkUser(); // new function call
  });
  // }, []);

  // Use the Storage API to save & get items
  // Saving an item:
  const file = e.target.files[0];
  await Storage.put(file.name, file);

  // Getting an item:
  const image = await Storage.get('my-image-key.jpg')

  async function fetchPosts() {
    try {
      const postData = await API.graphql({ query: listPosts });
      setPosts(postData.data.listPosts.items)
    } catch (err) {
      console.log({ err })
    }
  }

  async function checkUser() {
    const user = await Auth.currentAuthenticatedUser();
    console.log('user: ', user);
    console.log('user attributes: ', user.attributes);
  }
  return (
    <div>
      <h1>Hello World</h1>
      <AmplifySignOut/>
      {
        posts.map(post => (
          <div key={post.id}>
            <h3>{post.name}</h3>
            <p>{post.location}</p>
          </div>
        ))
      }
    </div>
  )
}

export default withAuthenticator(App)
