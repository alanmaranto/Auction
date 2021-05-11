const getCountryLocale = (currency) => {
  let localeType;
  if (currency === "EUR") {
    localeType = "de-DE";
  } else if (currency === "USD") {
    localeType = "us-US";
  } else if (currency === "MXN") {
    localeType = "es-MX";
  }
  return localeType;
};

const formatCurrency = (number, currency) => {
  return new Intl.NumberFormat(getCountryLocale(currency), {
    style: "currency",
    currency: currency,
  }).format(number);
};

module.exports = { getCountryLocale, formatCurrency };
