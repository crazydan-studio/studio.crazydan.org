import React, { useEffect } from 'react';

export default function PayPalButton() {
  useEffect(() => {
    const script = document.createElement('script');

    script.src =
      'https://www.paypal.com/sdk/js?client-id=BAAEFVxjr-wWq63MU2oRgxiQYdJ4e3_ruAk55q4GDnDjfH_sWH5xgM8zrAi-JbMg7WcsJ8LjWBAt3IdbwM&components=hosted-buttons&disable-funding=venmo&currency=USD';
    script.async = true;

    script.onload = () => {
      if (window.paypal) {
        window.paypal
          .HostedButtons({
            hostedButtonId: '9BC7WZKJCC8N4'
          })
          .render('#paypal-container-9BC7WZKJCC8N4');
      }
    };
    document.body.appendChild(script);

    return () => {
      // 组件卸载时移除脚本防止重复加载
      document.body.removeChild(script);
    };
  }, []);

  return <div id="paypal-container-9BC7WZKJCC8N4"></div>;
}
