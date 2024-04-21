const Footer = () => {
  return (
    <div className="bg-orange-500 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          MearnEats.com
        </span>
        <div className="text-white font-bold tracking-tight flex gap-4">
          <span>Privacy policy</span>
          <span>Terms of use</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
