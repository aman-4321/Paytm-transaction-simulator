import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

export const SendMoney: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState<string>("");
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signup");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/account/balance`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setBalance(response.data.balance);
      })
      .catch((error) => {
        console.error("Error while fetching balance", error);
      });
  }, [navigate]);

  const initiateTransfer = async () => {
    if (balance !== null && parseFloat(amount) > balance) {
      setError("You don't have enough money to make the transfer.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/account/transfer`,
        {
          to: id,
          amount: parseFloat(amount),
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        },
      );
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.error("Error during the transfer:", error);
      setError("An error occurred while processing the transfer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-900 to-black animate-gradient-x flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Send Money
          </CardTitle>
          <CardDescription className="text-center">
            Transfer funds to {name}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`}
                alt="name"
              />
              <AvatarFallback>
                {name ? name[0].toUpperCase() : ""}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-2xl font-semibold">{name}</h3>
              {balance !== null && (
                <p className="text-sm text-muted-foreground">
                  Your balance: ₹{balance.toFixed(2)}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (in ₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          {balance !== null && (
            <Slider
              max={balance}
              step={1}
              value={[parseFloat(amount) || 0]}
              onValueChange={(value) => setAmount(value[0].toString())}
            />
          )}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Transfer was successful! Redirecting to dashboard...
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={initiateTransfer}
            disabled={
              isLoading || success || !amount || parseFloat(amount) <= 0
            }
          >
            {isLoading ? "Processing..." : "Send Money"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
