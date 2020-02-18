import { Query } from 'react-apollo';
import React, { useState } from 'react';
import { VIEWER_QUERY } from '../apollo/queries';
import { useQuery } from '@apollo/react-hooks';
import { ALL_ITEMS_QUERY } from '../apollo/queries';


export const ViewerContext = React.createContext();

const ViewerProvider = ({ children }) => {

  const [viewer, setViewer] = useState('')
  const [viewerLoading, setViewerLoading] = useState(true)
  const [userId, setUserId] = useState('')
  const [getlogin, setLogin] = useState(false)

  // console.log('viewerprovider run')

  const getitems = (viewer) => {
    const { data, loading, error } = useQuery(ALL_ITEMS_QUERY,
      { variables: { id: JSON.stringify(viewer.user.id)} });
    if (loading) return <h1>LOADING...</h1>;
    if (error) {
      return (
        <div>
          <p>ERROR in item</p>
          <p>{JSON.stringify(error)}</p>
        </div>
      )
    }
    if (data){
  //  console.log('data now!!!!!!!!!!!!!!!' + data.items)
  }

      }

  const queryViewer = (viewerData) => {
    // console.log('viewerData from account form line 67: '+ JSON.stringify(viewerData))
    setViewerLoading(false)
    setViewer(viewerData)
    // console.log('queryViewer set!!! ')
    // getitems(viewerData)
  }



const queryItems = () => {
  // console.log('viewerId in viewrProvider: ' + viewer.user.id)
  // getAllItems ({ variables: { id: viewer.user.id } });
    
}

      return (
        <ViewerContext.Provider 
        value={
          {updateViewer: queryViewer,
            viewer: viewer,
            viewerLoading: viewerLoading,
            queryItems : queryItems,
            setUserId,
            getUserId : userId,
            setLogin,
            getlogin
          }
          }>
        {children}
      </ViewerContext.Provider>
    )
}


export default ViewerProvider;
