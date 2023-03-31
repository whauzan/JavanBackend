export const headArray = [
  {
    label: "Id",
    data: "id",
  },
  {
    label: "Name",
    data: "sparepartName",
  },
  {
    label: "Type",
    data: "type",
  },
  {
    label: "Location",
    data: "locationName",
  },
  {
    label: "Model Number",
    data: "modelNumber",
  },
  {
    label: "Manufacturer",
    data: "manufacturer",
  },
  {
    label: "Quantity",
    data: "quantity",
  },
  {
    label: "Current Status",
    data: "currentStatus",
  },
];

export const sparepartsFormModel = [
  {
    label: "Id",
    data: "id",
    type: "number",
    value: 0,
  },
  {
    label: "Name",
    data: "sparepartName",
    type: "text",
    value: "",
  },
  {
    label: "Quantity",
    data: "quantity",
    type: "number",
    value: 0,
  },
  {
    label: "Type",
    data: "type",
    type: "text",
    value: "",
  },
  {
    label: "Location",
    data: "locationId",
    type: "select",
    options: [
      {
        label: "Pick one",
        value: "",
      },
    ],
  },
  {
    label: "Model Number",
    data: "modelNumber",
    type: "text",
    value: "",
  },
  {
    label: "Manufacturer",
    data: "manufacturer",
    type: "text",
    value: "",
  },
  {
    label: "Current Status",
    data: "currentStatus",
    type: "select",
    options: [
      {
        label: "Sufficient",
        value: "Sufficient",
      },
      {
        label: "< 3",
        value: "< 3",
      },
      {
        label: "Empty",
        value: "Empty",
      },
    ],
  },
];