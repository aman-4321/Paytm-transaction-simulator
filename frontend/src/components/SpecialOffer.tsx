import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

export const SpecialOffer: React.FC = () => {
  return (
    <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Gift className="h-6 w-6" />
          <span>Special Offer!</span>
        </CardTitle>
        <CardDescription className="text-blue-100">
          Limited time promotion for our valued customers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold ">
          Get 5% cashback on your next transaction
        </p>
        <p className="mt-2 text-blue-100">
          Valid until the end of the month. Don't miss out!
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" className="w-full">
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
};
