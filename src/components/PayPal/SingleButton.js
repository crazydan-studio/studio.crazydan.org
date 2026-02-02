import React from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

export default function PayPalButton({ style }) {
  return (
    <div style={style}>
      <form
        action="https://www.paypal.com/ncp/payment/9BC7WZKJCC8N4"
        method="post"
        target="_blank"
        className={clsx(styles.form)}
      >
        <input
          className={clsx(styles.submitButton)}
          type="submit"
          value="友情赞助"
        />
        <img
          src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg"
          alt="cards"
        />
        <section style={{ fontSize: '0.75rem' }}>
          技术支持提供方：
          <img
            src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-wordmark-color.svg"
            alt="paypal"
            style={{ height: '0.875rem', verticalAlign: 'middle' }}
          />
        </section>
      </form>
    </div>
  );
}
