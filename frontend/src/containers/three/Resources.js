import React from 'react';
import * as THREE from 'three';

class Resources extends React.Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (  
      <resources>
        <meshLambertMaterial
          resourceId={'blackMat'}
          color={'#0b0019'}
          />
      </resources>
    )
  }
}

export default Resources
