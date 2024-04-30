import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  name: string;
  price: number;
  addToCart: () => void;
};

const MenuItem = ({ name, price, addToCart }: Props) => {
  return (
    <Card className="cursot-pointer" onClick={addToCart}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        £{(price / 100).toFixed(2)}
      </CardContent>
    </Card>
  );
};

export default MenuItem;
