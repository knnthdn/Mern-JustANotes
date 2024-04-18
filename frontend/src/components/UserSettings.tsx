import { CircleCheck, MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useGetUserData from "@/hooks/useGetUserData";
import { formatDate } from "@/utils/formatDate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import setNickname from "@/services/setNickname";
import { toast } from "./ui/use-toast";
import { useForm } from "react-hook-form";

function UserSettings() {
  const { data } = useGetUserData();
  const currentNickname = data?.data.user.nickname;

  const { register, handleSubmit } = useForm<{ nickname: string }>();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: setNickname,
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast({
        description: (
          <div className="flex gap-2 items-center">
            <CircleCheck className="w-5 text-green-700" strokeWidth={3} />
            {!currentNickname ? "Set" : "Change"} nickname successfully!
          </div>
        ),
        variant: "success",
      });
    },
  });

  function onSettingNickname(data: { nickname: string }) {
    mutate(data.nickname);
  }

  return (
    <div>
      <header className="flex justify-between items-center px-4 py-6 border-b border-b-gray-300 sm:px-8 lg:py-10 lg:text-lg ">
        <Link to="/notes">
          <MoveLeft />
        </Link>

        <span className="block -ml-4 font-medium">User</span>

        <span></span>
      </header>

      <div className="px-5 py-8 mt-5 mx-3 flex flex-col gap-4 border border-gray-400 rounded-lg shadow-md sm:mx-8 md:mx-auto md:w-[600px]">
        <p className="text-base">
          <span className="font-semibold">Total Notes:</span>{" "}
          {data?.data.user.notes.length}{" "}
        </p>

        <p className="text-base">
          <span className="font-semibold">Account Created:</span>{" "}
          {formatDate(data?.data.user.accountCreated)}
        </p>

        <p className="text-base">
          <span className="font-semibold">Email:</span> {data?.data.user.email}
        </p>

        <form
          className="flex flex-col gap-3 md:flex-row"
          onSubmit={handleSubmit(onSettingNickname)}
        >
          <div className="flex items-center gap-2 ">
            <label htmlFor="nickname" className="text-base font-semibold">
              Nickname:
            </label>

            <input
              type="text"
              placeholder="eg. Juan"
              id="nickname"
              defaultValue={currentNickname}
              className="px-3 py-2 w-full rounded-lg border border-blue-900 outline-none focus:ring-blue-900 focus:ring-1 placeholder:font-light placeholder:tracking-wider"
              {...register("nickname")}
            />
          </div>
          <Button className="w-fit self-end mr-1" disabled={isPending}>
            {!currentNickname ? "Save" : "Change"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UserSettings;
