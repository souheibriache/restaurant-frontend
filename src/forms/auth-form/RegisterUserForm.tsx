import { RegisterUserRequest } from "@/api/MyUserApi";
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
  name: z.string().min(1, "name is required"),
  password: z.string().min(6, "password is required"),
});

export type RegisterUserFormData = z.infer<typeof formSchema>;

type Props = {
  isLoading: boolean;
  onSave: (registerUserData: RegisterUserRequest) => void;
};

const RegisterUserForm = ({ onSave, isLoading }: Props) => {
  const form = useForm<RegisterUserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
      name: "",
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="flex flex-col items-center min-w-52 gap-3 p-8 shadow-md w-[40%] m-auto"
      >
        <div>
          <h2 className="text-2xl font-bold">Register</h2>
        </div>

        <FormField
          control={form.control}
          name="email"
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
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="John Doe" className="bg-white" />
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
                  type="password"
                  placeholder="••••••••"
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
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
          <Button className="bg-orange-500 w-full">Register</Button>
        )}
        <span className="self-start">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-orange-500 underline font-semibold"
          >
            login
          </Link>
        </span>
      </form>
    </Form>
  );
};

export default RegisterUserForm;
