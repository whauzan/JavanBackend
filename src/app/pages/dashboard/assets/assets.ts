export const headArray = [
  {
    label: "Id",
    data: "id",
  },
  {
    label: "Name",
    data: "assetName",
  },
  {
    label: "Serial number",
    data: "serialNumber",
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
    label: "Current Status",
    data: "currentStatus",
  },
];

export const assetsFormModel = [
  {
    label: "Id",
    data: "id",
    type: "number",
    value: 0,
  },
  {
    label: "Name",
    data: "assetName",
    type: "text",
    value: "",
  },
  {
    label: "Serial number",
    data: "serialNumber",
    type: "text",
    value: "",
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
        label: "Running",
        value: "Running",
      },
      {
        label: "Maintenance",
        value: "Maintenance",
      },
      {
        label: "Stopped",
        value: "Stopped",
      },
    ],
  },
];
