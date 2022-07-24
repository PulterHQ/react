# @pulter/react

> React adapter for pulter.co

[![NPM](https://img.shields.io/npm/v/@pulter/react.svg)](https://www.npmjs.com/package/@pulter/react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Shell

```bash
npm install @pulter/react
```

## Import

```js
import { Pulter } from "@pulter/react";
```

## Usage

```jsx
<Pulter
  templateId="Data Template ID"
  user={{
    id: "default123",
  }}
  onSubmit={(result, data) => {
    if (result) {
      console.log("success");
      console.log(data + " data uploaded");
      //custom code
    } else {
      console.log("fail");
      //custom code
    }
  }}
  fields={[
    {
      label: "Name",
      key: "name",
      fieldType: {
        // There are 3 types - "input" / "checkbox" / "select".
        type: "input",
      },
      validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "Name is required",
          // There can be "info" / "warning" / "error" levels. Optional. Default "error".
          level: "error",
        },
      ],
    },
    {
      label: "Email",
      key: "email",
      fieldType: {
        // There are 3 types - "input" / "checkbox" / "select".
        type: "input",
      },
      validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "Email is required",
          // There can be "info" / "warning" / "error" levels. Optional. Default "error".
          level: "error",
        },
      ],
    },
    {
      label: "Phone",
      key: "phone",
      fieldType: {
        // There are 3 types - "input" / "checkbox" / "select".
        type: "input",
      },
      validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "Name is required",
          // There can be "info" / "warning" / "error" levels. Optional. Default "error".
          level: "error",
        },
      ],
    },
  ]}
  rowHook={(data, addError) => {
    // Validation
    if (data.name !== "John") {
      addError("name", { message: "No Johns allowed", level: "info" });
    }
    // Transformation
    return { ...data, name: "Not John" };
    // Sorry John
  }}
/>
```

## Readme

For usage see the guide here - https://docs.pulter.co/getting-started/add-data-template

## License

MIT © [pulter-co](https://github.com/PulterHQ/react-adapter)
