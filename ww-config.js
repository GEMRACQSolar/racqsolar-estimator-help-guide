export default {
  editor: {
    label: {
      en: "RACQ Help Guide"
    },
    icon: "info-circle",
    customStylePropertiesOrder: [],
    customSettingsPropertiesOrder: ["visible", "activeSection"]
  },
  
  properties: {
    visible: {
      label: {
        en: "Visible"
      },
      type: "OnOff",
      bindable: true,
      defaultValue: false
    },
    activeSection: {
      label: {
        en: "Active Section"
      },
      type: "Text",
      bindable: true,
      defaultValue: ""
    }
  },
  
  triggerEvents: [
    {
      name: "help:opened",
      label: { en: "Help Guide Opened" },
      event: {
        timestamp: ""
      },
      default: false
    },
    {
      name: "help:closed",
      label: { en: "Help Guide Closed" },
      event: {
        timestamp: ""
      },
      default: false
    }
  ]
}