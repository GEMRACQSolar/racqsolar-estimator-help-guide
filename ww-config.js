export default {
  editor: {
    label: {
      en: "RACQ Help Guide"
    },
    icon: "info-circle",
    customStylePropertiesOrder: [],
    customSettingsPropertiesOrder: ["visible"]
  },
  
  properties: {
    visible: {
      label: {
        en: "Visible"
      },
      type: "OnOff",
      bindable: true,
      defaultValue: false
    }
  },
  
  triggerEvents: [
    {
      name: "close:help-guide",
      label: { en: "Help Guide Closed" },
      event: {
        timestamp: ""
      },
      default: false
    }
  ]
}