const Card = ({ children }: { children: React.ReactNode }) => {
  const cardStyle = {
    padding: '100px',
  };
  return <div style={cardStyle}>{children}</div>;
};

export default Card;
