import { LoginUserRequest } from "@/api/MyUserApi";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email().min(1, "email is required"),
  password: z.string().min(6, "password is required"),
});

export type LoginUserFormData = z.infer<typeof formSchema>;

type Props = {
  isLoading: boolean;
  onSave: (loginUserRequest: LoginUserRequest) => void;
};

const LoginUserForm = ({ isLoading, onSave }: Props) => {
  const form = useForm<LoginUserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="flex flex-col items-center min-w-52 gap-3 p-8 shadow-md w-[40%] m-auto"
      >
        <div>
          <h2 className="text-2xl font-bold">Login</h2>
        </div>
        <FormField
          control={form.control}
          name={"email"}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="example@email.com"
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-white"
                  type="password"
                  placeholder="••••••••"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <span className="self-start">
          Accept{" "}
          <span className="font-semibold underline cursor-pointer">
            privacy policy
          </span>{" "}
          &{" "}
          <span className="font-semibold underline cursor-pointer">
            terms and conditions
          </span>
        </span>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button className="bg-orange-500 w-full">Login</Button>
        )}
        <span className="self-start">
          You don't have an account?{" "}
          <Link
            to={"/register"}
            className="text-orange-500 underline font-semibold"
          >
            create account
          </Link>
        </span>
      </form>
    </Form>
  );
};

export default LoginUserForm;
