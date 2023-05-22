import { Card } from "react-bootstrap";
import "../assets/css/style.css";

const BoxCard = ({children, className}) => {
  return (
    <div>
      <Card className={className}>
        {children}
      </Card>
    </div>
  );
};

export default BoxCard;
