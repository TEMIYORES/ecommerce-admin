const PriceFormat = ({ price }: { price: number }) => {
  return (
    <span className="font-semibold">
      ₦
      {price.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </span>
  );
};

export default PriceFormat;
