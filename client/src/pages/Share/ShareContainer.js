import React, { Component } from 'react';
import Share from './Share';
import TopBar from '../../components/TopBar/TopBar'


// import FullScreenLoader from '../../components/FullScreenLoader';
// import { Query } from 'react-apollo';
// import { } from '../../apollo/queries';
// Hint: query tags
class ShareContainer extends Component {
  render() {
    return (
      <div>
        <TopBar/>
        <Share />
      </div>
    )
  }
}

// export default ShareContainer;
export default ShareContainer;

