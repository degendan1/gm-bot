module.exports = {
  percDiff: function (tvlOfProtocolA, tvlOfProtocolB) {
    const a = Number(tvlOfProtocolA);
    const b = Number(tvlOfProtocolB);

    return ((a - b) / b) * 100;
  },
  formatNumber: function (data) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(data);
  },
};
