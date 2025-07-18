const localeObject = new Intl.Locale(navigator.language);

RocketChat(function () {
  this.initialize({
    theme: {
      color: "green",
      fontColor: "#FFFFFF",
      iconColor: "#1d74f5",
      title: "Welcome to Ventimax",
      offlineTitle: "Service is offline",
      hideGuestAvatar: false,
      hideAgentAvatar: true,
      background: "white",
      position: "right",
    },
    language: localeObject.language,
  });
});
