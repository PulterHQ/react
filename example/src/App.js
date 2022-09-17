import React from 'react'

import { Pulter } from '@pulter/react'

const App = () => {
  const [data, setData] = React.useState([]);
  const fields = [
    {
      label: "Name",
      key: "name",
      alternateMatches: [
        "first name",
        "first"
      ],
      fieldType: {
        type: "input",
      },
      example: "Stephanie",
      validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "Name is required",
          level: "error",
        },
      ],
    },
    {
      label: "New Name",
      key: "newname",
      fieldType: {
        type: "input",
      },
      example: "Stephanie",
    },
  ];

  const user = {
    id: 'ojewdihucjnweud',
    name: 'John Doe',
    email: 'john.doe@example.com',
  }
  // const rowHook = (data, addError) => {
  //   // Validation
  //   if (data.name !== "") {
  //     data.newname = data.name
  //       // addError("name", { message: "No Johns allowed", level: "info" })
  //   }
  //   // Transformation
  //   return { ...data }
  //   // Sorry John
  // };
  // const matchColumnsStepHook = (async function (data, rawData, columns) {
  //   const promise = data.map((value) => {
  //     if (value.name !== "") {
  //       value.newname = value.name
  //     }
  //     return value
  //   })
  //   Promise.all(promise)
  //   console.log(data);
  //   return data
  // });
  return <div>
    <h1>NOWING</h1>
    <Pulter
    templateId={'cl5ql4vw9049109kux3eqe1c3'}
    fields={fields}
    user={user}
    isOpen={true}
    onClose={() => {
      console.log('closed');
    }}
    onSubmit={(success, data) => {
      setData(data);
      console.log(success, data);
    }}
    rowHook={(data, addError) => {
      // Validation
      if (data.name !== "") {
        data.newname = data.name
          // addError("name", { message: "No Johns allowed", level: "info" })
      }
      // Transformation
      return data;
      // Sorry John
    }}
  />
  {data && (
                <textarea readOnly value={JSON.stringify(data)}></textarea>
            )}
  </div>
}

export default App
