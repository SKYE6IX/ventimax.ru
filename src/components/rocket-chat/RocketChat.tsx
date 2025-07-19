"use client";
import React from "react";
import Script from "next/script";

function RocketChat() {
  const rocketUrl = process.env.NEXT_PUBLIC_ROCKET_CHAT_URL;
  console.log(rocketUrl);
  return (
    <Script
      strategy="afterInteractive"
      id="rocket-chat"
      dangerouslySetInnerHTML={{
        __html: `
          (function(w, d, s, u) {
       w.RocketChat = function(c) { w.RocketChat._.push(c) }; w.RocketChat._ = []; w.RocketChat.url = u;
       var h = d.getElementsByTagName(s)[0], j = d.createElement(s);
       j.async = true; j.src = '${rocketUrl}livechat/rocketchat-livechat.min.js?_=201903270000';
        j.onload = function() {
          var settings = d.createElement('script');
          settings.async = true;
          settings.src = '/rocket-chat/rocket-chat.js';
          d.body.appendChild(settings);
        };
       h.parentNode.insertBefore(j, h);
       })(window, document, 'script', '${rocketUrl}livechat');
        `,
      }}
    />
  );
}
export default RocketChat;
