(function(){'use strict';
var hosts=["tools.daonjoyful.com"];
if(!hosts.includes(location.hostname)||window.__portfolioAnalyticsReady)return;
window.__portfolioAnalyticsReady=true;
window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
window.gtag('js',new Date());
var ref='';try{var r=new URL(document.referrer);ref=r.origin+r.pathname;}catch(_){}
window.gtag('config','G-E32LDLSQL9',{page_location:location.origin+location.pathname,page_referrer:ref,content_group:location.hostname});
if(!document.querySelector('script[src*="googletagmanager.com/gtag/js"]')){var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=G-E32LDLSQL9';document.head.appendChild(s);}
})();
