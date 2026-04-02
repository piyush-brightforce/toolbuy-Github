export const textRTLStyle = value => {
  var direction = value ? 'right' : 'left';
  return direction;
};
export const viewRTLStyle = value => {
  var direction = value ? 'row-reverse' : 'row';
  return direction;
};
export const imageRTLStyle = value => {
  var direction = value ? -1 : 1;
  return direction;
};
export const viewSelfRTLStyle = value => {
  var direction = value ? 'flex-start' : 'flex-end';
  return direction;
};
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  const num = Number(amount);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: num % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(num);
};