import React from 'react'
import PropagateLoader from 'react-spinners/PropagateLoader'

import './Loading.scss'

const Loading: React.FC = () => (
  <div className='loading-wrapper'>
    <PropagateLoader size={10} color={'#A2AFAD'} loading />
  </div>
)

export default Loading
