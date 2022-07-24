import React from 'react'

import { Pulter } from '@pulter/react'

const App = () => {
  return <Pulter templateId="Data Template ID" user={{
    id: "default123"
  }}
  onSubmit={(result, data) => {
    if(result){
      console.log("success");
      console.log(data + " data uploaded");
      //custom code
    }else{
      console.log("fail");
      //custom code
    }
  }}
  />
}

export default App
